var React = require('react');
var Search = require('./../search/search.jsx');
var User = require('./../user/user.jsx');

module.exports = React.createClass({
	render: function() {
	    return (
		    <header>
		      <div className="header__top">
		        <div className="header__logo"><img src="logo.png" width="82" height="33" /></div>
		        <div className="header__search">
		          <Search />
		        </div>
		        <div className="header__user">
		          <User />
		        </div>
		      </div>
		    </header>
		);
	}
});