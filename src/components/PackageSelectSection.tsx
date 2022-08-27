import { useEffect, useMemo } from 'react';

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
        <DepRow dep={d} index={i} key={`dep-row-${d.name}`} isDev />
      )),
    [devDependencies]
  );

  return (
    <div className="">
      <div className="mb-8">
        <p className="mb-2">Dependencies:</p>
        <table className="mx-auto">
          <thead>
            <tr className="[&>td:not(:first-child)]:text-center">
              <td>Package Name</td>
              <td>Version</td>
              <td>add</td>
              <td>remove</td>
              <td>upgrade</td>
            </tr>
          </thead>
          <tbody className="border-2 border-black">
            {depRows}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <p className="mb-2">DevDependencies:</p>
        <table className="mx-auto">
          <thead>
            <tr className="[&>td:not(:first-child)]:text-center">
              <td>Package Name</td>
              <td>Version</td>
              <td>add</td>
              <td>remove</td>
              <td>upgrade</td>
            </tr>
          </thead>
          <tbody className="border-2 border-black">
            {devDepRows}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PackageSelectSection;