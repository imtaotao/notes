// https://developer.mozilla.org/zh-CN/docs/Web/API/CSSRule
const RuleType = Object.create(null);
// 会被重写的规则
RuleType.style = 1;
RuleType.media = 4;
RuleType.supports = 12;
// 不会被重写，但是列出来
RuleType.charset = 2;
RuleType.import = 3;
RuleType.fontFace = 5;
RuleType.page = 6;
RuleType.keyframes = 7;
RuleType.keyframe = 8;
RuleType.namespace = 10;
RuleType.counterStyle = 11;
RuleType.document = 13;
RuleType.fontFeatureValues = 14;
RuleType.viewport = 15;
RuleType.regionStyle = 16;

const swapNode = document.createElement('style');
document.body.append(swapNode);
swapNode.sheet.disabled = true;

// Garfish 的特殊元素
const __MockHtml__ = '__garfishmockhtml__';
const __MockBody__ = '__garfishmockbody__';
const __MockHead__ = '__garfishmockhead__';

export class CssCompiler {
  constructor(prefix, cssCode) {
    this.prefix = prefix;
    this.cssCode = cssCode;
  }

  process() {
    if (!this.prefix) {
      return this.cssCode || '';
    } else if (this.cssCode && typeof this.cssCode === 'string') {
      // 1M 的 css 文本，浏览器解析大概 20ms
      const textNode = document.createTextNode(this.cssCode);
      swapNode.appendChild(textNode);
      // 1M 的 css 文本转换，耗时大概 30ms
      const css = this.rewrite(swapNode.sheet.cssRules);
      swapNode.removeChild(textNode);
      return css;
    }
    return '';
  }

  rewrite(rules) {
    let css = '';
    for (let i = 0, l = rules.length; i < l; i++) {
      const r = rules[i];
      if (r.type === RuleType.style) {
        css += this.ruleStyle(r);
      } else if (r.type === RuleType.media) {
        css += this.ruleMedia(r);
      } else if (r.type === RuleType.supports) {
        css += this.ruleSupport(r);
      } else {
        css += `${r.cssText}\n`;
      }
    }
    return css;
  }

  // 重写 style
  ruleStyle(rule) {
    const { cssText, selectorText } = rule;
    const ruleText = cssText.slice(selectorText.length);
    const selectors = selectorText.split(',');
    let newSelectorText = '';

    for (let i = 0, l = selectors.length; i < l; i++) {
      let s = selectors[i].trim();
      // 处理 Garfish 的场景
      s =
        s === 'html' || s === ':root'
          ? `[${__MockHtml__}]`
          : s === 'body'
          ? `[${__MockBody__}]`
          : s === 'head'
          ? `[${__MockHead__}]`
          : s;
      s = `${this.prefix}${s}`;
      if (i !== l - 1) {
        s += ', ';
      }
      newSelectorText += s;
    }
    return `${newSelectorText}${ruleText}\n`;
  }

  // 对 media 做处理
  // https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media
  ruleMedia(rule) {
    const css = this.rewrite(rule.cssRules);
    return `@media ${rule.conditionText} {\n${css}}\n`;
  }

  // 对 ruleSupport 做处理
  // https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports
  ruleSupport(rule) {
    const css = this.rewrite(rule.cssRules);
    return `@supports ${rule.conditionText} {\n${css}}\n`;
  }
}
