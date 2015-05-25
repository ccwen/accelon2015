var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var kde=require("ksana-database");
var TreeToc=require("ksana2015-treetoc").component;
var action=require("../actions/texts");
var styles={
	container:{overflowY:"auto",height:"99%",overflowX:"hidden",color:"white"}
}
var TocContent=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		toc:PT.array.isRequired
		,db:PT.object.isRequired
		,q:PT.string
		,db:PT.string.isRequired
	}
	,opentext:function(tocid,tocitem){
		kde.open(this.props.db,function(err,db){
			var fseg=db.fileSegFromVpos(tocitem.vpos);
			var absseg=db.fileSegToAbsSeg(fseg.file,fseg.seg);
			var seg=fseg.seg, segnames=db.get("segnames");
			var title=db.dbname+":"+segnames[absseg];
			var key=title;
			if (segnames[absseg]==="_") {
				var title=db.dbname+":"+segnames[absseg+1];
				seg++;
			}
			action.add({key:key,title:title,engine:db,db:db.dbname,file:fseg.file,seg:seg,q:this.props.q});
		}.bind(this));
	}
	,render:function() {
		return E("div",{style:styles.container},
			E(TreeToc,{onSelect:this.opentext,data:this.props.toc})
		);
	}
});
module.exports=TocContent;