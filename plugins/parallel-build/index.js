import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";
import { checkDiff, setToml } from "./utils.js";

const target = process.env.PARALLEL_PAGE_FRAG;

export const onPreBuild = async function ({ netlifyConfig, utils }) {
  const { git, build } = utils;

  const path = "./pages";
  console.log("target", target);

  if (!target) {
    await generateSites(path);
    setToml(netlifyConfig, path);
  }

  if (process.env.PARALLEL_BUILT) {
    await checkDiff(git, target, build);
  }
  ignorePages(path, target);
};
