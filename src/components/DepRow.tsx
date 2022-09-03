import { useCallback, useMemo } from 'react';

import { usePackages } from '../hooks/usePackages';
import { Dependency, dependencyActions, dependencyTargetVersions, SelectActionColTypes } from '../types/userDependency';
import SelectActionCol from './SelectActionCol';
import SelectTargetVerCol from './SelectTargetVersionCol';

const DepRow = ({ dep, index, isDev }: { dep: Dependency; index: number, isDev?: boolean }) => {
  const { setDependencies, setDevDependencies, dependencies, devDependencies } = usePackages();
  const setDeps = isDev ? setDevDependencies : setDependencies;
  const deps = isDev ? devDependencies : dependencies;

  const actionChoice = useMemo(
    () => deps.find((d) => d.name === dep.name)?.action,
    [dep.name, deps]
  );
  const versionChoice = useMemo(
    () => deps.find((d) => d.name === dep.name)?.targetVersion,
    [dep.name, deps]
  );

  const setActionChoice = useCallback ((choice:NonNullable<SelectActionColTypes['choice']>) => {
    if (!setDeps) return;
    setDeps(prev => prev.map(d => d.name === dep.name ? {
      ...d,
      action: choice
    } : d))
  }, [dep.name, setDeps])

  return (
    <tr
      className="border-black 
                  [&>td:not(:first-child)]:text-center [&>td]:min-w-[100px] 
                  [&>td]:py-3
                  [&>td]:px-4
                  "
      key={`d-${dep.name}-${index}`}
    >
      <td>{dep.name}</td>
      <td>{dep.version}</td>
      {dependencyActions.map((a) => (
        <SelectActionCol
          depName={dep.name}
          value={a}
          setChoice={setActionChoice}
          choice={actionChoice}
          isDev={isDev}
          key={`radio-${index}-${a}`}
        />
      ))}
      {dependencyTargetVersions.map(v=>(
        <SelectTargetVerCol
          depName={dep.name}
          value={v}
          setChoice={()=>{}}
          choice={versionChoice}
          isDev={isDev}
          key={`radio-${index}-${v}`}
        />
      ))}
    </tr>
  );
}

export default DepRow;
