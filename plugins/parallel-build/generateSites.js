import { getDirectories } from "./utils.js";
import { NetlifyAPI } from "netlify";

const token = process.env.PARALLEL_NETLIFY_API_KEY;
const account = process.env.PARALLEL_NETLIFY_ACCOUNT;

const api = new NetlifyAPI(token);

export const generateSites = async (path, netlifyConfig) => {
  const sites = await api.listSites();
  const siteNames = sites.map((site) => site.name);

  const dirs = getDirectories(path);

  console.log("Checking sub-sites are created");
  for (const dir of dirs) {
    if (!siteNames.includes(`parallel-test-pages-${dir}`)) {
      console.log(`Creating sub-site parallel-test-pages-${dir}`);

      const site = await api.createSiteInTeam({
        account_slug: account,
        body: {
          name: `parallel-test-pages-${dir}`,
          repo: {
            provider: "github",
            repo: "hs-netlify/parallel-build",
            private: false,
            branch: "main",
            // cmd: netlifyConfig.build.command,
            // dir: ".next",
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
          processing_settings: {
            ignore_html_forms: true,
          },
        },
      });
    }
  }
};
