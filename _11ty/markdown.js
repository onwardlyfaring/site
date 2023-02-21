const markdownItDefault = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");


const markdownIt = markdownItDefault({
    html: true,
    xhtmlOut: true,
    linkify: true,
    typographer: true,
    breaks: false
  }).use(markdownItAnchor);
  
module.exports = markdownIt;
