import exampleJson from "./exampleJson";

const actionChoices = ["ignore", "add", "remove", "upgrade"] as const;
const targetVersionChoices = ["default", "current", "latest"] as const;
const terminalTypes = ["VS Code", "Mac/Window Terminal"] as const;
const packageManagerTypes = ["pnpm", "yarn", "npm"] as const;

const defaultInput = JSON.stringify(exampleJson, null, "\t")

export const terminalCommand: Record<
  PackageManagerType,
  Record<Exclude<ActionChoice, "ignore">, string>
> = {
  pnpm: {
    add: "pnpm add",
    remove: "pnpm remove",
    upgrade: "pnpm up",
  },
  yarn: {
    add: "yarn add",
    remove: "yarn remove",
    upgrade: "yarn upgrade",
  },
  npm: {
    add: "npm i",
    remove: "npm uninstall",
    upgrade: "npm update",
  },
};

export const seperator: Record<TerminalType, string> = {
  "Mac/Window Terminal": "&&",
  "VS Code": ";",
};


const Constants = {
  actionChoices,
  targetVersionChoices,
  terminalTypes,
  packageManagerTypes,
  exampleJson,
  defaultInput,
};

export default Constants;
