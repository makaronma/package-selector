import { memo } from "react";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

const BaseTable = ({ children, isDev }: { children: React.ReactNode, isDev?: boolean }) => (
  <table className="mx-auto overflow-hidden rounded-xl shadow-lg">
    <TableHead isDev={isDev} />
    <TableBody>{children}</TableBody>
  </table>
);

export default memo(BaseTable);
