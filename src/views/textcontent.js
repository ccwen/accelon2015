var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var PT=React.PropTypes;
var E=React.createElement;
var styles={
  container:{height:"65%",overflowY:"auto",overflowX:"hidden",color:"white",fontSize:"150%"}
}
var TextContent=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		text:PT.string.isRequired
		,hits:PT.array
	}
	,getDefaultProps:function() {
		return {hits:[],text:""};
	}
  ,highlight:function(text,hits){
    var ex=0,out=[];
    for (var i=0;i<hits.length;i++) {
      var now=hits[i][0];
      if (now>ex) {
        out.push(<span key={ex}>{text.substring(ex,now)}</span>);
      }
      out.push(<span key={"h"+ex} className={"hl"+hits[i][2]}>
        {text.substr(now,hits[i][1])}</span>);
      ex=now+=hits[i][1];
    }
    out.push(<span key={ex}>{text.substr(ex)}</span>);
    return out;
  } 
	,render:function() {
		return E("div",{style:styles.container}, this.highlight(this.props.text,this.props.hits));
	}
});
module.exports=TextContent;