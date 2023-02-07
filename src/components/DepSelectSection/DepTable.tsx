import { useAtomValue } from "jotai";
import Constants from "~/constants";
import { createDepRowAtom, rawDepDataAtom, rawDevDepDataAtom } from "~/store/atoms";

import SubTitleCell from "./Cells/SubTitleCell";
import DepRow from "./DepRow";

const TableHead = ({ isDev }: { isDev?: boolean }) => (
  <thead className=" border-black bg-slate-50 [&>tr>td:not(:first-child)]:text-center [&>tr>td]:px-4 [&>tr>td]:py-3">
    <tr className="text-lg font-semibold [&>td]:border-black  ">
      <td>Package Name</td>
      <td>Current Ver.</td>
      <td>Latest Ver.</td>
      <td colSpan={Constants.actionChoices.length}>Select Action</td>
      <td colSpan={Constants.targetVersionChoices.length}>Select Version</td>
    </tr>
    <tr className="[&>td]:border-black">
      <td colSpan={3}></td>
      {Constants.actionChoices.map(name =>
        <SubTitleCell isDev={isDev} name={name} key={`dep-action-${name}`} />
      )}
      {Constants.targetVersionChoices.map(name =>
        <SubTitleCell isDev={isDev} name={name} key={`dep-target-ver-${name}`} />
      )}
    </tr>
  </thead>
);

const TableBody = ({ isDev }: { isDev?: boolean }) => {
  const data = useAtomValue(isDev ? rawDevDepDataAtom : rawDepDataAtom);

  return (
    <tbody className="bg-white">
      {data?.map((dep) => (
        <DepRow
          key={`row-${dep.name}`}
          name={dep.name}
          version={dep.version}
          isDev={isDev}
          depRowAtom={createDepRowAtom()}
        />
      ))}
    </tbody>
  );
};


const DepTable = ({ isDev }: { isDev?: boolean }) => (
  <div className="mb-12">
    <p className="mx-auto mb-5 w-fit border-b-2 border-slate-400 py-1 px-20 text-xl font-bold">
      {isDev ? "Dev Dependencies:" : "Dependencies:"}
    </p>
    <table className="mx-auto overflow-hidden rounded-xl shadow-lg">
      <TableHead isDev={isDev} />
      <TableBody isDev={isDev} />
    </table>
  </div>
);

export default DepTable;
