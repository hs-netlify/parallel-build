import fs from "fs";

export const getDirectories = (path) => {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(path + "/" + file).isDirectory();
  });
};
