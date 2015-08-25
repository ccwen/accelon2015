var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var ksa=require("ksana-simple-api");
var TreeToc=require("ksana2015-treetoc").Component;
var action=require("../actions/texts");
var action_kwic=require("../actions/kwic");
var styles={
	container:{overflowY:"auto",height:"99%",overflowX:"hidden",color:"white"}
}
var TocContent=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		toc:PT.array.isRequired
		,hits:PT.array
		,q:PT.string
		,dbid:PT.string
	}
	,openkwic:function(tocid,tocitem){
		action_kwic.open(this.props.dbid,this.props.q,{range:{start:tocitem.vpos,end:tocitem.end}});
	}
	,opentext:function(tocid,tocitem){
		ksa.vpos2txtid(this.props.dbid,tocitem.vpos,function(err,uti){
			var slash=this.props.dbid.lastIndexOf("/");
			var title=this.props.dbid;
			if (slash>0) title=title.substr(slash+1);
			title+=':'+uti;
			action.add({key:title,title:title,db:this.props.dbid,uti:uti,q:this.props.q});
		}.bind(this));
	}
	,render:function() {
		return E("div",{style:styles.container},
			E(TreeToc,{onSelect:this.opentext,onHitClick:this.openkwic,
				toc:this.props.toc,hits:this.props.hits})
		);
	}
});
module.exports=TocContent;