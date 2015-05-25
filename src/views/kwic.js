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
		trait:PT.object.isRequired
	}
	,opentext:function(e) {
		var n=e.target.parentElement.dataset.n;
		var excerpt=this.props.trait.excerpt[n];
		var key=this.props.trait.dbname+":"+excerpt.segname;
		var title=key;
		action.add({db:this.props.trait.dbname
			,q:this.props.trait.query
			,file:excerpt.file,seg:excerpt.seg
			,title:title
			,key:key
			,engine:this.props.trait.engine
		});
	}
	,renderExcerpt:function(item,idx) {
		return E("div",{key:idx},
			E("span",{"data-n":idx,onClick:this.opentext},E(HoverLink,{},item.segname))
			,E("span",{dangerouslySetInnerHTML:{__html:item.text}})
		);
	}
	,render:function() {
		return E("div",{style:styles.container},
			this.props.trait.excerpt.map(this.renderExcerpt)
		);
	}
});
module.exports=KWIC;