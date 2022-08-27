import { useCallback } from 'react';

import { usePackages } from '../hooks/usePackages';
import { SelectActionColTypes } from '../types';


const RadioCol = ({ depName, value, choice, setChoice, isDev }: SelectActionColTypes) => {
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
    <td className="hover:bg-slate-50" onClick={onChange}>
      <input
        type="radio"
        name={`radio-select-action-${depName}`}
        value={value}
        onChange={onChange}
        checked={choice === value}
        className="radio checked:bg-blue-500 m-auto flex"
      />
    </td>
  );
};

export default RadioCol;