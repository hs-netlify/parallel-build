import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";
import { checkDiff, setToml, setParallelBuilt } from "./utils.js";

const target = process.env.PARALLEL_PAGE_FRAG;

export const onPreBuild = async function ({ netlifyConfig, utils }) {
  let parallelBuilt = netlifyConfig.build.environment.PARALLEL_BUILT || false;
  const { git, build } = utils;

  const path = "./pages";
  console.log("target", target);

  if (!target) {
    await generateSites(path, netlifyConfig);
    setToml(netlifyConfig, path);
  }
  //Put back if we can skip for first build on all endpoints
  if (parallelBuilt) {
    await checkDiff(git, target, build);
  }

  await ignorePages(path, target);

  // await setParallelBuilt(netlifyConfig);
};
