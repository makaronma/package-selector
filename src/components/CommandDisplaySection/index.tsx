import CommandDisplay from "./CommandDisplay";
import TerminalTopTabBar from "./TerminalTopTabBar";

const CommandDisplaySection = () => {
  // const onCopy = () => setIsCopied(true);
  return (
    <div className="relative mx-auto w-4/5 overflow-hidden rounded-lg shadow-lg">
      <TerminalTopTabBar />
      <CommandDisplay />
    </div>
  );
}

export default CommandDisplaySection;