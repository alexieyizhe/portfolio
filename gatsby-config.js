module.exports = {
  siteMetadata: {
    title: `Alex Xie`,
    siteUrl: `https://www.alexieyizhe.me`,
    description: `Personal website of Alex Xie.`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-medium',
      options: {
        username: `@alexieyizhe`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-next',
    },
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          `alegreya`,
          `alegreya sans`,
          `pt sans`,
          `pt serif`,
          `copse`,
          `raleway`,
          `lato`,
          `average`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-114911192-3",
        // Puts tracking script in the head instead of the body
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-remove-trailing-slashes`
    },
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ],
}
