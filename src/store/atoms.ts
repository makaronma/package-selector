import { atom } from "jotai";
import Constants from "~/constants";
import { z } from "zod";

const dependencyDataSchema = z.record(z.string(), z.string());

export const jsonTextInputAtom = atom(JSON.stringify(Constants.exampleJson));

export const processedDependencyDataAtom = atom<PackageJsonData | undefined>(
  (get) => {
    try {
      const processedData = JSON.parse(get(jsonTextInputAtom)) as PackageJsonData;
      
      if (processedData.dependencies && !dependencyDataSchema.safeParse(processedData.dependencies).success) {
        return undefined;
      }
      
      if (processedData.devDependencies && !dependencyDataSchema.safeParse(processedData.dependencies).success) {
        return undefined;
      }

      return processedData;
    } catch (error) {
      return undefined;
    }
  }
);

export const isJsonTextInputValidAtom = atom<boolean>(
  (get) => get(processedDependencyDataAtom) !== undefined
);

export const dependencyFieldsAtom = atom<DependencyField[]>([]);