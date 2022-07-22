import fs from "fs";
import { getDirectories } from "./utils.js";

export const ignorePages = (path, target) => {
  const dirs = getDirectories(path);

  fs.readdir(path, (err, files) => {
    if (err) throw err;
    if (target) {
      for (const file of files) {
        if (file !== target && file !== "_app.js") {
          fs.rm(`./pages/${file}`, { recursive: true }, (err) => {
            if (err) {
              throw err;
            }
            console.log(`${file} is deleted!`);
          });
        }
      }
    } else {
      for (const dir in dirs) {
        console.log("dir", dir);
        fs.rm(`./pages/${dir}`, { recursive: true }, (err) => {
          if (err) {
            throw err;
          }
          console.log(`${file} is deleted!`);
        });
      }
    }
  });
};
