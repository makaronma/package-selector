import Constants from "~/constants";

declare global {
  interface DependencyField {
    name: string;
    version: string;
    action: ActionChoice;
    targetVersion: TargetVersionChoice;
  }

  interface PackageJsonData {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  }

  // Choice types implement to dependency version
  type ActionChoice        = typeof Constants.actionChoices[number];
  type TargetVersionChoice = typeof Constants.targetVersionChoices[number];
  
  // Ways to manage dependency
  type TerminalType        = typeof Constants.terminalTypes[number];
  type PackageManagerType  = typeof Constants.packageManagerTypes[number];
}
