import { useAtomValue, useSetAtom } from "jotai";
import { memo, useCallback } from "react";
import Constants from "~/constants";
import { packageManagerChoiceAtom, terminalChoiceAtom } from "~/store/atoms";

const TerminalChoiceTab = ({ terminalType, isSelected } : { terminalType: TerminalType, isSelected: boolean }) => {
  const setTerminalChoice = useSetAtom(terminalChoiceAtom);
  const onClick = useCallback(()=>setTerminalChoice(terminalType), [setTerminalChoice, terminalType])
  return (
    <div
      className={`p-2 mr-2 cursor-pointer ${isSelected ? "text-white border-b-2 border-white" : "text-sky-300"}`}
      onClick={onClick}
    >
      {terminalType}
    </div>
  );
};

const PackageManagerChoiceTab = ({ packageManagerType, isSelected } : { packageManagerType: PackageManagerType, isSelected: boolean }) => {
  const setpackageManagerChoice = useSetAtom(packageManagerChoiceAtom);
  const onClick = useCallback(()=>setpackageManagerChoice(packageManagerType), [packageManagerType, setpackageManagerChoice])
  return (
    <div className={`p-2 mr-2 cursor-pointer ${isSelected ? "text-white border-b-2 border-white" : "text-sky-300"}`}
      onClick={onClick}
    >
      {packageManagerType}
    </div>
  );
};

const MemoTerminalChoiceTab = memo(TerminalChoiceTab)
const MemoPackageManagerChoiceTab = memo(PackageManagerChoiceTab)

const TerminalTopTabBar = () => {
  const terminalChoice = useAtomValue(terminalChoiceAtom);
  const packageManagerChoice = useAtomValue(packageManagerChoiceAtom);

  return (
    <div className="flex items-center justify-between bg-slate-600 px-2">
      <div className="">
        <div className="flex">
          {Constants.terminalTypes.map((t) => (
            <MemoTerminalChoiceTab terminalType={t} isSelected={terminalChoice===t} key={`terminalChoice-${t}`} />
          ))}
        </div>
        <div className="flex">
          {Constants.packageManagerTypes.map((p) => (
            <MemoPackageManagerChoiceTab packageManagerType={p} isSelected={packageManagerChoice===p} key={`packageManagerChoice-${p}`} />
          ))}
        </div>
      </div>
      {/* <CopyToClipboard text={command} onCopy={onCopy}>
        <div className="cursor-pointer p-2">
          <ClipboardDocumentIcon
            className={`h-5 w-5 cursor-pointer ${
              isCopied ? "text-sky-300" : "text-white"
            }`}
          />
        </div>
      </CopyToClipboard> */}
    </div>
  );
}

export default TerminalTopTabBar;