const markdownIt = require('./markdown.js');

const SHORTCODES = {
    circle: (status = 'unchecked') => {
        const radius = 8
        const strokeWidth = 2
        const halfStrokeWidth = strokeWidth / 2;
        const diameter = radius * 2;
        const size = diameter + strokeWidth;
    
        const svg_format_string = `style="height: ${size}px; width: ${size}px"
        viewBox="0 0 ${size} ${size}" class="inline fill-onwardVeryDarkBlue stroke-onwardVeryDarkBlue stroke-${strokeWidth}"
        xmlns="http://www.w3.org/2000/svg"`;
        
        var circle_format_string =  `cx="${radius + halfStrokeWidth}"
        cy="${radius + halfStrokeWidth}"
        r="${radius}"`;
    
        if (status == 'unchecked'){
            circle_format_string += `
            fill="none"`;
        } else if (status != 'checked'){
            circle_format_string += `
            fill="green"`;
        }
        return `<svg `+svg_format_string+`> <circle `+circle_format_string+` /> </svg>`
    }, 
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
    eleventyConfig.addShortcode('circle', SHORTCODES.circle);
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

