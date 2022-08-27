import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { usePackages } from '../hooks/usePackages';



const CommandDisplay = () => {
  const { dependencies, devDependencies } = usePackages();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const command = useMemo((): string => {
    let depToAdd: string[] = [];
    let depToRemove: string[] = [];
    let depToUpgrade: string[] = [];
    
    let devDepToAdd: string[] = [];
    const depGroup = {
      add: depToAdd,
      remove: depToRemove,
      upgrade: depToUpgrade,
    };
    const devDepGroup = {
      ...depGroup,
      add: devDepToAdd,
    };

    dependencies.forEach((d) => depGroup[d.action].push(`${d.name}@${d.version}`) );
    devDependencies.forEach((d) => devDepGroup[d.action].push(`${d.name}@${d.version}`) );
    
    return `
        ${depToAdd.length>0?`yarn add ${depToAdd.join(" ")};`:''} 
        ${depToRemove.length>0?`yarn remove ${depToRemove.join(" ")};`:''} 
        ${depToUpgrade.length>0?`yarn upgrade ${depToUpgrade.join(" ")};`:''} 
        ${devDepToAdd.length>0?`yarn add -D ${devDepToAdd.join(" ")};`:''} 
      `
    ;
  }, [dependencies, devDependencies]);
  
  const onCopy = () => setIsCopied(true);
  return (
    <div className="relative mx-auto w-4/5 overflow-hidden rounded-lg">
      <div className="flex items-center justify-between bg-slate-600 px-2">
        <div className="">
          <div className="p-2 text-sky-300">Terminal</div>
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
