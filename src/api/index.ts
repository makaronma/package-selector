import { DependencyDetail } from "../types/dependencyDetail";

export const getDepDetail = (depName: string) => async () =>
  fetch(`https://api.npms.io/v2/package/${depName}`).then((res) => res.json());
