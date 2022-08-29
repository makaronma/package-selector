import { dependencyActions, dependencyTargetVersions } from "../types";
import capitalize from 'lodash/capitalize'

const DepTable = ({ children }: { children: React.ReactNode }) => (
  <table className="mx-auto overflow-hidden rounded-xl shadow-lg">
    <TableHead />
    <TableBody>{children}</TableBody>
  </table>
);

const TableHead = () => (
  <thead className=" border-black bg-slate-50 [&>tr>td:not(:first-child)]:text-center [&>tr>td]:px-4 [&>tr>td]:py-3">
    <tr className="text-lg font-semibold [&>td]:border-black  ">
      <td className="">Package Name</td>
      <td>Ver.</td>
      <td colSpan={dependencyActions.length}>Select Action</td>
      <td colSpan={dependencyTargetVersions.length}>Select Version</td>
    </tr>
    <tr className="[&>td]:border-black">
      <td></td>
      <td className=""></td>
      {dependencyActions.map(d=><td key={`dep-action-${d}`}>{capitalize(d)}</td>)}
      {dependencyTargetVersions.map(d=><td key={`dep-target-ver-${d}`}>{capitalize(d)}</td>)}
    </tr>
  </thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="bg-white">{children}</tbody>
);

export default DepTable;
