import React, { createContext, useContext, useState } from "react";
import { PackageInputType } from "../types";

interface PackageContextInterface {
  isInputValid: boolean;
  setisInputValid?: React.Dispatch<React.SetStateAction<boolean>>;
  dataInput: PackageInputType;
  setDataInput?: React.Dispatch<React.SetStateAction<PackageInputType>>;
  dependencies: string[];
  setDependencies?: React.Dispatch<React.SetStateAction<string[]>>;
  devdependencies: string[];
  setDevDependencies?: React.Dispatch<React.SetStateAction<string[]>>;
}

const PackageContext = createContext<PackageContextInterface>({
  isInputValid: true,
  dataInput: {},
  dependencies: [],
  devdependencies: [],
});

export const PackageProvider = ({children}:{children:React.ReactNode}) => {
  const [dataInput, setDataInput] = useState<PackageInputType>({});
  const [isInputValid, setisInputValid] = useState<boolean>(true);
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [devdependencies, setDevDependencies] = useState<string[]>([]);

  
  return (
    <PackageContext.Provider
      value={{
        isInputValid,
        setisInputValid,
        dataInput,
        setDataInput,
        dependencies,
        setDependencies,
        devdependencies,
        setDevDependencies,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = () => useContext(PackageContext);