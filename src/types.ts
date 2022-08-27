export interface PackageInputType {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface Dependency {
  name: string;
  version: string;
}