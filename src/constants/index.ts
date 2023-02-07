import exampleJson from "./exampleJson";

const actionChoices = ["ignore", "add", "remove", "upgrade"] as const;
const targetVersionChoices = ["default", "current", "latest"] as const;
const terminalTypes = ["VS Code", "Mac/Window Terminal"] as const;
const packageManagerTypes = ["pnpm", "yarn", "npm"] as const;

const defaultInput = JSON.stringify(exampleJson, null, "\t")

const Constants = {
  actionChoices,
  targetVersionChoices,
  terminalTypes,
  packageManagerTypes,
  exampleJson,
  defaultInput
};

export default Constants;