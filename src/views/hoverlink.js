/**
	enclose a text to enable hover effect
	usage:
		<span onclick={} style={}><HoverLink>text</HoverLink</span>
*/
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var PT=React.PropTypes;

var styles={
	enter:{
		background:'highlight'
		,color:'highlightText'
		,borderRadius:'5px'
		,cursor:'pointer'
	}
	,leave:{
		background:null
		,color:null
		,cursor:''
	} 
}
var HoverLink=React.createClass({
	mixins:[PureRenderMixin]
	,onleave:function(e) {
		for (var i in styles.leave) e.target.style[i]=styles.leave[i];
	}
	,onenter:function(e) {
		for (var i in styles.enter) e.target.style[i]=styles.enter[i];
	}
	,render:function() {
		return E("span",{onMouseLeave:this.onleave,onMouseEnter:this.onenter},this.props.children);
	}
});
module.exports=HoverLink;