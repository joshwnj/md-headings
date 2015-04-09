var marked = require('marked');

module.exports = function findHeadings (content) {
  var linesTaken = 0;

  return marked.lexer(content)
    .map(function (token) {
      if (token.type !== 'heading') { return; }

      var text = token.text;
      var depth = token.depth;

      // NOTE: we're assuming that the next occurrence of `text` will be the heading.
      // Not always true but good enough for now.

      var headingPos = content.indexOf(text);
      var linesToHeading = content.substr(0, headingPos).split('\n').length - 1;
      var line = linesTaken + linesToHeading + 1;

      // move the line counter forward
      linesTaken += linesToHeading;
      content = content.substr(headingPos);

      return {
        text: text,
        depth: depth,
        line: line
      };
    })
    .filter(Boolean);
};
