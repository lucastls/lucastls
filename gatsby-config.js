require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-jodie/gatsby-config.js
    siteTitle: `Lucastls`,
    siteTitleAlt: `Lucastls`,
    siteHeadline: `Lucastls`,
    siteUrl: `https://lucastls.com`,
    siteDescription: `Lucas Santos personal site.`,
    siteLanguage: `en`,
    // siteImage: `/banner.jpg`,
    author: `@lekoarts_de`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-jodie`,
      // See the theme's README for all available options
      options: {
        homepagePageLimit: 2,
        homepageProjectLimit: 3,
        navigation: [
          // { name: `Photography Normal`, slug: `/photo` },
          { name: `Photography`, slug: `/photography` },
          // { name: `Photos`, slug: `/photos` },
          // { name: `Art`, slug: `/art` },
          // { name: `About`, slug: `/about` },
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: "async",
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        // If you plan on changing the font you'll also need to adjust the Theme UI config to edit the CSS
        // See: https://github.com/LekoArts/gatsby-themes/tree/main/examples/jodie#changing-your-fonts
        // web: [
        //   {
        //     name: `Work Sans`,
        //     file: `https://fonts.googleapis.com/css2?family=Work+Sans:wght@400..700&display=swap`,
        //   },
        // ],
        custom: [
          {
            name: `Work Sans`,
            // path: `${__dirname}/static/WorkSans-VariableFont_wght.ttf/`
            file: `/fonts/WorkSans-VariableFont_wght.ttf/`
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `jodie - @lekoarts/gatsby-theme-jodie`,
        short_name: `jodie`,
        description: `Image-heavy photography portfolio with colorful accents & customizable pages. Includes adaptive image grids powered by CSS grid and automatic image integration into projects.`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#b75e09`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        maxResults: 500,
        tags: true,
        context: true
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `photography`,
        path: `${__dirname}/src/photography`,
      },
    },
    {
      resolve: 'gatsby-transformer-cloudinary',
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        // enableDefaultTransformations: true,
        uploadFolder: "photography",
        overwriteExisting: false,
        transformTypes: [
          `CloudinaryAsset`,
          `CloudinaryMedia`,
        ],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 100,
          breakpoints: [1920, 1840, 1809, 1742, 1671, 1625, 1471, 1446, 1356, 1286, 1236, 1154, 1052, 944, 837, 729, 564, 334, 200, 100, 50],
          backgroundColor: `transparent`,
        },
      },
    },
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `photos`,
        path: `${__dirname}/src/photography`,
      },
    },
    {
      resolve: '@mkitio/gatsby-theme-password-protect',
      options: {
        password: process.env.NATAL_PASSWORD,
        partialMatching: false,
        pagePaths: ['/natal-2022', '/natal-2022/']
      }
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
