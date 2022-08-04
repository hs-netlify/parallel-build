import { NetlifyAPI } from "netlify";
import { getDirectories } from "./utils.js";

//Replace below token with Env var
const api = new NetlifyAPI("-QWMHUqdjIuYXp3i9xvQJFRhI25Q4lAJkxF05RcRpkQ");
const token = "-QWMHUqdjIuYXp3i9xvQJFRhI25Q4lAJkxF05RcRpkQ";
export const generateSites = async (path) => {
  const sites = await api.listSites();
  const siteNames = sites.map((site) => site.name);

  const dirs = getDirectories(path);

  console.log("Checking sub-sites are created");
  for (const dir of dirs) {
    if (!siteNames.includes(`parallel-test-pages-${dir}`)) {
      console.log(`Creating sub-site parallel-test-pages-${dir}`);

      const site = await fetch(
        "https://api.netlify.com/api/v1/moneytronic/sites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: {
            account_slug: "moneytronic",
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
                PARALLEL_BUILT: true,
              },
            },
          },
        }
      );
    }
  }
};
