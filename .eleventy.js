const { format, formatISO, getYear} = require("date-fns");
const {utcToZonedTime} = require("date-fns-tz");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginToc = require("eleventy-plugin-toc");
const { MD5 } = require("crypto-js");
const { URL } = require("url");
const { readFileSync } = require("fs");
const siteconfig = require("./content/_data/siteconfig.js");
const markdownIt = require('./_11ty/markdown.js');
const experimentShortcodes = require("./_11ty/experiment-shortcodes.js");

const formatInTimeZone = (date, fmt, tz) =>
            format(utcToZonedTime(date, tz), 
                    fmt, 
                    { timeZone: tz });

module.exports = function (eleventyConfig) {
    // Set Markdown library
    eleventyConfig.setLibrary('md', markdownIt);

    // Define passthrough for assets
    eleventyConfig.addPassthroughCopy("assets");

    // Add watch target for JS files (needed for JS bundling in dev mode)
    eleventyConfig.addWatchTarget("./assets/js/");
    // And to make this work we've to disable the .gitignore usage of eleventy.
    eleventyConfig.setUseGitIgnore(false);

    // Add 3rd party plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginToc);

    // Define 11ty template formats
    eleventyConfig.setTemplateFormats([
        "njk",
        "md",
        "svg",
        "jpg",
        "css",
        "png"
    ]);

    // Generate excerpt from first paragraph
    eleventyConfig.addShortcode("excerpt", (article) =>
        extractExcerpt(article)
    );
    // Generate everything else 
    eleventyConfig.addShortcode("nonexcerpted", (article) =>
        extractNonExcerpted(article)
    );

    experimentShortcodes(eleventyConfig);



    // eleventyConfig.addPairedShortcode('customShortcode', customShortcode);

    // eleventyConfig.addPairedShortcode("intentions", experiments);
    // eleventyConfig.addPairedShortcode("questions", experiments);
    // eleventyConfig.addPairedShortcode("notes", experiments);
    // eleventyConfig.addPairedShortcode("results", experiments);

    
      
    //   eleventyConfig.addPairedShortcode("card", (type) => {
    //     const content = md.render(type);
    //     return `
    //           <div class="card">
    //         woot woot ${content}
    //           </div>
    //     `;
    // }); 



    // Set absolute url
    eleventyConfig.addNunjucksFilter("absoluteUrl", (path) => {
        return new URL(path, siteconfig.url).toString();
    });

    // Extract reading time
    eleventyConfig.addNunjucksFilter("readingTime", (wordcount) => {
        let readingTime = Math.ceil(wordcount / 220);
        if (readingTime === 1) {
            return readingTime + " minute";
        }
        return readingTime + " minutes";
    });

    // Extract word count
    eleventyConfig.addNunjucksFilter("formatWords", (wordcount) => {
        return wordcount.toLocaleString("en");
    });

    // Returns CSS class for home page link
    eleventyConfig.addNunjucksFilter("isHomeLink", function (url, pattern) {
        return (pattern === "/" && url === "/") 
        // || (pattern === "/" && url.startsWith("/posts"))
            ? "active"
            : "";
    });

    // Returns CSS class for active page link
    eleventyConfig.addNunjucksFilter("isActiveLink", function (url, pattern) {
        return url.length > 1 && url.startsWith(pattern) ? "active" : "";
    });

    // Format dates for sitemap
    eleventyConfig.addNunjucksFilter("sitemapdate", function (date) {
        return format(date, "yyyy-MM-dd");
    });

    // Format dates for JSON-LD
    eleventyConfig.addNunjucksFilter("isodate", function (date) {
        return formatISO(date);
    });

    // Extracts the year from a post
    eleventyConfig.addNunjucksFilter("postyear", function (post) {
        if (post && post.date) {
            return getYear(post.date);
        }
        return "n/a";
    });

    // Extracts the month of a date
    eleventyConfig.addNunjucksFilter("postmonth", function (date) {
        return formatInTimeZone(date, "MMM", "UTC");
    });
     // Extracts the day of a date
     eleventyConfig.addFilter("day", function (date) {
        return formatInTimeZone(date, "dd", "UTC");
    });

    eleventyConfig.addFilter("permalinkdate", function (date) {
        const formattedTime = formatInTimeZone(date, "yyyy/MM/dd", "UTC");
        return formattedTime;

    });
   

    

    // Extracts readable date of a date
    eleventyConfig.addNunjucksFilter("readableDate", function (date) {
        return formatInTimeZone(date, "MMM dd, yyyy", "UTC");
    });

    // Add custom hash for cache busting
    const hashes = new Map();
    eleventyConfig.addNunjucksFilter("addHash", function (absolutePath) {
        const cached = hashes.get(absolutePath);
        if (cached) {
            return `${absolutePath}?hash=${cached}`;
        }
        const fileContent = readFileSync(`${process.cwd()}${absolutePath}`, {
            encoding: "utf-8"
        }).toString();
        const hash = MD5(fileContent.toString());
        hashes.set(absolutePath, hash);
        return `${absolutePath}?hash=${hash}`;
    });

    // Create custom collection for getting the newest 5 updates
    eleventyConfig.addCollection("recents", function (collectionApi) {
        return collectionApi.getAllSorted().reverse().slice(0, 5);
    });

    // Plugin for setting _blank and rel=noopener on external links in markdown content
    eleventyConfig.addPlugin(require("./_11ty/external-links.js"));

    // Plugin for transforming images
    eleventyConfig.addPlugin(require("./_11ty/srcset.js"));

    // Plugin for minifying HTML
    eleventyConfig.addPlugin(require("./_11ty/html-minify.js"));

    return {
        dir: {
            // Consolidating everything below the `content` folder
            input: "content"
        }
    };
};

// Taken from here => https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
function extractExcerpt(article) {
    if (!Object.prototype.hasOwnProperty.call(article, "templateContent")) {
        console.warn(
            'Failed to extract excerpt: Document has no property "templateContent".'
        );
        return null;
    }

    const content = article.templateContent;

    var excerpt = content.slice(0, content.indexOf("\n"));
    if (article.data.tags.includes("noticings")){
        excerpt= article.data.abstract;
    } else if (article.data.tags.includes("holdingdear")){
        excerpt= content.slice(excerpt.indexOf("<p>")+3);
        excerpt= excerpt.slice(0, excerpt.indexOf("</p>"));
    }
    
    return excerpt;
}
function extractNonExcerpted(article) {
    if (!Object.prototype.hasOwnProperty.call(article, "templateContent")) {
        console.warn(
            'Failed to extract excerpt: Document has no property "templateContent".'
        );
        return null;
    }

    const content = article.templateContent;

    var excerpt = content.slice(content.indexOf("\n"));
    if (article.data.tags.includes("noticings")){
        excerpt= article.content;
    } 
    
    return excerpt;
}
