import { atom } from "jotai";
import Constants from "~/constants";
import { z } from "zod";
import { escapeSpecial, transformDefaultDepRowData, transformRawDep } from "~/utils";
import produce from "immer";

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

export const rawDepDataAtom = atom<DependencyBaseData[] | undefined>((get) => {
  const deps = get(processedDependencyDataAtom)?.dependencies;
  if (!deps) return undefined;
  return transformRawDep(deps);
});
export const rawDevDepDataAtom = atom<DependencyBaseData[] | undefined>((get) => {
  const deps = get(processedDependencyDataAtom)?.devDependencies;
  if (!deps) return undefined;
  return transformRawDep(deps);
});

export const depRowDataAtom = atom<DependencyRowData[] | undefined>((get) => {
  if (!get(isJsonTextInputValidAtom)) return undefined;
  const deps = get(processedDependencyDataAtom)?.dependencies;
  if (!deps) return undefined;

  return transformDefaultDepRowData(deps)
});
export const devDepRowDataAtom = atom<DependencyRowData[] | undefined>((get) => {
  if (!get(isJsonTextInputValidAtom)) return undefined;
  const devDeps = get(processedDependencyDataAtom)?.devDependencies;
  if (!devDeps) return undefined;

  return transformDefaultDepRowData(devDeps)
});

// <--------------------- Dep Row Data ---------------------->
export const depRowAtom = atom<DepRowData>({
  actionChoice: "ignore",
  targetVersionChoice: "latest",
});

// <--------------------- Result ---------------------->
type NameWithVerion = {
  name: string;
  targetVerion: TargetVersionChoice;
};
export const resultAtom = atom({
  add: [] as NameWithVerion[],
  remove: [] as string[],
  upgrade: [] as NameWithVerion[],
});

export const updateDepActionChoiceAtom = atom(
  null,
  (get, set, actionChoice: ActionChoice, depName: string) => {
    const prevActionChoice = get(depRowAtom).actionChoice
    set(depRowAtom, (prev) => ({ ...prev, actionChoice }));
    if (prevActionChoice === "add") {
      set(resultAtom, produce(prev => prev.add = prev.add.filter(a=>a.name!==depName)))
    }
  }
);