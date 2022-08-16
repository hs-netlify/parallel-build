import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";
import { checkDiff, setToml, setParallelBuilt, getSite } from "./utils.js";

const target = process.env.MULTI_ZONE_PAGE_FRAG;

export const onPreBuild = async function ({ netlifyConfig, utils, constants }) {
  let parallelBuilt = netlifyConfig.build.environment.MULTI_ZONE_BUILT || false;
  const { git, build } = utils;

  const path = "./pages";

  if (!target) {
    const site = await getSite(constants.SITE_ID);
    await generateSites(path, site);
    setToml(netlifyConfig, path, site);
  }

  if (parallelBuilt) {
    await checkDiff(git, target, build);
  }

  await ignorePages(path, target);

  await setParallelBuilt(netlifyConfig);
};
