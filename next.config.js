module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "const-id";
  },
  assetPrefix: process.env.PARALLEL_PAGE_FRAG || "",
  rewrites() {
    return [
      {
        source: `${process.env.PARALLEL_PAGE_FRAG}/${process.env.PARALLEL_PAGE_FRAG}/_next/:path*`,
        destination: `https://parallel-test-pages-${process.env.PARALLEL_PAGE_FRAG}.netlify.app/_next/:path*`,
      },
    ];
  },
};
