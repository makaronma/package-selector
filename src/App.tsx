import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { ArrowLongDownIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'

import {CopyToClipboard} from 'react-copy-to-clipboard';

const App = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const commandDisplayRef = useRef<HTMLDivElement>(null);
  const [isInputValid, setisInputValid] = useState<boolean>(false);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    textArea.value = exampleJson;
    textArea.style.height = "250px";
  }, [textAreaRef]);

  const textAreaOnchange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      try {
        const data = JSON.parse(e.target.value);
        setisInputValid(true)
        console.log(data);
      } catch (error) {
        setisInputValid(false)
      }
    },
    []
  );

  return (
    <div className="min-h-screen w-screen bg-sky-100 p-6">
      <h1 className="text-3xl font-bold">Package Selector</h1>
      <div className="">{isInputValid?'valid':'invalid'}</div>
      <InputArea ref={textAreaRef} onChange={textAreaOnchange} />
      <CommandDisplay ref={commandDisplayRef} command={"asdasdasdasddadsaasadasdkasdkjbasdbaksjjbaskdbasjkbdajksbjkdasbjksbdjkdasdasdasadsdsadasdasdasdasdaskhdbaskbdaksbdaskjbf"} />
    </div>
  );
};

export default App;

const InputArea = forwardRef<
  HTMLTextAreaElement,
  { onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }
>(({ onChange }, textAreaRef) => (
  <div className="flex w-full flex-col items-center [&>*]:mb-4 mb-4">
    <div className="">Paste your package.json here</div>
    <ArrowLongDownIcon className="h-6" />
    <TextareaAutosize
      ref={textAreaRef}
      className="w-4/5 resize p-2 text-xs"
      onChange={onChange}
    />
  </div>
));

const CommandDisplay = forwardRef<HTMLDivElement, { command: string }>(
  ({ command }, ref) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const onCopy = () => setIsCopied(true);
    return (
      <div className="relative mx-auto w-4/5 overflow-hidden rounded-lg">

        <div className="flex items-center justify-between bg-slate-600 px-2">
          <div className="">x
            <div className="p-2 text-sky-300">Terminal</div>
          </div>
          <CopyToClipboard text={command} onCopy={onCopy}>
            <div className="cursor-pointer p-2">
              <ClipboardDocumentIcon className="h-5 w-5 cursor-pointer text-white" />
            </div>
          </CopyToClipboard>
        </div>

        <div
          className="h-full items-center overflow-auto bg-slate-800 px-4 py-6 text-lg  text-slate-200"
          ref={ref}
        >
          {command}
        </div>
      </div>
    );
  }
);



const exampleJson = JSON.stringify(
  {
    name: "package-selector",
    version: "0.1.0",
    private: true,
    dependencies: {
      "@heroicons/react": "^2.0.8",
      "@testing-library/jest-dom": "^5.14.1",
      "@testing-library/react": "^13.0.0",
      "@testing-library/user-event": "^13.2.1",
      "@types/jest": "^27.0.1",
      "@types/node": "^16.7.13",
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      react: "^18.2.0",
      "react-copy-to-clipboard": "^5.1.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1",
      "react-textarea-autosize": "^8.3.4",
      typescript: "^4.4.2",
      "web-vitals": "^2.1.0",
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test",
      eject: "react-scripts eject",
    },
    eslintConfig: {
      extends: ["react-app", "react-app/jest"],
    },
    browserslist: {
      production: [">0.2%", "not dead", "not op_mini all"],
      development: [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version",
      ],
    },
    devDependencies: {
      "@types/react-copy-to-clipboard": "^5.0.4",
      autoprefixer: "^10.4.8",
      postcss: "^8.4.16",
      prettier: "^2.7.1",
      "prettier-plugin-tailwindcss": "^0.1.13",
      tailwindcss: "^3.1.8",
    },
  },
  null,
  "\t"
);
