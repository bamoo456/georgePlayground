var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var Application = require('../components/MainApp.jsx');
var Home = require('../components/Home.jsx');
var About = require('../components/About.jsx');

// route are nested as url display,
// e.g. when route='/about', will use the 'About.jsx' to replace the 
//      <RouteHandler /> in the 'MainApp.jsx'
var routes = (
    <Route name="app" path="/" handler={Application}>
        <Route name="about" handler={About}/>
        <DefaultRoute name="home" handler={Home}/>
    </Route>
);

module.exports = routes;