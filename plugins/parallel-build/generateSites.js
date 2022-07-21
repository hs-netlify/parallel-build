import fs from "fs";
import fetch from "node-fetch";
import { NetlifyAPI } from "netlify";

//Replace below token with Env var
const api = new NetlifyAPI("-QWMHUqdjIuYXp3i9xvQJFRhI25Q4lAJkxF05RcRpkQ");

export const generateSites = async (path) => {
  const sites = await api.listSites();
  const siteNames = sites.map((site) => site.name);

  const getDirectories = (path) => {
    return fs.readdirSync(path).filter((file) => {
      return fs.statSync(path + "/" + file).isDirectory();
    });
  };

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
        },
      });
    }

    // else {
    //   const site = sites.find(
    //     (site) => site.name === `parallel-test-pages-${dir}`
    //   );
    //   const deploy = await api.createSiteDeploy({ site_id: site.id, body: {} });
    //   console.log(`Site ${site.name} redeployed - ${deploy.id}`);
    // }
  }
};
