module.exports = {
  siteMetadata: {
    title: `Alex Xie`,
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
    /* KEEP GH-PAGES PLUGIN LAST IN PLUGIN LIST */
    {
      resolve: 'gatsby-plugin-github-pages',
      options: {
        customDomain: 'http://alexieyizhe.me/',
        publishOptions: {
          branch: 'master',
          user: {
            name: 'Alex\'s Deploy Bot',
            email: 'alex_bot@alexieyizhe.me'
          },
          message: '[AUTO DEPLOY] Website Update'
        }
      }
    }
  ],
}
