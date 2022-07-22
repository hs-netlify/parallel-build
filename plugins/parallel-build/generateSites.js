import fs from "fs";
import { NetlifyAPI } from "netlify";
import { getDirectories } from "./utils.js";

//Replace below token with Env var
const api = new NetlifyAPI("-QWMHUqdjIuYXp3i9xvQJFRhI25Q4lAJkxF05RcRpkQ");

export const generateSites = async (path) => {
  const sites = await api.listSites();
  const siteNames = sites.map((site) => site.name);

  const dirs = getDirectories(path);

  for (const dir of dirs) {
    if (!siteNames.includes(`parallel-test-pages-${dir}`)) {
      const site = await api.createSite({
        account_slug: "henry-smith",
        body: {
          name: `parallel-test-pages-${dir}`,
          repo: {
            provider: "github",
            repo: "hs-netlify/parallel-build",
            private: false,
            branch: "main",
          },
          build_settings: {
            env: {
              PARALLEL_PAGE_FRAG: `${dir}`,
            },
          },
        },
      });
    }
  }
};
