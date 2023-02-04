const actionChoices = ["ignore", "add", "remove", "upgrade"] as const;
const targetVersionChoices = ["default", "current", "latest"] as const;
const terminalTypes = ["VS Code", "Mac/Window Terminal"] as const;
const packageManagerTypes = ["pnpm", "yarn", "npm"] as const;

const Constants = {
  actionChoices,
  targetVersionChoices,
  terminalTypes,
  packageManagerTypes,
};

export default Constants;
