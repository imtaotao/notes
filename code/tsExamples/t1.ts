// https://github.com/darkyzhou/You-Might-Not-Know-TypeScript/blob/main/chapter2.md
type P<T> = string

function parse<T extends string>(str: T) : P<T> {
  return '' as any;
}


const res = parse('a/b/c')