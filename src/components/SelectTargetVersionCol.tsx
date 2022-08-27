import { useCallback } from 'react';

import { usePackages } from '../hooks/usePackages';
import { SelectTargetVerColTypes } from '../types';


const SelectTargetVerCol = ({ depName, value, choice, setChoice, isDev }: SelectTargetVerColTypes) => {
  const { setDependencies, setDevDependencies } = usePackages();

  const onChange = useCallback(() => {
    if (!setDependencies || !setDevDependencies) return;

    setChoice(value);
    
    if(isDev){
      setDevDependencies((prev) =>
        prev.map((dep) =>
          dep.name === depName
            ? {
                ...dep,
                targetVersion: value
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
              targetVersion: value
            }
          : dep
      )
    );
  }, [depName, isDev, setChoice, setDependencies, setDevDependencies, value]);

  return (
    <td className="">
      <input
        type="radio"
        name={`radio-select-target-ver-${depName}`}
        value={value}
        onChange={onChange}
        checked={choice === value}
        className="radio checked:bg-blue-500 m-auto flex"
      />
    </td>
  );
};

export default SelectTargetVerCol;