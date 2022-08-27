import { usePackages } from "../hooks/usePackages";

const PackageSelectSection = () => {
  const { dataInput: data } = usePackages();
  return (
    <div className="">
      {data.dependencies &&
        Object.keys(data.dependencies)?.map((d) => (
          <div className="">{d}</div>
        ))}
    </div>
  );
};

export default PackageSelectSection;
