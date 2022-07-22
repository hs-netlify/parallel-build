import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";
import { setToml } from "./utils.js";

const target = process.env.PARALLEL_PAGE_FRAG;

export const onPreBuild = async function ({ netlifyConfig }) {
  const path = "./pages";
  console.log("target", target);

  if (!target) {
    await generateSites(path);
    setToml(netlifyConfig, path);
  }

  ignorePages(path, target);
};
