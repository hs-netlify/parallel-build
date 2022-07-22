import { generateSites } from "./generateSites.js";
import { ignorePages } from "./ignorePages.js";

const target = process.env.PARALLEL_PAGE_FRAG;

export const onPreBuild = async function () {
  const path = "./pages";
  console.log("target", target);

  console.log("Generating Sites");
  if (!target) {
    await generateSites(path);
  }

  ignorePages(path, target);
};
