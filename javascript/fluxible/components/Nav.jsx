var React = require('react');
var Link = require('react-router').Link;
var StateMixin = require('react-router').State;

var Nav = React.createClass({
    mixins: [StateMixin],
    render: function() {
        // use react-router mixin to handle the view on Nav
        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                <li className={this.isActive('/') ? 'pure-menu-selected' : ''}><Link to='/'>Home</Link></li>
                <li className={this.isActive('/about') ? 'pure-menu-selected' : ''}><Link to='/about'>About</Link></li>
            </ul>
        );
    }
});
 
module.exports = Nav;