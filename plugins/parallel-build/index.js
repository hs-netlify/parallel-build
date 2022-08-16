import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";
import { checkDiff, setToml, setParallelBuilt, getSiteName } from "./utils.js";

const target = process.env.MULTI_ZONE_PAGE_FRAG;

export const onPreBuild = async function ({ netlifyConfig, utils, constants }) {
  let parallelBuilt = netlifyConfig.build.environment.MULTI_ZONE_BUILT || false;
  const { git, build } = utils;

  const path = "./pages";

  if (!target) {
    const siteName = await getSiteName(constants.SITE_ID);
    await generateSites(path, siteName);
    setToml(netlifyConfig, path, siteName);
  }

  if (parallelBuilt) {
    await checkDiff(git, target, build);
  }

  await ignorePages(path, target);

  await setParallelBuilt(netlifyConfig);
};
