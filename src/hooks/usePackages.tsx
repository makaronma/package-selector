import React, { createContext, useContext, useState } from "react";

import { PackageInputType } from "~/types/userDependency";

interface PackageContextInterface {
  isInputValid: boolean;
  setisInputValid?: React.Dispatch<React.SetStateAction<boolean>>;
  dataInput: PackageInputType;
  setDataInput?: React.Dispatch<React.SetStateAction<PackageInputType>>;
  dependencies: Dependency[];
  setDependencies?: React.Dispatch<React.SetStateAction<Dependency[]>>;
  devDependencies: Dependency[];
  setDevDependencies?: React.Dispatch<React.SetStateAction<Dependency[]>>;
}

const PackageContext = createContext<PackageContextInterface>({
  isInputValid: true,
  dataInput: {},
  dependencies: [],
  devDependencies: [],
});

export const PackageProvider = ({children}:{children:React.ReactNode}) => {
  const [dataInput, setDataInput] = useState<PackageInputType>({});
  const [isInputValid, setisInputValid] = useState<boolean>(true);
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [devDependencies, setDevDependencies] = useState<Dependency[]>([]);

  
  return (
    <PackageContext.Provider
      value={{
        isInputValid,
        setisInputValid,
        dataInput,
        setDataInput,
        dependencies,
        setDependencies,
        devDependencies,
        setDevDependencies,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = () => useContext(PackageContext);