import { Dependency, PackageInputType } from "./types";

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
    version: d[1],
    action: {
      type: "add",
      targetVersion: Number(d[1].replace(/[^a-zA-Z0-9 ]/g, "")),
    },
  }));