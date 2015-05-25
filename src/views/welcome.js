var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var styles={
	container:{height:"100%",color:"white"}
}
var Welcome=React.createClass({
	render:function() {
		return E("div",{style:styles.container},"WELCOME");
	}
});
module.exports=Welcome;