import { getDirectories } from "./utils.js";
import { NetlifyAPI } from "netlify";

const token = process.env.NETLIFY_API_KEY;

const api = new NetlifyAPI(token);

export const generateSites = async (path, site) => {
  const sites = await api.listSites();
  const siteNames = sites.map((site) => site.name);
  const siteName = site.name;
  const dirs = getDirectories(path);

  console.log("Checking sub-sites are created");
  for (const dir of dirs) {
    if (!siteNames.includes(`${siteName}-pages-${dir}`)) {
      console.log(`Creating sub-site ${siteName}-pages-${dir}`);

      const zone_site = await api.createSiteInTeam({
        account_slug: site.account_slug,
        body: {
          name: `${siteName}-pages-${dir}`,
          repo: {
            provider: site.build_settings.provider,
            repo: site.build_settings.repo_path,
            private: !site.build_settings.public_repo,
            branch: site.build_settings.repo_branch,
            env: {
              MULTI_ZONE_PAGE_FRAG: `${dir}`,
              NETLIFY_API_KEY: token,
            },
          },
          build_settings: {
            env: {
              MULTI_ZONE_PAGE_FRAG: `${dir}`,
              NETLIFY_API_KEY: token,
            },
          },
        },
      });
    }
  }
};
