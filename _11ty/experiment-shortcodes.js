const markdownIt = require('./markdown.js');

const SHORTCODES = {
    intentions: (children) => {
        const content = markdownIt.render(children);
        return `<div class="text-xs">${content}</div>`
    },
    questions: (children) => {
        const content = markdownIt.render(children);
        return `<div class="text-yellow-900">${content}</div>`
    },
    notes: (children) => {
        const content = markdownIt.render(children);
        return `<div class="text-blue-300">${content}</div>`
    },
    results: (children) => {
        const content = markdownIt.render(children);
        return `<div class="text-lg">${content}</div>`
    }
    , contextualintentions: (children, contextName) => {
        const content = markdownIt.render(children);
        if (contextName == "summary") {
            return `<div class="text-lg">sum sum  of ${content}</div>`;
        } else if (contextName == "/experiments/exp1/") {
            return "yes you did it "
        }
        return `<div class="text-xs">full context is ${contextName}, and child is ${content}</div>`;
    },
};
  
  
// function shortcodesSet(config) {
//     config.addPairedShortcode("intentions", function(innercontent) {
//     return SHORTCODES.intentions(innercontent);
// }
// )
// };


module.exports = (eleventyConfig) => {
    eleventyConfig.addPairedShortcode('intentions', SHORTCODES.intentions);
    eleventyConfig.addPairedShortcode('questions', SHORTCODES.questions);
    eleventyConfig.addPairedShortcode('notes', SHORTCODES.notes);
    eleventyConfig.addPairedShortcode('results', SHORTCODES.results);
    eleventyConfig.addPairedShortcode('contextualintentions', SHORTCODES.contextualintentions);

};

// module.exports = function card(type) {
//     return `
//           <div class="card">
//           hi there ${type}
//           </div>
//     `;
//   };

// const markdownIt = require('./markdown.js');

// const customShortcode = (children) => {
//     const content = markdownIt.render(children);
//     return `<div>${content} excues me</div>`
// };

// module.exports = (eleventyConfig) => {
//     eleventyConfig.addPairedShortcode('customShortcode', customShortcode);
// }

