export interface PackageInputType {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}


// export type GetDependencyTargetType<T extends "selectAction" | "selectVersion"> =
//   T extends "selectAction"
//     ? DependencyAction
//     : T extends "selectVersion"
//     ? DependencyTargetVersion
//     : never;

// export type RadioCellProps<T extends "selectAction" | "selectVersion"> = {
//   depName: string;
//   value: GetDependencyTargetType<T>;
//   choice?: GetDependencyTargetType<T>;
//   setChoice: (choice: GetDependencyTargetType<T>) => void;
//   isDev?: boolean;
// };

// export type SelectActionCellTypes = RadioCellProps<"selectAction">;
// export type SelectTargetVerCellTypes = RadioCellProps<"selectVersion">;
