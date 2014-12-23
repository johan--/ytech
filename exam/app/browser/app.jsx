var React = require('react');
var Index = require('./../../views/index.jsx');

window.onload = function () {
	var $ = require('./../../lib/vendor/custom.jquery');
    var data = JSON.parse(document.getElementById("initial-data").innerHTML);

    var dispatcher = $({});

    React.render(
    	<Index
    		data={data}
    		dispatcher={dispatcher}
    		ajax={$.ajax}
    		history={History}
    		window={window} />,
    	document
    );
}
