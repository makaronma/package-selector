import { useSetAtom } from "jotai";
import { memo, useCallback } from "react";
import { depRowAtom, updateDepActionChoiceAtom } from "~/store/atoms";

interface SelectActionCellProps {
  depName: string
  actionChoice: ActionChoice;
  isChecked: boolean
  isDev?: boolean;
}

const SelectActionCell = ({ depName, actionChoice, isChecked, isDev }: SelectActionCellProps) => {
  const updateDepActionChoice = useSetAtom(updateDepActionChoiceAtom);

  const onClick = useCallback(() => {
    updateDepActionChoice(actionChoice, depName);
    
    // if(isDev){
    //   setDevDependencies((prev) =>
    //     prev.map((dep) =>
    //       dep.name === depName
    //         ? {
    //             ...dep,
    //             action: value,
    //           }
    //         : dep
    //     )
    //   );
    //   return;
    // }
    // setDependencies((prev) =>
    //   prev.map((dep) =>
    //     dep.name === depName
    //       ? {
    //           ...dep,
    //           action: value,
    //         }
    //       : dep
    //   )
    // );
  }, [actionChoice, depName, updateDepActionChoice]);

  return (
    <td className="hover:bg-slate-50" onClick={onClick}>
      <input
        type="radio"
        checked={isChecked}
        readOnly
        className="radio checked:bg-blue-500 m-auto flex"
      />
    </td>
  );
};

export default memo(SelectActionCell);