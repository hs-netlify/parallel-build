import fs from "fs";
import { NetlifyAPI } from "netlify";

export const getDirectories = (path) => {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(path + "/" + file).isDirectory();
  });
};

export const setToml = (netlifyConfig, path) => {
  const dirs = getDirectories(path);
  for (const dir of dirs) {
    netlifyConfig.redirects.push({
      from: `/${dir}/*`,
      to: `https://parallel-test-pages-${dir}.netlify.app/${dir}/:splat`,
      status: 200,
      force: true,
    });
    netlifyConfig.redirects.push({
      from: `/${dir}/${dir}/*`,
      to: `https://parallel-test-pages-${dir}.netlify.app/:splat`,
      status: 200,
      force: true,
    });
  }
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
  const token = process.env.PARALLEL_NETLIFY_API_KEY;
  const api = new NetlifyAPI(token);

  const { SITE_ID: site_id } = netlifyConfig.build.environment;

  const site = await api.getSite({ site_id: site_id });
  console.log("Site", site);
  let env = (await api.getSite({ site_id: site_id }))?.build_settings?.env;
  console.log("Collected current envs : ", JSON.stringify(env));
  env["PARALLEL_BUILT"] = true;

  const updatedSite = await api.updateSite({
    site_id,
    body: {
      build_settings: {
        env,
      },
    },
  });
  console.log(
    "Updated envs : ",
    JSON.stringify(updatedSite.build_settings.env)
  );
};
