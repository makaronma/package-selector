import { ArrowLongDownIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import exampleJson from '../exampleJson';
import { usePackages } from '../hooks/usePackages';
import { processDataFromInput } from '../utils';

const InputArea = () => {
  const { isInputValid, setisInputValid, setDataInput } = usePackages();
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!setisInputValid || !setDataInput) return;
      processDataFromInput(
        e.target.value,
        (data) => {
          setisInputValid(true);
          setDataInput(data);
        },
        () => setisInputValid(false)
      );
    },
    [setDataInput, setisInputValid]
  );

  useEffect(() => {
    if (!textAreaRef.current) return;
    if (!setisInputValid || !setDataInput) return;

    textAreaRef.current.style.height = "250px";
    processDataFromInput(
      textAreaRef.current.value,
      (data) => {
        setisInputValid(true);
        setDataInput(data);
      },
      () => setisInputValid(false)
    );
  }, [setDataInput, setisInputValid]);

  return (
    <div className="mb-4 flex w-full flex-col items-center [&>*]:mb-4">
      <div className="">Paste your package.json here</div>
      <ArrowLongDownIcon className="h-6" />
      <div className="w-4/5 self-start mx-auto">{isInputValid?'valid':'invalid'}</div>
      <TextareaAutosize
        ref={textAreaRef}
        style={{height: 250}}
        className="w-4/5 resize p-2 text-xs"
        maxRows={5}
        onChange={onChange}
        defaultValue={JSON.stringify(exampleJson, null, "\t")}
      />
    </div>
  );
};
export default InputArea;
