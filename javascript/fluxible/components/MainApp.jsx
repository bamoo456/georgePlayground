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

    // when MainAppStore call "this.emitChange()",
    // "onStoreChange()" of mainApp will be called
    statics: {
        storeListeners: {
            'onStoreChange': [MainAppStore]
        }
    },
    getInitialState: function() {
        return this.getStore(MainAppStore).getState();
    },

    // handler for handling the change of MainAppStore
    onStoreChange: function(){
        var state = this.getStore(MainAppStore).getState();
        this.setState(state);
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
