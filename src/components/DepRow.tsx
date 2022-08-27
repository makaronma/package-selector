import { useCallback, useState } from "react";
import { usePackages } from "../hooks/usePackages";
import { Dependency, DependencyAction } from "../types";

const actions: DependencyAction[] = ["add", "remove", "upgrade"];

const DepRow = ({ dep, index, isDev }: { dep: Dependency; index: number, isDev?: boolean }) => {
  const [choice, setChoice] = useState<DependencyAction>('add');
  return (
    <tr
      className="border-black 
                  [&>td:not(:first-child)]:text-center [&>td]:min-w-[100px] [&>td]:border-[1px] [&>td]:border-black [&>td]:py-1
                  [&>td]:px-3
                  "
      key={`d-${dep.name}-${index}`}
    >
      <td>{dep.name}</td>
      <td>{dep.version}</td>
      {actions.map((a) => (
        <RadioCol
          depName={dep.name}
          value={a}
          setChoice={setChoice}
          choice={choice}
          isDev={isDev}
          key={`radio-${index}-${a}`}
        />
      ))}
    </tr>
  );
}

export default DepRow;


interface RadioColProps {
  depName: string;
  value: DependencyAction;
  choice?: DependencyAction;
  setChoice: React.Dispatch<React.SetStateAction<DependencyAction>>;
  isDev?: boolean;
}

const RadioCol = ({ depName, value, choice, setChoice, isDev }: RadioColProps) => {
  const { setDependencies, setDevDependencies } = usePackages();

  const onChange = useCallback(() => {
    setChoice(value);
    if (!setDependencies || !setDevDependencies) return;
    if(isDev){
      setDevDependencies((prev) =>
        prev.map((dep) =>
          dep.name === depName
            ? {
                ...dep,
                action: value,
              }
            : dep
        )
      );
      return;
    }
    setDependencies((prev) =>
      prev.map((dep) =>
        dep.name === depName
          ? {
              ...dep,
              action: value,
            }
          : dep
      )
    );
  }, [depName, isDev, setChoice, setDependencies, setDevDependencies, value]);

  return (
    <td>
      <input
        type="radio"
        name={`radio-${depName}`}
        value={value}
        onChange={onChange}
        checked={choice === value}
        className="radio checked:bg-blue-500"
      />
    </td>
  );
};
