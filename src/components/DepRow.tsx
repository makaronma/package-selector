import { useState } from 'react';

import { Dependency, DependencyAction, dependencyActions, DependencyTargetVersion, dependencyTargetVersion } from '../types';
import SelectActionCol from './SelectActionCol';
import SelectTargetVerCol from './SelectTargetVersionCol';

const DepRow = ({ dep, index, isDev }: { dep: Dependency; index: number, isDev?: boolean }) => {
  const [actionChoice, setActionChoice] = useState<DependencyAction>('add');
  const [versionChoise, setVersionChoise] = useState<DependencyTargetVersion>('default');
  
  return (
    <tr
      className="border-black 
                  [&>td:not(:first-child)]:text-center [&>td]:min-w-[100px] [&>td]:border-[1px] [&>td]:border-black [&>td]:py-1
                  [&>td]:px-3
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
      {dependencyTargetVersion.map(v=>(
        <SelectTargetVerCol
          depName={dep.name}
          value={v}
          setChoice={setVersionChoise}
          choice={versionChoise}
          isDev={isDev}
          key={`radio-${index}-${v}`}
        />
      ))}
    </tr>
  );
}

export default DepRow;
