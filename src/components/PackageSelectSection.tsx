import React, { useEffect, useMemo } from 'react';

import { usePackages } from '../hooks/usePackages';
import { transformDefaultDep } from '../utils';
import DepRow from './DepRow';
import DepTable from './DepTable';

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
    <div className="mb-20">
      <div className="mb-12">
        <p className="mx-auto mb-5 w-fit border-b-2 border-slate-400 py-1 px-20 text-xl font-bold">
          Dependencies:
        </p>
        <DepTable>{depRows}</DepTable>
      </div>
      <div className="mb-12">
        <p className="mx-auto mb-5 w-fit border-b-2 border-slate-400 py-1 px-20 text-xl font-bold">
          Dev Dependencies:
        </p>
        <DepTable isDev>{devDepRows}</DepTable>
      </div>
    </div>
  );
};


export default PackageSelectSection;