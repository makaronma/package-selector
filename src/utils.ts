import { Dependency, dependencyActions, dependencyTargetVersions, PackageInputType } from "./types/userDependency";

export const processDataFromInput = (
  input: string,
  cb: (data: PackageInputType) => void,
  fb: () => void
) => {
  try {
    const data = JSON.parse(input) as PackageInputType;
    cb(data);
  } catch (error) {
    fb();
  }
};

export const transformDefaultDep = (de: Record<string, string>): Dependency[] =>
  Object.entries(de).map((d) => ({
    name: d[0],
    version: escapeSpecial(d[1]),
    action: dependencyActions[0],
    targetVersion: dependencyTargetVersions[0],
  } as Dependency));

export const escapeSpecial = (str: string) => str.replace(/[^ 0-9a-zA-Z](?!(?<=\d\.)\d)/g, "");

export const getVer = (d: Dependency) =>
  d.targetVersion === "current"
    ? `@${d.version}`
    : d.targetVersion === "latest"
    ? "@latest"
    : "";

export const strEqualToArrOfStr = <T extends string>(str: string,  strsArr: readonly string[]): str is T =>
  strsArr.reduce((prev, curr) => (prev ? prev : str === curr), false);
