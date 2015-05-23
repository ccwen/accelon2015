var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var Welcome=React.createClass({
	render:function() {
		return E("div",{},"WELCOME");
	}
});
module.exports=Welcome;