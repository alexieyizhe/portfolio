// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {

}

exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/alexxie/Documents/Projects/alexieyizhe.github.io/site-redesign-2/.cache/dev-404-page.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/alexxie/Documents/Projects/alexieyizhe.github.io/site-redesign-2/src/pages/index.js"))
}

exports.json = {
  "dev-404-page.json": require("/Users/alexxie/Documents/Projects/alexieyizhe.github.io/site-redesign-2/.cache/json/dev-404-page.json"),
  "index.json": require("/Users/alexxie/Documents/Projects/alexieyizhe.github.io/site-redesign-2/.cache/json/index.json")
}