import Constants from "~/constants";

declare global {
  interface DependencyBaseData {
    name: string;
    version: string;
  }

  interface DependencyRowData {
    name: string;
    version: string;
    action: ActionChoice;
    targetVersion: TargetVersionChoice;
  }

  interface PackageJsonData {
    dependencies?: Record<DependencyName, Versioncode>;
    devDependencies?: Record<DependencyName, Versioncode>;
  }

  // Choice types implement to dependency version
  type ActionChoice = (typeof Constants.actionChoices)[number];
  type TargetVersionChoice = (typeof Constants.targetVersionChoices)[number];

  // Ways to manage dependency
  type TerminalType = (typeof Constants.terminalTypes)[number];
  type PackageManagerType = (typeof Constants.packageManagerTypes)[number];
}
