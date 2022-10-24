require("dotenv").config();

module.exports = {
    // Website title, shown in left sidebar and in page title
    title: "onwardly faring",
    // Site URL to generate absolute URLs. Used across the board. 
    url: "https://onwardlyfaring.com" || process.env.URL || "http://localhost:8080",
    // Profile image for left sidebar
    image: "/assets/images/blackberry5.svg",
    // Image alt text for left sidebar
    imageAlt: "a blackberry",
    // Author name, shown in left sidebar, and used in JSON-LD
    author: "matisse catherine",
    // Site description, shown below site image (optional)
    description: "as a blackberry, \ sweet or puckery",


    // OpenGraph default image, in case you don't have an `image`
    // set in your Markdown frontmatter; relevant for social
    // sharing.
    openGraphDefaultImage: "/assets/images/blackberry5.svg",
    // // GitHub ID (optional, remove it not needed), used for link in the left sidebar
    // socialGitHub: "muenzpraeger",
    // // LinkedIn ID  (optional, remove it not needed), used for link in the left sidebar
    // socialLinkedIn: "muenzpraeger",
    // // Twitter ID  (optional, remove it not needed), used for link in the left sidebar, and for OpenGraph sharing information
    // socialTwitter: "muenzpraeger",
    // // YouTube ID/Channel  (optional, remove it not needed), used for link in the left sidebar
    // socialYouTube: "UCH60RRaY2GI9m62z1loLjcA",
    // Google Analytics ID  (optional, remove it not needed), used for... well, Google Analytics
    googleAnalytics: "UA-209482536-1",
    // Algolia-powered search  (optional, remove it not needed),
    // See: https://github.com/algolia/algoliasearch-netlify
    algoliaSearch: {
        // When enabled shows the search bar in the UI
        enabled: false,
        // You'll have to set this manually in your build settings.
        // The value comes from Algolia, and is either visible in the
        // UI for the Crawler Plugin or the Algolia Dashboard.
        appId: process.env.ALGOLIA_APP_ID,
        // You'll have to set this manually in your build settings.
        // The value comes from Algolia, and is either visible in the
        // UI for the Crawler Plugin or the Algolia Dashboard.
        searchApiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        // You'll have to set this manually in your build settings.
        // The value comes from Algolia, and is either visible in the
        // UI for the Crawler Plugin or the Algolia Dashboard.
        siteId: process.env.ALGOLIA_SITE_ID,
        // Assuming that you deploy your "main" branch. Otherwise you
        // can either override or configure this (using process.env.HEAD)
        branch: "main"
    }
};
