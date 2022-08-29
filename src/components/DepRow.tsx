import { useState } from 'react';

import { Dependency, DependencyAction, dependencyActions, DependencyTargetVersion, dependencyTargetVersions } from '../types';
import SelectActionCol from './SelectActionCol';
import SelectTargetVerCol from './SelectTargetVersionCol';

const DepRow = ({ dep, index, isDev }: { dep: Dependency; index: number, isDev?: boolean }) => {
  const [actionChoice, setActionChoice] = useState<DependencyAction>(dependencyActions[0]);
  const [versionChoise, setVersionChoise] = useState<DependencyTargetVersion>(dependencyTargetVersions[0]);
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
