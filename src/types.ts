export interface PackageInputType {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export type DependencyAction = {
  type: "add" | "remove" | "upgrade";
  targetVersion: number;
};

export interface Dependency {
  name: string;
  version: string;
  action: DependencyAction;
}