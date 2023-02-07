import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Constants from "~/constants";
import { useAtomValue } from "jotai";
import { resultAtom } from "~/store/atoms";
import TerminalTopTabBar from "./TerminalTopTabBar";

const terminalCommand: Record<
  PackageManagerType,
  Record<Exclude<ActionChoice, "ignore">, string>
> = {
  pnpm: {
    add: "pnpm add",
    remove: "pnpm remove",
    upgrade: "pnpm up",
  },
  yarn: {
    add: "yarn add",
    remove: "yarn remove",
    upgrade: "yarn upgrade",
  },
  npm: {
    add: "npm i",
    remove: "npm uninstall",
    upgrade: "npm update",
  },
};

const CommandDisplaySection = () => {
  const result = useAtomValue(resultAtom);
  // const [isCopied, setIsCopied] = useState<boolean>(false);

  // const command = useMemo((): string => {
  //   const depToAdds: string[] = [];
  //   const depToRemoves: string[] = [];
  //   const depToUpgrades: string[] = [];
    
  //   const devDepToAdds: string[] = [];

  //   const depGroup = {
  //     add: depToAdds,
  //     remove: depToRemoves,
  //     upgrade: depToUpgrades,
  //   };
    
  //   const devDepGroup = {
  //     ...depGroup,
  //     add: devDepToAdds,
  //   };

  //   dependencies.forEach((d) => {
  //     if(d.action !== "ignore") depGroup[d.action].push(`${d.name}${getVer(d)}`)
  //   });

  //   devDependencies.forEach((d) => {
  //     if(d.action !== "ignore") devDepGroup[d.action].push(`${d.name}${getVer(d)}`)
  //   });

  //   const seperator = terminalType === "VS Code" ? ";" : "&&";
    
  //   return `
  //       ${depToAdds.length>0?`${terminalCommand[packageManagerType].add} ${depToAdds.join(" ")} ${seperator}`:""} 
  //       ${depToRemoves.length>0?`${terminalCommand[packageManagerType].remove} ${depToRemoves.join(" ")} ${seperator}`:""} 
  //       ${depToUpgrades.length>0?`${terminalCommand[packageManagerType].upgrade} ${depToUpgrades.join(" ")} ${seperator}`:""} 
  //       ${devDepToAdds.length>0?`${terminalCommand[packageManagerType].add} -D ${devDepToAdds.join(" ")} ${seperator}`:""} 
  //     `
  //   ;
  // }, [dependencies, devDependencies, packageManagerType, terminalType]);
  
  // const onCopy = () => setIsCopied(true);
  return (
    <div className="relative mx-auto w-4/5 overflow-hidden rounded-lg shadow-lg">
      <TerminalTopTabBar />

      <div className="h-full items-center overflow-auto bg-slate-800 px-4 py-6 text-lg  text-slate-200">
        {/* {command} */}
      </div>
    </div>
  );
}

export default CommandDisplaySection;