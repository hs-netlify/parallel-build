import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";

export const onPreBuild = async function ({ inputs }) {
  const target = inputs.target;
  const directory = "./pages";

  console.log("Generating Sites");
  await generateSites(directory);

  if (target) {
    ignorePages(directory, target);
  }
};
