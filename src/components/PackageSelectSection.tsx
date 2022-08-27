import { usePackages } from "../hooks/usePackages";
import { useReactTable } from '@tanstack/react-table'
import { useEffect, useMemo } from "react";

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
    if (de)
      setDependencies(
        Object.entries(de).map((d) => ({ name: d[0], version: d[1] }))
      );

    if (devDe)
      setDevDependencies(
        Object.entries(devDe).map((d) => ({ name: d[0], version: d[1] }))
      );
  }, [dataInput, setDependencies, setDevDependencies]);  

  return (
    <div className="">
      <div className="mb-4">
        <p>Dependencies:</p>
        <table className="mx-auto">
          <thead>
            <tr>
              <td>Package Name</td>
              <td>Version</td>
            </tr>
          </thead>
          <tbody
            className="border-[1px] border-black
                      [&>tr>td]:border-black [&>tr>td]:py-1 [&>tr>td]:px-3
                      [&>tr:not(:last-child)>td]:border-b-[1px]"
          >
            {dependencies.map((d, i) => (
              <tr className="" key={`d-${d.name}-${i}`}>
                <td className="border-r-[1px] border-black">{d.name}</td>
                <td>{d.version}</td>
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