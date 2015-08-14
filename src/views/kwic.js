var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var HoverLink=require("./hoverlink");
var action=require("../actions/texts");

var styles={
	container:{height:"20%",color:"white",overflowY:"auto",overflowX:"hidden"}
}
var KWIC=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		excerpts:PT.array.isRequired
	}
	,opentext:function(e) {
		var n=e.target.parentElement.dataset.n;
		var excerpt=this.props.excerpts[n];
		var db=this.props.db;
		if (db.indexOf("/")>-1) db=db.substr(db.indexOf("/")+1);
		var key=db+":"+excerpt.uti;
		var title=key;
		action.add({db:this.props.db
			,q:this.props.q
			,uti:excerpt.uti
			,title:title
			,key:key
		});
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
	,renderExcerpt:function(item,idx) {
		return E("div",{key:idx}
			,E("span",{"data-n":idx,onClick:this.opentext},E(HoverLink,{},item.uti))
			,this.highlight(item.text,item.hits)
		);
	}
	,render:function() {
		return E("div",{style:styles.container},
			this.props.excerpts.map(this.renderExcerpt)
		);
	}
});
module.exports=KWIC;