'use strict';
var React = require('react');
 
module.exports = React.createClass({
  render: function() {
    // insert raw HTML.
    // <div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />
    // http://facebook.github.io/react/docs/jsx-gotchas.html
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
          <script src="bundle.js" defer></script>
        </body>
      </html>
    );
  }
});