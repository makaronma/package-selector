import { useSetAtom } from "jotai";
import { memo, useCallback } from "react";
import { depRowAtom } from "~/store/atoms";

interface SelectTargetVerCellProps {
  depName: string
  targetVersionChoice: TargetVersionChoice;
  isChecked: boolean
  isDev?: boolean;
}

const SelectTargetVerCell = ({ depName, targetVersionChoice, isChecked, isDev }: SelectTargetVerCellProps) => {
  const setDepRowData = useSetAtom(depRowAtom);

  const onClick = useCallback(() => {
    setDepRowData((prev) => ({ ...prev, targetVersionChoice }));

    // if(isDev){
    //   setDevDependencies((prev) =>
    //     prev.map((dep) =>
    //       dep.name === depName
    //         ? {
    //             ...dep,
    //             targetVersion: value
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
    //           targetVersion: value
    //         }
    //       : dep
    //   )
    // );
  }, [targetVersionChoice, setDepRowData]);

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

export default memo(SelectTargetVerCell);