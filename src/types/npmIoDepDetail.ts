export interface NpmIoDepDetail {
  analyzedAt: Date;
  collected:  Collected;
  evaluation: Evaluation;
  error:      Error;
  score:      Score;
}

export interface Collected {
  metadata: Metadata;
  npm:      Npm;
  github:   Github;
  source:   Source;
}

export interface Github {
  homepage:         string;
  starsCount:       number;
  forksCount:       number;
  subscribersCount: number;
  issues:           Issues;
  contributors:     Contributor[];
  commits:          Commit[];
}

export interface Commit {
  from:  Date;
  to:    Date;
  count: number;
}

export interface Contributor {
  username:     string;
  commitsCount: number;
}

export interface Issues {
  count:        number;
  openCount:    number;
  distribution: { [key: string]: number };
  isDisabled:   boolean;
}

export interface Metadata {
  name:                 string;
  scope:                string;
  version:              string;
  description:          string;
  date:                 Date;
  publisher:            Publisher;
  maintainers:          Publisher[];
  repository:           Repository;
  links:                Links;
  license:              string;
  dependencies:         Dependencies;
  devDependencies:      DevDependencies;
  peerDependencies:     PeerDependencies;
  optionalDependencies: OptionalDependencies;
  releases:             Commit[];
  hasSelectiveFiles:    boolean;
  readme:               string;
}

export interface Dependencies {
  "@babel/core":                          string;
  "@pmmmwh/react-refresh-webpack-plugin": string;
  "@svgr/webpack":                        string;
  "babel-jest":                           string;
  "babel-loader":                         string;
  "babel-plugin-named-asset-import":      string;
  "babel-preset-react-app":               string;
  bfj:                                    string;
  browserslist:                           string;
  camelcase:                              string;
  "case-sensitive-paths-webpack-plugin":  string;
  "css-loader":                           string;
  "css-minimizer-webpack-plugin":         string;
  dotenv:                                 string;
  "dotenv-expand":                        string;
  eslint:                                 string;
  "eslint-config-react-app":              string;
  "eslint-webpack-plugin":                string;
  "file-loader":                          string;
  "fs-extra":                             string;
  "html-webpack-plugin":                  string;
  "identity-obj-proxy":                   string;
  jest:                                   string;
  "jest-resolve":                         string;
  "jest-watch-typeahead":                 string;
  "mini-css-extract-plugin":              string;
  postcss:                                string;
  "postcss-flexbugs-fixes":               string;
  "postcss-loader":                       string;
  "postcss-normalize":                    string;
  "postcss-preset-env":                   string;
  prompts:                                string;
  "react-app-polyfill":                   string;
  "react-dev-utils":                      string;
  "react-refresh":                        string;
  resolve:                                string;
  "resolve-url-loader":                   string;
  "sass-loader":                          string;
  semver:                                 string;
  "source-map-loader":                    string;
  "style-loader":                         string;
  tailwindcss:                            string;
  "terser-webpack-plugin":                string;
  webpack:                                string;
  "webpack-dev-server":                   string;
  "webpack-manifest-plugin":              string;
  "workbox-webpack-plugin":               string;
  fsevents:                               string;
}

export interface DevDependencies {
  react:       string;
  "react-dom": string;
}

export interface Links {
  npm: string;
}

export interface Publisher {
  username: string;
  email:    string;
}

export interface OptionalDependencies {
  fsevents: string;
}

export interface PeerDependencies {
  react:      string;
  typescript: string;
}

export interface Repository {
  type:      string;
  url:       string;
  directory: string;
}

export interface Npm {
  downloads:  Commit[];
  starsCount: number;
}

export interface Source {
  files:                Files;
  linters:              string[];
  outdatedDependencies: { [key: string]: OutdatedDependency };
}

export interface Files {
  readmeSize:   number;
  testsSize:    number;
  hasNpmIgnore: boolean;
  hasChangelog: boolean;
}

export interface OutdatedDependency {
  required: string;
  stable:   string;
  latest:   string;
}

export interface Evaluation {
  quality:     Quality;
  popularity:  Popularity;
  maintenance: Maintenance;
}

export interface Maintenance {
  releasesFrequency:  number;
  commitsFrequency:   number;
  openIssues:         number;
  issuesDistribution: number;
}

export interface Popularity {
  communityInterest:     number;
  downloadsCount:        number;
  downloadsAcceleration: number;
  dependentsCount:       number;
}

export interface Quality {
  carefulness: number;
  tests:       number;
  health:      number;
  branding:    number;
}

export interface Score {
  final:  number;
  detail: Detail;
}

export interface Detail {
  quality:     number;
  popularity:  number;
  maintenance: number;
}
