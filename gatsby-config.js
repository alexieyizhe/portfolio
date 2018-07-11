module.exports = {
  siteMetadata: {
    title: `Alex Xie - Portfolio Website`,
    siteUrl: `https://www.alexieyizhe.me`,
    description: `Personal website/portfolio of Alex Xie, a computer science student at the University of Waterloo.`,
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
      resolve: 'gatsby-transformer-sharp',
    },
    {
      resolve: 'gatsby-plugin-sharp',
    },
    {
      resolve: 'gatsby-transformer-remark',
    },
    {
      resolve: 'gatsby-plugin-sass',
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          `PT Sans`,
          `PT Serif`,
          `raleway`,
          `lato`,
          `average`,
          `ubuntu`
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `images`,
        path: `${__dirname}/static/img/`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: `UA-114911192-3`,
        // Puts tracking script in the head instead of the body
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-remove-trailing-slashes`
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                description
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    }
  ],
}
