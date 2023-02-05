import { capitalize } from "lodash";
import { useMemo, useCallback } from "react";
// import { strEqualToArrOfStr } from "~/utils";
import Constants from "~/constants";

const SubTitleCell = ({ name, isDev }: { name: ActionChoice | TargetVersionChoice, isDev?: boolean }) => {
  // const { setDependencies, setDevDependencies } = usePackages();
  // const setDeps = isDev ? setDevDependencies : setDependencies;

  // const propToSet = useMemo(
  //   () =>
  //     strEqualToArrOfStr<ActionChoice>(name, Constants.actionChoices)
  //       ? { action: name }
  //       : strEqualToArrOfStr<TargetVersionChoice>(name, Constants.targetVersionChoices)
  //       ? { targetVersion: name }
  //       : {},
  //   [name]
  // );

  // const onClick = useCallback(() => {
  //   if (!setDeps) return;
  //   setDeps((prev) =>
  //     prev.map((dep) => ({
  //       ...dep,
  //       ...propToSet
  //     }))
  //   );
  // }, [propToSet, setDeps]);
  return(
    // <td className="hover:bg-slate-200" key={`dep-sub-title-${name}`} onClick={onClick}>
    //   <div className="cursor-pointer">{capitalize(name)}</div>
    // </td>
    <></>
)};

export default SubTitleCell;