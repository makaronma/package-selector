import { useAtomValue } from "jotai";
import { memo } from "react";
import Constants from "~/constants";
import { DepRowAtom } from "~/store/atoms";

import DepLatestVerCell from "./Cells/DepLatestVerCell";
import SelectActionCell from "./Cells/SelectActionCell";
import SelectTargetVerCell from "./Cells/SelectTargetVerCell";

interface DepRowProps {
  name: DependencyBaseData["name"];
  version: DependencyBaseData["version"];
  isDev?: boolean;
  depRowAtom: DepRowAtom;
}

const DepRow = ({ name, version, isDev, depRowAtom }: DepRowProps) => {
  const depRowData = useAtomValue(depRowAtom);

  return (
    <tr
      className="border-black
                  [&>td]:min-w-[100px]
                  [&>td]:py-3
                  [&>td]:px-4
                  [&>td:not(:first-child)]:text-center
                  "
    >
      <td>{name}</td>
      <td>{version}</td>
      <DepLatestVerCell name={name} version={version} />

      {Constants.actionChoices.map((a) => (
        <SelectActionCell
          depName={name}
          depVersion={version}
          actionChoice={a}
          isChecked={depRowData.actionChoice===a}
          isDev={isDev}
          depRowAtom={depRowAtom}
          key={`${name}-radio-actionChoice:${a}`}
          />
      ))}

      {Constants.targetVersionChoices.map((v) => (
        <SelectTargetVerCell
          depName={name}
          targetVersionChoice={v}
          isChecked={depRowData.targetVersionChoice===v}
          isDev={isDev}
          depRowAtom={depRowAtom}
          key={`${name}-radio-versionChoice:${v}`}
        />
      ))}
    </tr>
  );
};

export default memo(DepRow);
