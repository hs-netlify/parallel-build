import { NetlifyAPI } from "netlify";
const runTest = async () => {
  const api = new NetlifyAPI("-QWMHUqdjIuYXp3i9xvQJFRhI25Q4lAJkxF05RcRpkQ");
  let env = (
    await api.getSite({ site_id: "b73696f9-57a9-4091-9cba-0ddc35710bd4" })
  )?.build_settings?.env;
  env["PARALLEL_BUILD"] = true;
  const updatedSite = await api.updateSite({
    site_id: "b73696f9-57a9-4091-9cba-0ddc35710bd4",
    body: {
      build_settings: {
        env,
      },
    },
  });
  console.log(updatedSite.build_settings.env);
};

runTest();
