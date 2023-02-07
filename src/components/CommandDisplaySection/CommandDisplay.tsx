import { useAtomValue } from "jotai";
import { commandAtom, resultAtom } from "~/store/atoms";

const CommandDisplay = () => {
  const command = useAtomValue(commandAtom);

  return (
    <div className="h-full items-center overflow-auto bg-slate-800 px-4 py-6 text-lg text-slate-200">
      {command}
    </div>
  );
}

export default CommandDisplay;