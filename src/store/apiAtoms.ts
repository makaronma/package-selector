import axios from "axios";
import { atom } from "jotai";
import { ApiEndPointChoice, endPoints } from "~/api";

export const apiEndPointChoiceAtom = atom<ApiEndPointChoice>("npmJs");

const baseFetcherAtom = atom((get) => ({
  client: axios.create({
    baseURL: endPoints[get(apiEndPointChoiceAtom)],
  }),
}));

export const apiClientAtom = atom((get) => get(baseFetcherAtom).client);
