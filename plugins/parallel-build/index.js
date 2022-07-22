import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";
import { checkDiff, setToml } from "./utils.js";

const target = process.env.PARALLEL_PAGE_FRAG;

export const onPreBuild = async function ({ netlifyConfig, utils }) {
  const { git } = utils;

  const path = "./pages";
  console.log("target", target);

  if (!target) {
    await generateSites(path);
    setToml(netlifyConfig, path);
  }
  checkDiff(git, target);
  ignorePages(path, target);
};
