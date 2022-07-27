import fs from "fs";

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
    // netlifyConfig.redirects.push({
    //   from: `/${dir}/${dir}/*`,
    //   to: `https://parallel-test-pages-${dir}.netlify.app/:splat`,
    //   status: 200,
    //   force: true,
    // });
  }
};

export const checkDiff = (git, target, build) => {
  if (git.modifiedFiles.length !== 0) {
    console.log("Modified files:", git.modifiedFiles);
  }

  if (!target) {
    return;
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
