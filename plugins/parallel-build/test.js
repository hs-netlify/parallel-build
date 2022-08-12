import { NetlifyAPI } from "netlify";
const runTest = async () => {
  const api = new NetlifyAPI("-QWMHUqdjIuYXp3i9xvQJFRhI25Q4lAJkxF05RcRpkQ");
  let env = (
    await api.getSite({ site_id: "7feeca74-c8a0-444d-900e-71db8c75c272" })
  )?.build_settings?.env;
  env["PARALLEL_BUILD"] = true;
  const updatedSite = await api.updateSite({
    site_id: "7feeca74-c8a0-444d-900e-71db8c75c272",
    body: {
      build_settings: {
        env,
      },
    },
  });
  console.log(updatedSite.build_settings.env);
};

runTest();
