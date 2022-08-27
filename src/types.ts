export interface PackageInputType {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export type DependencyAction = "add" | "remove" | "upgrade";

export interface Dependency {
  name: string;
  version: string;
  action: DependencyAction;
}