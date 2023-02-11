import axios, { AxiosInstance } from "axios";
import { atom } from "jotai";
import { DependencyDetail } from "~/types/dependencyDetail";

export const getDepDetail = (depName: string, apiClient: AxiosInstance) => async () =>
  apiClient
    .get<DependencyDetail>(`/${depName}/latest`)
    .then((res) => res.data);

const baseFetcherAtom = atom({
  client: axios.create({
    baseURL: "https://registry.npmjs.org/",
  }),
});

export const apiClientAtom = atom((get) => get(baseFetcherAtom).client);