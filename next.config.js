module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },
  assetPrefix: process.env.MULTI_ZONE_PAGE_PAGE_FRAG || "",
};
