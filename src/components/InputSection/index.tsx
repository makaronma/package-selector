import { ArrowDownIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Constants from "~/constants";
import { isJsonTextInputValidAtom, jsonTextInputAtom } from "~/store/atoms";

const InputArea = () => {
  const setJsonTextInputAtom = useSetAtom(jsonTextInputAtom);
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJsonTextInputAtom(e.target.value);
    },
    [setJsonTextInputAtom]
  );

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.style.height = "250px";
  }, []);
  return (
    <TextareaAutosize
      ref={textAreaRef}
      style={{ height: 250 }}
      className="w-4/5 resize p-2 text-xs"
      maxRows={5}
      onChange={onChange}
      defaultValue={Constants.defaultInput}
    />
  );
};

const IsValidDisplay = () => {
  const isJsonTextInputValid = useAtomValue(isJsonTextInputValidAtom);

  return (
    <div className="mx-auto w-4/5 self-start flex mb-1">
      {isJsonTextInputValid ? (
        <>
          <span className="mr-1">Valid Format</span>
          <CheckCircleIcon className="w-4 text-green-600" />
        </>
      ) : (
        <>
          <span className="mr-1">Invalid Format</span>
          <XCircleIcon className="w-4 text-red-600" />
        </>
      )}
    </div>
  );
};

const InputSection = () => {
  return (
    <div className="mb-12 flex w-full flex-col items-center">
      <div className="font-semibold mb-1">Paste your package.json here</div>
      <div className="shadow-lg rounded-full p-1 bg-white animate-arrow-bounce mb-1">
        <ArrowDownIcon className="h-5 text-sky-500" />
      </div>
      <IsValidDisplay />
      <InputArea />
    </div>
  );
};
export default InputSection;
