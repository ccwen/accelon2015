var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var kde=require("ksana-database");
var kse=require("ksana-search");

var E=React.createElement;
var styles={
  container:{height:"65%",overflowY:"auto",overflowX:"hidden",color:"white",fontSize:"150%"}
}
var TextContent=React.createClass({
	mixins:[PureRenderMixin]
	,getInitialState:function() {
		return {segment:{}};
	}
	,fetchText:function(trait) {
		kse.highlightSeg(trait.engine,trait.file,trait.seg,{q:trait.q,nospan:true},function(segment){
			this.setState({segment:segment})
		}.bind(this));
	}
	,componentWillReceiveProps:function(nextProps){
		this.fetchText(nextProps.trait);
	}
	,componentDidMount:function() {
		this.fetchText(this.props.trait);
	}
	,render:function() {
		return E("div",{style:styles.container},
						E("span",{dangerouslySetInnerHTML:{__html:this.state.segment.text||""}})
					);
	}
});
module.exports=TextContent;