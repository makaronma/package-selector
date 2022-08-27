import { useEffect } from 'react';

import { usePackages } from '../hooks/usePackages';
import { transformDefaultDep } from '../utils';

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

  return (
    <div className="">
      <div className="mb-4">
        <p>Dependencies:</p>
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
          <tbody
            className="border-2 border-black
                      "
          >
            {dependencies.map((d, i) => (
              <tr
                className="border-black 
                            [&>td]:min-w-[100px] [&>td]:border-[1px] [&>td]:border-black [&>td]:py-1 [&>td]:px-3
                            [&>td:not(:first-child)]:text-center
                            "
                key={`d-${d.name}-${i}`}
              >
                <td>{d.name}</td>
                <td>{d.version}</td>
                <td>{d.action === "add" ? "y" : ""}</td>
                <td>{d.action === "remove" ? "y" : ""}</td>
                <td>{d.action === "upgrade" ? "y" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p>DevDependencies:</p>
        <div className="">
          {devDependencies.map((d, i) => (
            <div className="" key={`dev-${d.name}-${i}`}>
              {d.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSelectSection;