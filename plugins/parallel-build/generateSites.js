import { getDirectories } from "./utils.js";
import fetch from "node-fetch";

const token = process.env.PARALLEL_NETLIFY_API_KEY;
const account = process.env.PARALLEL_NETLIFY_ACCOUNT;

export const generateSites = async (path) => {
  const sites = await (
    await fetch(`https://api.netlify.com/api/v1/${account}/sites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

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
          body: JSON.stringify({
            account_slug: account,
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
          }),
        }
      );
    }
  }
};
