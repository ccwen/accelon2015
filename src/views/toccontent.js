var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var kde=require("ksana-database");
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
		kde.open(this.props.dbid,function(err,db){
			var fseg=db.fileSegFromVpos(tocitem.vpos);
			fseg.seg--;
			var absseg=db.fileSegToAbsSeg(fseg.file,fseg.seg);
			var seg=fseg.seg, segnames=db.get("segnames");
			var title=db.dbname+":"+segnames[absseg];
			var key=title;
			if (segnames[absseg]==="_") {
				var title=db.dbname+":"+segnames[absseg];
				seg++;
			}
			action.add({key:key,title:title,engine:db,dbid:db.dbname,
				file:fseg.file,seg:seg,q:this.props.q});
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