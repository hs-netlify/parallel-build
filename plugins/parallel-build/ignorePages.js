import fs from "fs";

export const ignorePages = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      if (target && file !== target && file !== "_app.js") {
        fs.rm(`./pages/${file}`, { recursive: true }, (err) => {
          if (err) {
            throw err;
          }
          console.log(`${file} is deleted!`);
        });
      }
    }
  });
};
