import { useSetAtom } from "jotai";
import { memo, useCallback } from "react";
import { DepRowAtom, updateDepTargetVerChoiceAtom } from "~/store/atoms";

interface SelectTargetVerCellProps {
  depName: string
  targetVersionChoice: TargetVersionChoice;
  isChecked: boolean
  isDev?: boolean;
  depRowAtom: DepRowAtom;
}

const SelectTargetVerCell = ({ depName, targetVersionChoice, isChecked, isDev, depRowAtom }: SelectTargetVerCellProps) => {
  const updateDepTargetVerChoice = useSetAtom(updateDepTargetVerChoiceAtom);

  const onClick = useCallback(() => {
    updateDepTargetVerChoice(depRowAtom, depName, targetVersionChoice);
  }, [updateDepTargetVerChoice, depRowAtom, depName, targetVersionChoice]);

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

export default memo(SelectTargetVerCell);