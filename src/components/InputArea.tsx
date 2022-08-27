import { ArrowLongDownIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { usePackages } from '../hooks/usePackages';
import { PackageInputType } from '../types';

const processDataFromInput = (
  input: string,
  cb: (data: PackageInputType) => void,
  fb: () => void
) => {
  try {
    const data = JSON.parse(input) as PackageInputType;
    cb(data);
  } catch (error) {
    fb();
  }
};

const InputArea = () => {
  const {isInputValid, setisInputValid,setDataInput } = usePackages();
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
        defaultValue={exampleJson}
      />
    </div>
  );
};
export default InputArea;


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
