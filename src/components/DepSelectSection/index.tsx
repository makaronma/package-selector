// import React, { useEffect, useMemo, useState } from "react";

// import { usePackages } from "~/hooks/usePackages";
// import { transformDefaultDep } from "~/utils";
// import BaseTable from "./BaseTable";
// import DepRow from "./Rows/DepRow";

// const PackageSelectSection = () => {
//   const {
//     dataInput,
//     setDependencies,
//     dependencies,
//     setDevDependencies,
//     devDependencies,
//   } = usePackages();

//   useEffect(() => {
//     if (!setDependencies || !setDevDependencies) return;
//     const { dependencies: de, devDependencies: devDe } = dataInput;
//     if (de) setDependencies(transformDefaultDep(de));
//     else setDependencies([]);
//     if (devDe) setDevDependencies(transformDefaultDep(devDe));
//     else setDevDependencies([]);
//   }, [dataInput, setDependencies, setDevDependencies]);  

//   const depRows = useMemo(
//     () =>
//       dependencies.map((d, i) => (
//         <DepRow dep={d} index={i} key={`dep-row-${d.name}`} />
//       )),
//     [dependencies]
//   );
//   const devDepRows = useMemo(
//     () =>
//     devDependencies.map((d, i) => (
//         <DepRow dep={d} index={i} key={`devDep-row-${d.name}`} isDev />
//       )),
//     [devDependencies]
//   );


//   return (
//     <div className="mb-20">
//       <div className="mb-12">
//         <p className="mx-auto mb-5 w-fit border-b-2 border-slate-400 py-1 px-20 text-xl font-bold">
//           Dependencies:
//         </p>
//         <BaseTable>{depRows}</BaseTable>
//       </div>
//       <div className="mb-12">
//         <p className="mx-auto mb-5 w-fit border-b-2 border-slate-400 py-1 px-20 text-xl font-bold">
//           Dev Dependencies:
//         </p>
//         <BaseTable isDev>{devDepRows}</BaseTable>
//       </div>
//     </div>
//   );
// };


// export default PackageSelectSection;
export{}