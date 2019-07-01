require("dotenv").config();
console.log(process.env.URL_API)
module.exports = {
  siteMetadata: {
    title: "ahn.heejong",
    description: "한국에 살며 웹사이트를 만드는 안희종입니다.",
    siteUrl: "https://ahnheejong.name"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-typescript",
    "gatsby-plugin-tslint",
    "gatsby-image",
    {
      resolve: "gatsby-plugin-styled-components",
      options: {}
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs"
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Api",
        fieldName: "api",
        url: process.env.URL_API
      },
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     path: `${__dirname}/src/img`,
    //     name: "images"
    //   }
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-102906433-1",
        respectDNT: true,
        exclude: ["/public/**", "/admin/**"]
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
