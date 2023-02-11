import { memo, useCallback, useMemo } from "react";
import useDepDetail from "~/hooks/useDepDetail";

interface DepLatestVerCellProps {
  name: DependencyBaseData["name"];
  version: DependencyBaseData["version"];
  isDev?: boolean;
}
// TODO: escape '/'
const DepLatestVerCell = ({ name, version }: DepLatestVerCellProps) => {
  const { data: depDetail } = useDepDetail(name);

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
      {depDetail?.repo?.url ? (
        <a
          href={depDetail.repo.url.replace(/git\+|\.git/g, "")}
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
