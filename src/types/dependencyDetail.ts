export interface DependencyDetail {
  analyzedAt?: string;
  collected?:  Collected;
  evaluation?: Evaluation;
  score?:      Score;
}

interface Collected {
  metadata?: Metadata;
  npm?:      Npm;
  source?:   Source;
}

interface Metadata {
  name?:              string;
  scope?:             string;
  version?:           string;
  description?:       string;
  keywords?:          string[];
  date?:              string;
  publisher?:         Publisher;
  maintainers?:       Publisher[];
  repository?:        Repository;
  links?:             Links;
  license?:           string;
  dependencies?:      Dependencies;
  releases?:          Release[];
  hasSelectiveFiles?: boolean;
}

interface Dependencies {
  "loose-envify"?: string;
}

interface Links {
  npm?:        string;
  homepage?:   string;
  repository?: string;
  bugs?:       string;
}

interface Publisher {
  username?: string;
  email?:    string;
}

interface Release {
  from?:  string;
  to?:    string;
  count?: number;
}

interface Repository {
  type?:      string;
  url?:       string;
  directory?: string;
}

interface Npm {
  downloads?:  Release[];
  starsCount?: number;
}

interface Source {
  files?:    Files;
  badges?:   Badge[];
  linters?:  string[];
  coverage?: number;
}

interface Badge {
  urls?: Urls;
  info?: Info;
}

interface Info {
  service?:    string;
  type?:       string;
  modifiers?: Modifiers;
}

interface Modifiers {
  type?: string;
}

interface Urls {
  original?: string;
  shields?:  string;
  content?:  string;
  service?: string;
}

interface Files {
  readmeSize?:   number;
  testsSize?:    number;
  hasChangelog?: boolean;
}

interface Evaluation {
  quality?:     Quality;
  popularity?:  Popularity;
  maintenance?: Maintenance;
}

interface Maintenance {
  releasesFrequency?:  number;
  commitsFrequency?:   number;
  openIssues?:         number;
  issuesDistribution?: number;
}

interface Popularity {
  communityInterest?:     number;
  downloadsCount?:        number;
  downloadsAcceleration?: number;
  dependentsCount?:       number;
}

interface Quality {
  carefulness?: number;
  tests?:       number;
  health?:      number;
  branding?:    number;
}

interface Score {
  final?:  number;
  detail?: Detail;
}

interface Detail {
  quality?:     number;
  popularity?:  number;
  maintenance?: number;
}
