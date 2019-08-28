module.exports = {
  siteMetadata: {
    title: `alexxie.ca`,
    description: ``,
    author: `@alexieyizhe`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~src": "src",
          "~assets": "src/static",
          "~components": "src/components",
          "~layouts": "src/layouts",
          "~pages": "src/pages",
          "~sections": "src/sections",
          "~utils": "src/utils",
        },
        extensions: ["ts", "tsx", "json"],
      },
    },
  ],
};
