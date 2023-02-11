import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { apiEndPointChoiceAtom } from "~/store/apiAtoms";

const ApiEndPointSelectSection = () => {
  const setApiEndPointChoice = useSetAtom(apiEndPointChoiceAtom);
  const apiEndPointChoice = useAtomValue(apiEndPointChoiceAtom);

  useEffect(() => {
    console.log(apiEndPointChoice);
  }, [apiEndPointChoice]);

  const onClickNpmJs = () => {
    setApiEndPointChoice("npmJs");
  };
  const onClickNpmIo = () => {
    setApiEndPointChoice("npmsIo");
  };

  return (
    <div className="w-full flex justify-center mb-4">
      <div className="mr-2">Api endpoint:</div>
      <div className="flex flex-row">
        <div
          className={`cursor-pointer py-[1px] p-[2px] mr-1 ${
            apiEndPointChoice === "npmJs" ? "bg-gray-200" : "bg-white hover:bg-gray-100"
          }`}
          onClick={onClickNpmJs}
        >
          npmJs
        </div>
        <div
          className={`cursor-pointer py-[1px] p-[2px] mr-1 ${
            apiEndPointChoice === "npmsIo" ? "bg-gray-200" : "bg-white hover:bg-gray-100"
          }`}
          onClick={onClickNpmIo}
        >
          npmIo
        </div>
      </div>
    </div>
  );
};

export default ApiEndPointSelectSection;