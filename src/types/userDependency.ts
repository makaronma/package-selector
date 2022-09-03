export interface PackageInputType {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const dependencyActions = ["ignore", "add", "remove", "upgrade"] as const;
export const dependencyTargetVersions = ["default", "current", "latest"] as const;
export const terminalTypes = ['VS Code','Mac/Window Terminal'] as const;
export const packageManagerTypes = ['yarn','npm'] as const;

export type DependencyAction = typeof dependencyActions[number];
export type DependencyTargetVersion = typeof dependencyTargetVersions[number];
export type TerminalTypes = typeof terminalTypes[number];
export type PackageManagerTypes = typeof packageManagerTypes[number];

export interface Dependency {
  name: string;
  version: string;
  action: DependencyAction;
  targetVersion: DependencyTargetVersion;
}

export type GetDependencyTargetType<T extends "selectAction" | "selectVersion"> =
  T extends "selectAction"
    ? DependencyAction
    : T extends "selectVersion"
    ? DependencyTargetVersion
    : never;

export type RadioColProps<T extends "selectAction" | "selectVersion"> = {
  depName: string;
  value: GetDependencyTargetType<T>;
  choice?: GetDependencyTargetType<T>;
  setChoice: (choice: GetDependencyTargetType<T>) => void;
  isDev?: boolean;
};

export type SelectActionColTypes = RadioColProps<"selectAction">;
export type SelectTargetVerColTypes = RadioColProps<"selectVersion">;
