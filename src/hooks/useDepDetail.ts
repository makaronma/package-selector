import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getFetchDepDetailFn } from "~/api";
import { apiClientAtom, apiEndPointChoiceAtom } from "~/store/apiAtoms";

type DepDetail = {
  name?: string;
  version?: string;
  repo?: {
    url?: string;
  };
};

const useDepDetail = (depName: string) => {
  const apiEndPointChoice = useAtomValue(apiEndPointChoiceAtom);
  const apiClient = useAtomValue(apiClientAtom);

  const url =
    apiEndPointChoice === "npmJs"
      ? `/${depName}/latest`
      : encodeURIComponent(depName);

  return useQuery<DepDetail>({
    queryKey: ["dep-detail", url],
    queryFn: getFetchDepDetailFn(apiEndPointChoice, apiClient, url),
  });
};

export default useDepDetail;
