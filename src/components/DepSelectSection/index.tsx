import DepTable from "./DepTable";

const DepSelectSection = () => {
  return (
    <div className="mb-20">
      <DepTable />
      <DepTable isDev />
    </div>
  );
};


export default DepSelectSection;