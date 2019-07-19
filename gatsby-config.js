require("dotenv").config();
console.log(process.env.URL_API);
module.exports = {
  siteMetadata: {
    title: "Netlify CMS | Open-Source Content Management System",
    description: "Open source content management for your Git workflow",
    menu: {
      docs: [
        {
          name: "start",
          title: "Quick Start",
        },
        {
          name: "reference",
          title: "Reference",
        },
        {
          name: "media",
          title: "Media",
        },
        {
          name: "guides",
          title: "Guides",
        },
        {
          name: "contributing",
          title: "Contributing",
        },
      ],
    },
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-typescript",
    "gatsby-plugin-tslint",
    "gatsby-image",
    {
      resolve: "gatsby-plugin-styled-components",
      options: {},
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/Home`,
        name: "home",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/website`,
        name: "website",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
          },
        ],
      },
    },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     typeName: "Api",
    //     fieldName: "api",
    //     url: /* "http://localhost:3000/graphql" */process.env.URL_API
    //     refetchInterval: 60
    //   },
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/assets`,
        name: "images",
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-102906433-1",
    //     respectDNT: true,
    //     exclude: ["/public/**", "/admin/**"]
    //   }
    // },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify-identity-widget",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`,
        publicPath: `admin/test/index.html`,
        enableIdentityWidget: false
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`,
        publicPath: `admin/test2`
      },
    },
    // "gatsby-plugin-netlify", // make sure to keep it last in the array
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "NetlifyCMS",
        short_name: "NetlifyCMS",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone",
        icon: "static/img/favicon/icon-512x512.png",
      },
    },
  ],
};
