module.exports = {
    siteMetadata: {
        title: `Sorting Visualizations`,
        description: `Application for visualizations of common sorting algorithms`,
        author: `@poplaw`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Sorting Visualizations`,
                short_name: `Sorting Visualizations`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`, // This path is relative to the root of the site.
            },
        },
        "gatsby-plugin-eslint",
        "gatsby-plugin-sass",
        "gatsby-plugin-offline",
    ],
};
