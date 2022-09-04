export interface DependencyDetail {
  name?:                    string;
  description?:             string;
  keywords?:                string[];
  version?:                 string;
  homepage?:                string;
  bugs?:                    Bugs;
  license?:                 string;
  main?:                    string;
  exports?:                 Exports;
  repository?:              Repository;
  engines?:                 Engines;
  dependencies?:            Dependencies;
  browserify?:              Browserify;
  gitHead?:                 string;
  _id?:                     string;
  _nodeVersion?:            string;
  _npmVersion?:             string;
  dist?:                    Dist;
  _npmUser?:                NpmUser;
  directories?:             Directories;
  maintainers?:             NpmUser[];
  _npmOperationalInternal?: NpmOperationalInternal;
  _hasShrinkwrap?:          boolean;
}

export interface NpmOperationalInternal {
  host?: string;
  tmp?:  string;
}

export interface NpmUser {
  name?:  string;
  email?: string;
}

export interface Browserify {
  transform?: string[];
}

export interface Bugs {
  url?: string;
}

export interface Dependencies {
  "loose-envify"?: string;
}

export interface Directories {
}

export interface Dist {
  integrity?:       string;
  shasum?:          string;
  tarball?:         string;
  fileCount?:       number;
  unpackedSize?:    number;
  signatures?:      Signature[];
  "npm-signature"?: string;
}

export interface Signature {
  keyid?: string;
  sig?:   string;
}

export interface Engines {
  node?: string;
}

export interface Exports {
  "."?:                 Empty;
  "./package.json"?:    string;
  "./jsx-runtime"?:     string;
  "./jsx-dev-runtime"?: string;
}

export interface Empty {
  "react-server"?: string;
  default?:        string;
}

export interface Repository {
  type?:      string;
  url?:       string;
  directory?: string;
}
