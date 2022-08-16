import { getDirectories } from "./utils.js";
import { NetlifyAPI } from "netlify";

const token = process.env.NETLIFY_API_KEY;
const account = process.env.NETLIFY_ACCOUNT;

const api = new NetlifyAPI(token);

export const generateSites = async (path, siteName) => {
  const sites = await api.listSites();
  const siteNames = sites.map((site) => site.name);

  const dirs = getDirectories(path);

  console.log("Checking sub-sites are created");
  for (const dir of dirs) {
    if (!siteNames.includes(`${siteName}-pages-${dir}`)) {
      console.log(`Creating sub-site ${siteName}-pages-${dir}`);

      const site = await api.createSiteInTeam({
        account_slug: account,
        body: {
          name: `${siteName}-pages-${dir}`,
          repo: {
            provider: "github",
            repo: "hs-netlify/parallel-build",
            private: false,
            branch: "main",
            env: {
              PARALLEL_PAGE_FRAG: `${dir}`,
              PARALLEL_NETLIFY_API_KEY: token,
            },
          },
          build_settings: {
            env: {
              PARALLEL_PAGE_FRAG: `${dir}`,
              PARALLEL_NETLIFY_API_KEY: token,
            },
          },
        },
      });
    }
  }
};
