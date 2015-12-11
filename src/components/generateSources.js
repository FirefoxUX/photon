const foo = function () {
  var x = 5;
  var y = 6;
  return x + y;
}.toString();

const bar = function(x, y) {
  if(Math.random() < .5) {
    return Math.floor(x / y);
  }
  return x / y;
}.toString();

const baz = function (actor) {
  var source = getSource(actor);
  if(source.url) {
    addSource(source);
  }
}.toString();

const sourceNames = ['Home', 'Visual Design', 'Components', 'Patterns', 'Resources']
const sourceTexts = [foo, bar, baz]

function generateSources() {
  const numSources = 5;
  const sources = [];

  for(let i = 0; i<numSources; i++) {
    sources.push({
      name: sourceNames[i],
      text: sourceTexts[Math.random() * sourceTexts.length | 0]
    });
  }

  return sources;
}

module.exports = generateSources;
