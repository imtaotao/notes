import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import * as vscode from 'vscode';

class LoadModuleTypeDeclare {
  private currentWorkspace = (() => {
    const { name, workspaceFolders = [] } = vscode.workspace;
    return workspaceFolders.find((item) => item.name === name);
  })();

  private dir(p: string) {
    const { uri } = this.currentWorkspace!;
    const baseDir = uri.toString().replace('file://', '');
    const dir = path.resolve(baseDir, p);
    return fs.existsSync(dir) ? dir : null;
  }

  private getAllTypePackages() {
    const typeDir = this.dir('./node_modules/@types');
    if (!typeDir) return [];
    return fs
      .readdirSync(typeDir)
      .map((name) => {
        try {
          const jsonDir = this.dir(`${typeDir}/${name}/package.json`);
          if (!jsonDir) return null;
          const pkgJson = require(jsonDir);
          // 暂时过滤没有指定 types，而是和入口并行的 .d.ts 的 case
          const typeEntry = pkgJson['types'] || pkgJson['typing'];
          return {
            name,
            pkgJson,
            typeEntry,
          };
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);
  }

  private createDeclareCode() {
    const pkgs = this.getAllTypePackages();
    console.log(pkgs, 'chentao');
    return `
			declare const loadModule = async (id: string) => string;
		`.trim();
  }

  public register() {
    const editor = vscode.window.activeTextEditor;
    if (editor && this.currentWorkspace) {
      editor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(0, 0), this.createDeclareCode());
      });
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  const manager = new LoadModuleTypeDeclare();
  manager.register();
}

export function deactivate() {}
