// import { useCallback } from "react";

// import { usePackages } from "~/hooks/usePackages";
// import { SelectTargetVerCellTypes } from "~/types/userDependency";


// const SelectTargetVerCell = ({ depName, value, choice, setChoice, isDev }: SelectTargetVerCellTypes) => {
//   const { setDependencies, setDevDependencies } = usePackages();

//   const onChange = useCallback(() => {
//     if (!setDependencies || !setDevDependencies) return;

//     setChoice(value);
    
//     if(isDev){
//       setDevDependencies((prev) =>
//         prev.map((dep) =>
//           dep.name === depName
//             ? {
//                 ...dep,
//                 targetVersion: value
//               }
//             : dep
//         )
//       );
//       return;
//     }
//     setDependencies((prev) =>
//       prev.map((dep) =>
//         dep.name === depName
//           ? {
//               ...dep,
//               targetVersion: value
//             }
//           : dep
//       )
//     );
//   }, [depName, isDev, setChoice, setDependencies, setDevDependencies, value]);

//   return (
//     <td className="hover:bg-slate-50" onClick={onChange}>
//       <input
//         type="radio"
//         name={`radio-select-target-ver-${depName}`}
//         value={value}
//         onChange={onChange}
//         checked={choice === value}
//         className="radio checked:bg-blue-500 m-auto flex"
//       />
//     </td>
//   );
// };

// export default SelectTargetVerCell;
export {}