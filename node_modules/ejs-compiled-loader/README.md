# ejs-compiled-loader for webpack

EJS loader for [webpack](http://webpack.github.io/). Uses [ejs](https://github.com/tj/ejs) function to compile templates.

To use EJS by mde use 2.x branch and 2.x.x versions.

## Installation

`npm install ejs-compiled-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("ejs-compiled!./file.ejs");
// => returns the template function compiled with ejs templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data

// Child Templates
// path is relative to where webpack is being run
<%- include templates/child -%>
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)



