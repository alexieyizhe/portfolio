const path = require(`path`); // eslint-disable-line

module.exports = {
  siteMetadata: {
    title: `alexxie.ca`,
    description: `Personal website and portfolio of Alex Yizhe Xie, a Computer Science student at the University of Waterloo.`,
    author: `@alexieyizhe`,
    siteUrl: `https://alexxie.ca`,
  },
  plugins: [
    { resolve: `gatsby-plugin-react-helmet` },
    { resolve: `gatsby-plugin-typescript` },
    { resolve: `gatsby-plugin-styled-components` },
    { resolve: `gatsby-transformer-sharp` },
    { resolve: `gatsby-plugin-sharp` },
    { resolve: `gatsby-plugin-transition-link` },
    { resolve: `gatsby-plugin-remove-trailing-slashes` },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `assets`, `images`),
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~assets": "src/assets",
          "~components": "src/components",
          "~layouts": "src/layouts",
          "~pages": "src/pages",
          "~sections": "src/sections",
          "~theme": "src/theme",
          "~types": "src/types",
          "~utils": "src/utils",
          "~src": "src",
        },
        extensions: ["ts", "tsx", "json"],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-114911192-3",
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        // eslint-disable-next-line no-useless-escape
        fonts: [`Overpass\:400,600,700`, `Roboto`],
        display: "swap",
      },
    },
    { resolve: `gatsby-plugin-sitemap` },
  ],
};
