import fs from "fs";
import { NetlifyAPI } from "netlify";
const token = process.env.NETLIFY_API_KEY;
const api = new NetlifyAPI(token);

export const getDirectories = (path) => {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(path + "/" + file).isDirectory();
  });
};

export const setToml = (netlifyConfig, path, siteName) => {
  const dirs = getDirectories(path);
  for (const dir of dirs) {
    netlifyConfig.redirects.push({
      from: `/${dir}/${dir}/*`,
      to: `https://${siteName}-pages-${dir}.netlify.app/:splat`,
      status: 200,
      force: true,
    });
    netlifyConfig.redirects.push({
      from: `/${dir}/*`,
      to: `https://${siteName}-pages-${dir}.netlify.app/${dir}/:splat`,
      status: 200,
      force: true,
    });
  }
};

export const getSiteName = async (site_id) => {
  return (await api.getSite({ site_id }))?.name;
};

export const checkDiff = (git, target, build) => {
  if (git.modifiedFiles.length !== 0) {
    console.log("Modified files:", git.modifiedFiles);
  }

  const targetFiles = target
    ? git.fileMatch(`pages/${target}/**/*`)
    : git.fileMatch("pages/*");

  console.log("Files Matched: ", targetFiles);
  if (
    targetFiles.edited.length !== 0 ||
    targetFiles.modified.length !== 0 ||
    targetFiles.created.length !== 0 ||
    targetFiles.deleted.length !== 0
  ) {
    console.log("Re-building sub-site");
  } else {
    build.cancelBuild("Cancelling sub-site build - no files changed");
  }
};

export const setParallelBuilt = async (netlifyConfig) => {
  const { SITE_ID: site_id } = netlifyConfig.build.environment;

  let env = (await api.getSite({ site_id }))?.build_settings?.env || {};

  env["PARALLEL_BUILT"] = true;

  const updatedSite = await api.updateSite({
    site_id,
    body: {
      build_settings: {
        env,
      },
    },
  });
};
