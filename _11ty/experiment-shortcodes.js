const markdownIt = require('./markdown.js');

function circle (status) {
    const radius = 8
    const strokeWidth = 2
    const halfStrokeWidth = strokeWidth / 2;
    const diameter = radius * 2;
    const size = diameter + strokeWidth;

    const svg_format_string = `style="height: ${size+4}px; width: ${size}px"
    viewBox="0 0 ${size} ${size}" class="inline fill-onwardFontColor stroke-onwardFontColor stroke-${strokeWidth}"
    xmlns="http://www.w3.org/2000/svg"`;
    
    var circle_format_string =  `cx="${radius + halfStrokeWidth}"
    cy="${radius + halfStrokeWidth-2}"
    r="${radius}"`;

    if (status == 'unchecked'){
        circle_format_string += `
        fill="none"`;
    } else if (status != 'checked'){
        circle_format_string += `
        fill="green"`;
    }
    return `<svg `+svg_format_string+`> <circle `+circle_format_string+` /> </svg> `
} ;

const FILTERS = {
    statusCircles: function (symbolString) {
        var circString = "";
        for (let char of symbolString) {
            if (char == 'X' ){
                circString+=circle("checked");
            } else if (char == 'O') {
                circString+=circle("unchecked");
            }
        }
        return circString;
    }
    , 
    relatedExperiments: function (collection = []) {
        const page = this.ctx.page;
        const requiredTag = page.url;
 
        return collection.filter(post => {
          // Filter the specified collection, confirm it isn't the current page, and has all the required tags.
          // Updated to handle potentially missing `tags` properties, per https://github.com/11ty/eleventy/discussions/2534#discussioncomment-3419991 above.
          return post.url !== page.url && post.data.tags?.includes(requiredTag)
        });
      }
}
const SHORTCODES = {
    intentions: (children) => {
        const content = markdownIt.render(children);
        if ( content == "" ) {
            return "";
        }
        return `<div>
        <h3>Intentions</h3>
        <div class="font-light dark:font-extralight">${content}</div>
        </div>`;
    },
    questions: (children) => {
        const content = markdownIt.render(children);
        if ( content == "" ) {
            return "";
        }
        return `<div>
        <h3>Questions</h3>
        <div class="font-light dark:font-extralight">${content}</div>
        </div>`
    },
    notes: (children) => {
        const content = markdownIt.render(children);
        if ( content == "" ) {
            return "";
        }
        return `<div class="md:col-span-2">
        <h3>Notes</h3>
        <div class="font-light dark:font-extralight">${content}</div>
        </div>`
    },
    results: (children) => {
        const content = markdownIt.render(children);
        if ( content == "" ) {
            return "";
        }
        return `<div class="md:col-span-2">
        <h3>Results</h3>
        <div class="font-light dark:font-extralight">${content}</div>
        </div>`
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
  
  



module.exports = (eleventyConfig) => {
    eleventyConfig.addPairedShortcode('intentions', SHORTCODES.intentions);
    eleventyConfig.addPairedShortcode('questions', SHORTCODES.questions);
    eleventyConfig.addPairedShortcode('notes', SHORTCODES.notes);
    eleventyConfig.addPairedShortcode('results', SHORTCODES.results);
    eleventyConfig.addPairedShortcode('contextualintentions', SHORTCODES.contextualintentions);
    eleventyConfig.addFilter("statusCircles", FILTERS.statusCircles);
    eleventyConfig.addNunjucksFilter("relatedExperiments", FILTERS.relatedExperiments);

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

