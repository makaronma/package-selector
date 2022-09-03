export const getDepDetail = (depName: string) => async () =>
  fetch(`https://registry.npmjs.org/${depName}/latest`).then((res) => res.json());
