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
  }
};

export const checkDiff = (git, target) => {
  if (git.modifiedFiles.length !== 0) {
    console.log("Modified files:", git.modifiedFiles);
  }
};
