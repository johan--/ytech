var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            type: this.props.uri.type,
            city: this.props.uri.city
        };
    },

    changeType: function (newType) {
        var uri = '/' + this.state.city + '/' + newType;

        this.props.history.pushState(null, null, uri);
        this.setState({type: newType});
    },

    stateChangeHandler: function () {
        var res = this.props.history.getState().hash.split('/').slice(1);

        if (res[0] !== this.state.city) {
            this.setState({city: res[0]});
        }

        if (res[1] !== this.state.type) {
            this.setState({type: res[1]});
        }
    },

    componentDidMount: function () {
        var history = this.props.history;

        history.pushState(null, null, this.props.uri.initial);

        history.Adapter.bind(this.props.window, 'statechange', this.stateChangeHandler);
    },

    render: function () {
        var content = React.createFactory(this.props.content);

        return content({
            routerChangeType: this.changeType,
            dispatcher: this.props.dispatcher,
            tabs: this.props.tabs,
            activeTab: this.state.type,
            currentUri: '/' + this.state.city
        });
    }
});
