import { useSetAtom } from "jotai";
import { memo, useCallback } from "react";
import { depRowAtom } from "~/store/atoms";

interface SelectActionCellProps {
  depName: string
  actionChoice: ActionChoice;
  isChecked: boolean
  isDev?: boolean;
}

const SelectActionCell = ({ depName, actionChoice, isChecked, isDev }: SelectActionCellProps) => {
  const setDepRowData = useSetAtom(depRowAtom);

  const onClick = useCallback(() => {
    setDepRowData((prev) => ({ ...prev, actionChoice }));
    
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
  }, [actionChoice, setDepRowData]);

  return (
    <td className="hover:bg-slate-50" onClick={onClick}>
      <input
        type="radio"
        checked={isChecked}
        className="radio checked:bg-blue-500 m-auto flex"
      />
    </td>
  );
};

export default memo(SelectActionCell);