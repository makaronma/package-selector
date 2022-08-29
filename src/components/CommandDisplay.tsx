import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { usePackages } from '../hooks/usePackages';
import { getVer } from '../utils';


const CommandDisplay = () => {
  const { dependencies, devDependencies } = usePackages();
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

    
    return `
        ${depToAdds.length>0?`yarn add ${depToAdds.join(" ")};`:''} 
        ${depToRemoves.length>0?`yarn remove ${depToRemoves.join(" ")};`:''} 
        ${depToUpgrades.length>0?`yarn upgrade ${depToUpgrades.join(" ")};`:''} 
        ${devDepToAdds.length>0?`yarn add -D ${devDepToAdds.join(" ")};`:''} 
      `
    ;
  }, [dependencies, devDependencies]);
  
  const onCopy = () => setIsCopied(true);
  return (
    <div className="relative mx-auto w-4/5 overflow-hidden rounded-lg shadow-lg">
      <div className="flex items-center justify-between bg-slate-600 px-2">
        <div className="">
          <div className="p-2 text-sky-300">VS Code's Terminal</div>
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
