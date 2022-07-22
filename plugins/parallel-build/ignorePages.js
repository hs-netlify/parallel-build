import fs from "fs";
import { getDirectories } from "./utils.js";

export const ignorePages = (path, target) => {
  const dirs = getDirectories(path);
  console.log(dirs);

  fs.readdir(path, (err, files) => {
    if (err) throw err;
    if (target) {
      for (const file of files) {
        if (file !== target && file !== "_app.js") {
          fs.rm(`./pages/${file}`, { recursive: true }, (err) => {
            if (err) {
              throw err;
            }
            console.log(`${file} not being built`);
          });
        }
      }
    } else {
      for (const dir of dirs) {
        fs.rm(`./pages/${dir}`, { recursive: true }, (err) => {
          if (err) {
            throw err;
          }
          console.log(`${dir}/* not being built`);
        });
      }
    }
  });
};
