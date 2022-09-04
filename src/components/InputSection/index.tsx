import { ArrowDownIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import exampleJson from '../../exampleJson';
import { usePackages } from '../../hooks/usePackages';
import { processDataFromInput } from '../../utils';


const InputSection = () => {
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
        () => {
          setisInputValid(false);
          setDataInput({ dependencies: undefined, devDependencies: undefined });
        }
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
    <div className="mb-12 flex w-full flex-col items-center">
      <div className="font-semibold mb-1">Paste your package.json here</div>
      <div className="shadow-lg rounded-full p-1 bg-white animate-arrow-bounce mb-1">
        <ArrowDownIcon className="h-5 text-sky-500" />
      </div>
      <div className="mx-auto w-4/5 self-start flex mb-1">
        {isInputValid ? 
          <><span className='mr-1'>Valid Format</span><CheckCircleIcon className='w-4 text-green-600'/></> : 
          <><span className='mr-1'>Invalid Format</span><XCircleIcon className='w-4 text-red-600'/></> 
        }
      </div>
      <TextareaAutosize
        ref={textAreaRef}
        style={{ height: 250 }}
        className="w-4/5 resize p-2 text-xs"
        maxRows={5}
        onChange={onChange}
        defaultValue={JSON.stringify(exampleJson, null, "\t")}
      />
    </div>
  );
};
export default InputSection;
