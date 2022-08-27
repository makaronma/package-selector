import React, { useEffect, useMemo } from 'react';

import { usePackages } from '../hooks/usePackages';
import { transformDefaultDep } from '../utils';
import DepRow from './DepRow';

const PackageSelectSection = () => {
  const {
    dataInput,
    setDependencies,
    dependencies,
    setDevDependencies,
    devDependencies,
  } = usePackages();

  useEffect(() => {
    if (!setDependencies || !setDevDependencies) return;
    const { dependencies: de, devDependencies: devDe } = dataInput;
    if (de) setDependencies(transformDefaultDep(de));
    if (devDe) setDevDependencies(transformDefaultDep(devDe));
  }, [dataInput, setDependencies, setDevDependencies]);  

  const depRows = useMemo(
    () =>
      dependencies.map((d, i) => (
        <DepRow dep={d} index={i} key={`dep-row-${d.name}`} />
      )),
    [dependencies]
  );
  const devDepRows = useMemo(
    () =>
    devDependencies.map((d, i) => (
        <DepRow dep={d} index={i} key={`devDep-row-${d.name}`} isDev />
      )),
    [devDependencies]
  );

  return (
    <div className="">
      <DepTable name={"Dependencies"}>
        <tbody className="border-2 border-black">{depRows}</tbody>
      </DepTable>
      <DepTable name={"DevDependencies"}>
        <tbody className="border-2 border-black">{devDepRows}</tbody>
      </DepTable>
    </div>
  );
};

const DepTable = ({ children, name}: { children: React.ReactNode, name: string })=>(
  <div className="mb-8">
    <p className="mb-2">{name}:</p>
    <table className="mx-auto">
      <TableHead />
      {children}
    </table>
  </div>
);

const TableHead = () => (
  <thead>
    <tr className="[&>td:not(:first-child)]:text-center">
      <td>Package Name</td>
      <td>Ver.</td>
      <td>Add</td>
      <td>Remove</td>
      <td>Upgrade</td>
      <td>Default</td>
      <td>Current</td>
      <td>Latest</td>
    </tr>
  </thead>
);

export default PackageSelectSection;