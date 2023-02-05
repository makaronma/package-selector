import { memo, useCallback, useMemo } from "react";
import DepLatestVerCell from "./Cells/DepLatestVerCell";

// import SelectActionCell from "../Cells/SelectActionCell";
// import SelectTargetVerCell from "../Cells/SelectTargetVerCell";
interface DepRowProps {
  name: DependencyBaseData["name"];
  version: DependencyBaseData["version"];
  isDev?: boolean;
}

const DepRow = ({ name, version, isDev }: DepRowProps) => {
  // const setDeps = isDev ? setDevDependencies : setDependencies;
  // const deps = isDev ? devDependencies : dependencies;

  // const actionChoice = useMemo(
  //   () => deps.find((d) => d.name === dep.name)?.action,
  //   [dep.name, deps]
  // );
  // const versionChoice = useMemo(
  //   () => deps.find((d) => d.name === dep.name)?.targetVersion,
  //   [dep.name, deps]
  // );

  // const setActionChoice = useCallback ((choice:NonNullable<SelectActionCellTypes['choice']>) => {
  //   if (!setDeps) return;
  //   setDeps(prev => prev.map(d => d.name === dep.name ? {
  //     ...d,
  //     action: choice
  //   } : d))
  // }, [dep.name, setDeps])

  return (
    <tr
      className="border-black 
                  [&>td]:min-w-[100px] [&>td]:py-3 
                  [&>td]:px-4
                  [&>td:not(:first-child)]:text-center
                  "
    >
      <td>{name}</td>
      <td>{version}</td>
      <DepLatestVerCell name={name} version={version} />
      {/* {Constants.actionChoices.map((a) => (
        <SelectActionCell
          depName={dep.name}
          value={a}
          // setChoice={setActionChoice}
          choice={actionChoice}
          isDev={isDev}
          key={`radio-${index}-${a}`}
        />
      ))} */}
      {/* {Constants.targetVersionChoices.map((v) => (
        <SelectTargetVerCell
          depName={dep.name}
          value={v}
          setChoice={()=>{}}
          choice={versionChoice}
          isDev={isDev}
          key={`radio-${index}-${v}`}
        />
        <></>
      ))} */}
    </tr>
  );
};

export default memo(DepRow);
