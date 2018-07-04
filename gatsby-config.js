module.exports = {
  siteMetadata: {
    title: `Alex Xie`,
  },
  plugins: [
    {
      resolve: `gatsby-source-medium`,
      options: {
        username: `@alexieyizhe`,
      },
    },
    {
      resolve: `gatsby-plugin-react-next`,
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: 'gatsby-plugin-github-pages',
      options: {
        customDomain: 'http://alexieyizhe.me/',
        publishOptions: {
          branch: 'master'
        }
      }
    }
  ],
}
