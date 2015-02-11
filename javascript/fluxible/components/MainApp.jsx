var React = require('react');

var MainAppStore = require('../stores/MainAppStore');
var Home = require('./Home.jsx');
var About = require('./About.jsx');
var Nav = require('./Nav.jsx');
var FluxibleMixin = require('fluxible').Mixin;

var mainApp = React.createClass({

    /**
     * after mixin, mainApp can have this.getStore()
     */
    mixins: [FluxibleMixin],

    getInitialState: function() {
        return this.getStore(MainAppStore).getState();
    },

    onChange: function(){
    },

    render: function(){
        return (
            <div>
                <Nav selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>
                {'home' === this.state.currentPageName ? <Home /> : <About /> }
            </div>
        );
    }
});

module.exports = mainApp;
