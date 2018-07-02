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
  ],
}
