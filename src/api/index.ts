import { AxiosInstance } from "axios";
import { NpmJsDependencyDetail } from "~/types/npmJsdependencyDetail";
import { NpmIoDepDetail } from "~/types/npmIoDepDetail";

export const endPoints = {
  npmJs: "https://registry.npmjs.org/",
  npmsIo: "https://api.npms.io/v2/package/",
} as const;

export type ApiEndPointChoice = keyof typeof endPoints;


export const getFetchDepDetailFn = (
  apiEndPointChoice: ApiEndPointChoice,
  apiClient: AxiosInstance,
  url: string
) =>
  apiEndPointChoice === "npmJs"
    ? () =>
        apiClient.get<NpmJsDependencyDetail>(url).then(({ data }) => ({
          name: data.name,
          version: data.version,
          repo: {
            url: data.repository?.url,
          },
        }))
    : () =>
        apiClient
          .get<NpmIoDepDetail>(url)
          .then((res) => res.data.collected.metadata)
          .then((data) => ({
            name: data.name,
            version: data.version,
            repo: {
              url: data.repository.url,
            },
          }));
