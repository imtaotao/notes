import { CspEvaluator } from 'csp_evaluator/dist/evaluator.js';
import { CspParser } from 'csp_evaluator/dist/parser.js';

const parsed = new CspParser('script-src https://google.com').csp;
console.log(new CspEvaluator(parsed).evaluate());
