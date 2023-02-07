import { useSetAtom } from "jotai";
import { memo, useCallback } from "react";
import { DepRowAtom, updateDepActionChoiceAtom } from "~/store/atoms";

interface SelectActionCellProps {
  depName: string
  actionChoice: ActionChoice;
  isChecked: boolean
  isDev?: boolean;
  depRowAtom: DepRowAtom;
}

const SelectActionCell = ({ depName, actionChoice, isChecked, isDev, depRowAtom }: SelectActionCellProps) => {
  const updateDepActionChoice = useSetAtom(updateDepActionChoiceAtom);

  const onClick = useCallback(() => {
    updateDepActionChoice(depRowAtom,depName,actionChoice);
  }, [actionChoice, depName, depRowAtom, updateDepActionChoice]);

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