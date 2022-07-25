module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },
  distDir: process.env.BUILD_DIR || ".next",
  images: {
    domains: ["image.tmdb.org"],
  },
};
