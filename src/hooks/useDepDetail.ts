import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { apiClientAtom, getDepDetail } from "~/api";
import { DependencyDetail } from "~/types/dependencyDetail";

const useDepDetail = (depName: string) => {
  const apiClient = useAtomValue(apiClientAtom);
  
  return useQuery<DependencyDetail>({
    queryKey: ["dep-detail", depName],
    queryFn: getDepDetail(depName, apiClient),
  });
};

export default useDepDetail;