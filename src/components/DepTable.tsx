import { DependencyAction, dependencyActions, DependencyTargetVersion, dependencyTargetVersions } from "../types/userDependency";
import capitalize from 'lodash/capitalize'
import { usePackages } from "../hooks/usePackages";
import { useCallback, useMemo } from "react";
import { strEqualToArrOfStr } from "../utils";

const DepTable = ({ children, isDev }: { children: React.ReactNode, isDev?: boolean }) => (
  <table className="mx-auto overflow-hidden rounded-xl shadow-lg">
    <TableHead isDev={isDev} />
    <TableBody>{children}</TableBody>
  </table>
);

const TableHead = ({ isDev }: { isDev?: boolean }) => (
  <thead className=" border-black bg-slate-50 [&>tr>td:not(:first-child)]:text-center [&>tr>td]:px-4 [&>tr>td]:py-3">
    <tr className="text-lg font-semibold [&>td]:border-black  ">
      <td className="">Package Name</td>
      <td>Current Ver.</td>
      <td>Latest Ver.</td>
      <td colSpan={dependencyActions.length}>Select Action</td>
      <td colSpan={dependencyTargetVersions.length}>Select Version</td>
    </tr>
    <tr className="[&>td]:border-black">
      <td></td>
      <td></td>
      <td></td>
      {dependencyActions.map(name=><SubTitleCell isDev={isDev} name={name} key={`dep-action-${name}`} />)}
      {dependencyTargetVersions.map(name=><SubTitleCell isDev={isDev} name={name} key={`dep-target-ver-${name}`} />)}
    </tr>
  </thead>
);

const SubTitleCell = ({ name, isDev }: { name: DependencyAction | DependencyTargetVersion, isDev?: boolean }) => {
  const {setDependencies,setDevDependencies}=usePackages()
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

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="bg-white">{children}</tbody>
);

export default DepTable;
