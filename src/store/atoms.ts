import { atom } from "jotai";
import Constants, { seperator, terminalCommand } from "~/constants";
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
export const createDepRowAtom = () =>
  atom<DepRowData>({
    actionChoice: "ignore",
    targetVersionChoice: "latest",
  });
export type DepRowAtom = ReturnType<typeof createDepRowAtom>;

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
  (get, set, depRowAtom: DepRowAtom, depName: string, actionChoice: ActionChoice) => {
    const prevDepRowData = get(depRowAtom);
    const prevDepActionChoice = prevDepRowData.actionChoice;
    const prevDepTargetVersion = prevDepRowData.targetVersionChoice;
    if (prevDepActionChoice === actionChoice) return;

    // update row data
    set(depRowAtom, (prev) => ({ ...prev, actionChoice }));

    // update result data (remove previous action choice from list)
    if (prevDepActionChoice !== "ignore") {
      if (prevDepActionChoice === "remove") {
        set(resultAtom, produce(prevResult => {
          prevResult.remove = prevResult.remove.filter(name => name !== depName);
        }))
      } else {
        set(resultAtom, produce(prevResult => {
          prevResult[prevDepActionChoice] = prevResult[prevDepActionChoice].filter(dep => dep.name !== depName);
        }))
      }
    }

    // update result data (add current action choice to list)
    if (actionChoice === "ignore") return;
    if (actionChoice === "remove") {
      set(resultAtom, produce(prevResult => {
        prevResult.remove.push(depName);
      }))
      return;
    }
    set(resultAtom, produce(prevResult => {
      prevResult[actionChoice].push({ name: depName, targetVerion: prevDepTargetVersion });
    }))
  }
);

export const updateDepTargetVerChoiceAtom = atom(
  null,
  (get, set, depRowAtom: DepRowAtom, depName: string, targetVersionChoice: TargetVersionChoice) => {
    const actionChoice = get(depRowAtom).actionChoice;

    // update row data
    set(depRowAtom, (prev) => ({ ...prev, targetVersionChoice }));

    // find dep item & mutate version choice
    if (actionChoice === "ignore" || actionChoice === "remove") return;
    set(resultAtom, produce(prevResult => {
      const found = prevResult[actionChoice].find((dep) => dep.name === depName);
      if (found) found.targetVerion = targetVersionChoice;
    }))
  }
);

// <--------------------- Terminal Command Display ---------------------->
export const terminalChoiceAtom = atom<TerminalType>("VS Code");
export const packageManagerChoiceAtom = atom<PackageManagerType>("pnpm");
export const commandAtom = atom((get) => {
  const packageManagerChoice = get(packageManagerChoiceAtom);
  const terminalChoice = get(terminalChoiceAtom);

  const { add: adds, upgrade: upgrades, remove: removes } = get(resultAtom);
  const addCommand = adds.length > 0 ? adds.reduce(
    (sum, dep) => `${sum} ${dep.name}@${dep.targetVerion}`,
    terminalCommand[packageManagerChoice].add
  ) : undefined;
  const upgradeCommand = upgrades.length > 0 ? upgrades.reduce(
    (sum, dep) => `${sum} ${dep.name}@${dep.targetVerion}`,
    terminalCommand[packageManagerChoice].upgrade
  ) : undefined;
  const removeCommand = removes.length > 0 ? removes.reduce(
    (sum, depName) => `${sum} ${depName}`,
    terminalCommand[packageManagerChoice].remove
  ) : undefined;

  const sep = seperator[terminalChoice];

  const command = [addCommand, upgradeCommand, removeCommand].reduce<string>(
    (sum, c) => {
      if (c === undefined) return sum;
      if (sum === "") {
        return c;
      }
      return `${sum} ${sep} ${c}`;
    },
    ""
  );

  return command;
});