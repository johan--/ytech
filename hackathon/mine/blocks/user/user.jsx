var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
		  <div className="user">
	       	<img src="userpic.jpg" width="42" height="42" className="user__avatar" />
	      	<a href="#" className="user__name">
	      		<span className="user__red">S</span>arah Connor
	      	</a>
	      </div>
		);
	}
});