const isSpace = (char) => {
  return char === ' ' || char === '\n' || char === '\t';
}

export function parser(code) {
  const ast = {};
  const advance = (i) => {
    if (i > 0) code = code.slice(i);
  }
  const filterSpace = () => {
    for (let i = 0; i < code.length; i++) {
      if (!isSpace(code[i])) {
        advance(i);
        return;
      }
    }
  }

  const parserVar = () => {
    filterSpace();
    if (code.startsWith('var')) {
      const type = 'var';
      advance(3);
      console.log(code);
    }
  }
  
  const parserFunction = () => {

  }

  const parserPragram  = () => {
    ast.pargram = {
      
    };
    next();
  }

  const next = () => {
    parserVar();
    parserFunction();
  }
  
  parserPragram();

  return ast;
}