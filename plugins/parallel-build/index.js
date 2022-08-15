import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";
import { checkDiff, setToml, setParallelBuilt, setPageToml } from "./utils.js";

const target = process.env.PARALLEL_PAGE_FRAG;

export const onPreBuild = async function ({ netlifyConfig, utils }) {
  let parallelBuilt = netlifyConfig.build.environment.PARALLEL_BUILT || false;
  const { git, build } = utils;

  const path = "./pages";

  if (!target) {
    await generateSites(path, netlifyConfig);
    setToml(netlifyConfig, path);
  } else {
    //setPageToml(netlifyConfig, target);
  }

  if (parallelBuilt) {
    await checkDiff(git, target, build);
  }

  await ignorePages(path, target);

  await setParallelBuilt(netlifyConfig);
};
