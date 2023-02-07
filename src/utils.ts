import Constants from "~/constants";

export const escapeSpecial = (str: string) => str.replace(/[^ 0-9a-zA-Z](?!(?<=\d\.)\d)/g, "");

export const transformRawDep = (de: Record<string, string>): DependencyBaseData[] =>
  Object.entries(de).map(([name, versionCode]) => ({
    name,
    version: escapeSpecial(versionCode),
  }));

export const transformDefaultDepRowData = (de: Record<string, string>): DependencyRowData[] =>
  Object.entries(de).map(([name, versionCode]) => ({
    name,
    version: escapeSpecial(versionCode),
    action: Constants.actionChoices[0],
    targetVersion: Constants.targetVersionChoices[0],
  }));

// export const getVer = (d: Dependency) =>
//   d.targetVersion === "current"
//     ? `@${d.version}`
//     : d.targetVersion === "latest"
//     ? "@latest"
//     : "";

// export const strEqualToArrOfStr = <T extends string>(str: string,  strsArr: readonly string[]): str is T =>
//   strsArr.reduce((prev, curr) => (prev ? prev : str === curr), false);
