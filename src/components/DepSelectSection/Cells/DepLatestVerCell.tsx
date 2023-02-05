import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useMemo } from "react";
import { getDepDetail } from "~/api";
import { DependencyDetail } from "~/types/dependencyDetail";

// import SelectActionCell from "../Cells/SelectActionCell";
// import SelectTargetVerCell from "../Cells/SelectTargetVerCell";
interface DepLatestVerCellProps {
  name: DependencyBaseData["name"];
  version: DependencyBaseData["version"];
  isDev?: boolean;
}
// TODO: escape '/'
const DepLatestVerCell = ({ name, version }: DepLatestVerCellProps) => {
  const { data: depDetail } = useQuery<DependencyDetail>({
    queryKey: ["dep-detail", name],
    queryFn: getDepDetail(name),
  });

  const checkHasNewer = useCallback(
    (num: number) =>
      depDetail?.version &&
      Number(depDetail.version.split(".")[num]) > Number(version.split(".")[num]),
    [depDetail?.version, version]
  );
  
  const hasNewerMajor = useMemo(()=>checkHasNewer(0),[checkHasNewer]);
  const hasNewerMinor = useMemo(()=>checkHasNewer(1),[checkHasNewer]);
  const hasNewerPatch = useMemo(()=>checkHasNewer(2),[checkHasNewer]);

  return (
    <td
      className={`${
        hasNewerMajor
          ? "bg-green-200"
          : hasNewerMinor
          ? "bg-orange-200"
          : hasNewerPatch
          ? "bg-amber-100"
          : ""
      }`}
    >
      {depDetail?.repository?.url ? (
        <a
          href={depDetail.repository.url.replace(/git\+|\.git/g, "")}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          {depDetail?.version}
        </a>
      ) : (
        <span>{depDetail?.version}</span>
      )}
    </td>
  );
};

export default memo(DepLatestVerCell);
