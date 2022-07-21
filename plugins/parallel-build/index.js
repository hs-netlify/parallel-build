const fs = require("fs");

module.exports = {
  onPreBuild: ({ inputs }) => {
    const dir = "./pages/movie2";
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${dir} is deleted!`);
    });
  },
};
