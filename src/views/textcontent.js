var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");

var E=React.createElement;
var styles={
  container:{height:"65%",overflowY:"auto",overflowX:"hidden",color:"white",fontSize:"150%"}
}
var TextContent=React.createClass({
	mixins:[PureRenderMixin]

	,render:function() {
		return E("div",{style:styles.container},
						E("span",{dangerouslySetInnerHTML:{__html:this.props.text||""}})
					);
	}
});
module.exports=TextContent;