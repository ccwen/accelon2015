var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var TreeToc=require("ksana2015-treetoc").component;
var styles={
	container:{overflowY:"auto",height:"99%",overflowX:"hidden"}
}
var TocContent=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		toc:PT.array.isRequired
	}
	,render:function() {
		return E("div",{style:styles.container},
			E(TreeToc,{data:this.props.toc})
		);
	}
});
module.exports=TocContent;