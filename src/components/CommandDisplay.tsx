import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { usePackages } from '../hooks/usePackages';
import { DependencyAction, packageManagerTypes, PackageManagerTypes, terminalTypes, TerminalTypes } from '../types';
import { getVer } from "../utils";

const terminalCommand: Record<
  PackageManagerTypes,
  Record<Exclude<DependencyAction, "ignore">, string>
> = {
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

const CommandDisplay = () => {
  const { dependencies, devDependencies } = usePackages();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [terminalType, setTerminalType] = useState<TerminalTypes>("VS Code");
  const [packageManagerType, setPackageManagerType] = useState<PackageManagerTypes>("yarn");

  const command = useMemo((): string => {
    let depToAdds: string[] = [];
    let depToRemoves: string[] = [];
    let depToUpgrades: string[] = [];
    
    let devDepToAdds: string[] = [];
    const depGroup = {
      add: depToAdds,
      remove: depToRemoves,
      upgrade: depToUpgrades,
    };
    const devDepGroup = {
      ...depGroup,
      add: devDepToAdds,
    };

    dependencies.forEach((d) => {
      if(d.action !== "ignore") depGroup[d.action].push(`${d.name}${getVer(d)}`)
    });

    devDependencies.forEach((d) => {
      if(d.action !== "ignore") devDepGroup[d.action].push(`${d.name}${getVer(d)}`)
    });

    const seperator = terminalType === "VS Code" ? ";" : "&&";
    
    return `
        ${depToAdds.length>0?`${terminalCommand[packageManagerType].add} ${depToAdds.join(" ")} ${seperator}`:''} 
        ${depToRemoves.length>0?`${terminalCommand[packageManagerType].remove} ${depToRemoves.join(" ")} ${seperator}`:''} 
        ${depToUpgrades.length>0?`${terminalCommand[packageManagerType].upgrade} ${depToUpgrades.join(" ")} ${seperator}`:''} 
        ${devDepToAdds.length>0?`${terminalCommand[packageManagerType].add} -D ${devDepToAdds.join(" ")} ${seperator}`:''} 
      `
    ;
  }, [dependencies, devDependencies, packageManagerType, terminalType]);
  
  const onCopy = () => setIsCopied(true);
  return (
    <div className="relative mx-auto w-4/5 overflow-hidden rounded-lg shadow-lg">
      <div className="flex items-center justify-between bg-slate-600 px-2">
        <div className="">
          <div className="flex">
            {terminalTypes.map((t) => (
              <div className={`p-2 mr-2 cursor-pointer ${t === terminalType ? 
                  'text-white border-b-2 border-white' :
                  'text-sky-300'}`} 
                  key={`choice-${t}`}
                  onClick={()=>setTerminalType(t)}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="flex">
            {packageManagerTypes.map((p) => (
              <div className={`p-2 mr-2 cursor-pointer ${p === packageManagerType ? 
                  'text-white border-b-2 border-white' :
                  'text-sky-300'}`} 
                  onClick={()=>setPackageManagerType(p)}
                  key={`choice-${p}`}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
        <CopyToClipboard text={command} onCopy={onCopy}>
          <div className="cursor-pointer p-2">
            <ClipboardDocumentIcon
              className={`h-5 w-5 cursor-pointer ${
                isCopied ? "text-sky-300" : "text-white"
              }`}
            />
          </div>
        </CopyToClipboard>
      </div>

      <div className="h-full items-center overflow-auto bg-slate-800 px-4 py-6 text-lg  text-slate-200">
        {command}
      </div>
    </div>
  );
}

export default CommandDisplay;
