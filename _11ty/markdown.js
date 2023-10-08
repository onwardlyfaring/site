const markdownItDefault = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");


const markdownIt = markdownItDefault({
    html: true,
    xhtmlOut: true,
    linkify: true,
    typographer: true,
    breaks: false
  }).use(markdownItAnchor).use(markdownItFootnote);

  markdownIt.renderer.rules.footnote_block_open = () => (
    '<hr class="footnotes-sep border-gray-700 mt-6 pb-6">\n' +
    '<section class="footnotes">\n' +
    '<ol class="footnotes-list">\n'
  );
  
  
module.exports = markdownIt;
