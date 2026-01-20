import { createProject } from '@ts-morph/bootstrap';

const project = await createProject(); // or createProjectSync

// these are typed as ts.SourceFile
const myClassFile = project.createSourceFile(
  'MyClass.ts',
  'export class MyClass { prop: string; }',
);
const mainFile = project.createSourceFile(
  'main.ts',
  "import { MyClass } from './MyClass'",
);

// ts.Program
const program = project.createProgram();

// // ts.TypeChecker
const typeChecker = program.getTypeChecker();
console.log(project.getSourceFiles().map((s) => s.fileName));

// // ts.LanguageService
// const languageService = project.getLanguageService();
// // ts.ModuleResolutionHost
// const moduleResolutionHost = project.getModuleResolutionHost();
