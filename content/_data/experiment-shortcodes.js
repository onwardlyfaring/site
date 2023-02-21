// const SHORTCODES = {
//     intentions: () => {
//         return `<div class="intentions text-xs">${innercontent}<div>`
//     },
//     questions: () => {
//         return `<div class="questions text-yellow-900">${innercontent}<div>`
//     },
//     notes: () => {
//         return `<div class="notes text-onwardExternalLinkColor">${innercontent}<div>`
//     },
//     results: () => {
//         return `<div class="results text-lg">${innercontent}<div>`
//     }
// };
  
  
// function shortcodesSet(config) {
//     config.addPairedShortcode("intentions", function(innercontent) {
//     return SHORTCODES.intentions(innercontent);
// }
// )
// };


// module.exports = SHORTCODES;

module.exports = function card(type) {
    return `
          <div class="card">
          hi there ${type}
          </div>
    `;
  };

