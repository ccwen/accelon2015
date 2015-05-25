var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var styles={
	container:{overflowY:"auto",height:"20%",overflowX:"hidden",color:"white"}
}
var KWIC=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		trait:PT.object.isRequired
	}
	,renderExcerpt:function(item,idx) {
		return E("div",{key:idx,dangerouslySetInnerHTML:{__html:item.text}});
	}
	,render:function() {
		return E("div",{style:styles.container},
			this.props.trait.excerpt.map(this.renderExcerpt)
		);
	}
});
module.exports=KWIC;