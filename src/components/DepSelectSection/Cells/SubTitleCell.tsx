import { capitalize } from "lodash";
import { useMemo, useCallback } from "react";
import { usePackages } from "../../../hooks/usePackages";
import { DependencyAction, DependencyTargetVersion, dependencyActions, dependencyTargetVersions } from "../../../types/userDependency";
import { strEqualToArrOfStr } from "../../../utils";

const SubTitleCell = ({ name, isDev }: { name: DependencyAction | DependencyTargetVersion, isDev?: boolean }) => {
  const { setDependencies, setDevDependencies } = usePackages();
  const setDeps = isDev ? setDevDependencies : setDependencies;

  const propToSet = useMemo(
    () =>
      strEqualToArrOfStr<DependencyAction>(name, dependencyActions)
        ? { action: name }
        : strEqualToArrOfStr<DependencyTargetVersion>(name, dependencyTargetVersions)
        ? { targetVersion: name }
        : {},
    [name]
  );

  const onClick = useCallback(() => {
    if (!setDeps) return;
    setDeps((prev) =>
      prev.map((dep) => ({
        ...dep,
        ...propToSet
      }))
    );
  }, [propToSet, setDeps]);
  return(
    <td className="hover:bg-slate-200" key={`dep-sub-title-${name}`} onClick={onClick}>
      <div className="cursor-pointer">{capitalize(name)}</div>
    </td>
)};

export default SubTitleCell;
