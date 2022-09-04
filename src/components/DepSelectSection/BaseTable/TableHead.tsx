import { dependencyActions, dependencyTargetVersions } from '../../../types/userDependency';
import SubTitleCell from '../Cells/SubTitleCell';

const TableHead = ({ isDev }: { isDev?: boolean }) => (
  <thead className=" border-black bg-slate-50 [&>tr>td:not(:first-child)]:text-center [&>tr>td]:px-4 [&>tr>td]:py-3">
    <tr className="text-lg font-semibold [&>td]:border-black  ">
      <td>Package Name</td>
      <td>Current Ver.</td>
      <td>Latest Ver.</td>
      <td colSpan={dependencyActions.length}>Select Action</td>
      <td colSpan={dependencyTargetVersions.length}>Select Version</td>
    </tr>
    <tr className="[&>td]:border-black">
      <td colSpan={3}></td>
      {dependencyActions.map(name =>
        <SubTitleCell isDev={isDev} name={name} key={`dep-action-${name}`} />
      )}
      {dependencyTargetVersions.map(name =>
        <SubTitleCell isDev={isDev} name={name} key={`dep-target-ver-${name}`} />
      )}
    </tr>
  </thead>
);

export default TableHead;