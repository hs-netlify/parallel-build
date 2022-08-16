# Next Multi-Zone Plugin

This plugin seperates Next.js deployments on Netlify into separate sites (zones) base on dynamic routes for increased build speeds selective rebuilds.

Builds will be cancelled if changes are not detected within the dynamic route.

## Installation

Place the plugin in ./plugins/ directory within your site

Install the plugin using npm

```bash
npm install
```

## Setup

Place the following line in your next.config.js to ensure that zones sites have separate asset preffixes.

```javascript
assetPrefix: process.env.MULTI_ZONE_PAGE_FRAG || "",
```

Set the plugin within Netlify.toml

```
[[plugins]]
  package = '/plugins/next-multi-zone-plugin'
```

## Deployment

Deploy the site to Netlify using the git connected CI/CD pipeline. Set the following environment variable on the Netlify UI:

```javascript
NETLIFY_API_KEY; //Netlify api token user acccount
```

## Limitations

Currently the plugin will not support nested dynamic routes i.e. ./pages/slug1/slug2
