var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;

var TextContent=React.createClass({
	render:function() {
		return E("div",{},this.props.text);
	}
});
module.exports=TextContent;