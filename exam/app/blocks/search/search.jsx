var React = require('react');
var CityList = require('./../city-list/city-list.jsx');

React.initializeTouchEvents(true);

module.exports = React.createClass({
	getInitialState: function () {
		return {
			value: ''
		};
	},

	hasValue: function () {
		return !!this.state.value;
	},

	getTop: function (elem) {
	    var box = elem.getBoundingClientRect();
	    
	    var body = document.body;
	    var docEl = document.documentElement;

	    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	    var clientTop = docEl.clientTop || body.clientTop || 0;
	    var top  = box.bottom + scrollTop - clientTop;
	    
	    return Math.round(top);
	},

	openPopup: function (el) {
		this.props.dispatcher.triggerHandler({
			type: 'popup.open',
			content: CityList,
			top: this.getTop(el)
		});
	},

	closePopup: function () {
		this.props.dispatcher.triggerHandler({
			type: 'popup.close'
		});
	},

	focusHandler: function (e) {
		if (!this.hasValue()) return;

		this.openPopup(e.target);
	},

	changeHandler: function (e) {
		var value = e.target.value;

		this.setState({value: value});
		value ? this.openPopup(e.target) : this.closePopup();
	},

	touchHandler: function (e) {
		e.stopPropagation();
	},

	cancelTouchHandler: function (e) {
		this.setState({value: ''});
		this.closePopup();
	},

	render: function () {
		var inputClasses = ['search__input'];
		var cancelButtonClasses = ['search__cancel'];

		if (this.hasValue()) {
			inputClasses.push('search__input_has-value');
			cancelButtonClasses.push('search__cancel_active');
		};

		return (
			<div className="search">
				<form onTouchStart={this.touchHandler} action="/">
					<div className="search__left">
						<div
							className={cancelButtonClasses.join(' ')}
							onTouchStart={this.cancelTouchHandler} ></div>
						<input
							autoComplete="off"
							className={inputClasses.join(' ')}
							name="cityName"
							type="text"
							placeholder="Город"
							value={this.state.value}
							onFocus={this.focusHandler}
							onChange={this.changeHandler} />
					</div>
					<div className="search__right">
						<button className="search__button">Найти</button>
					</div>
				</form>
			</div>
		);
	}
});
