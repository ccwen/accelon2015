var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var action_kwic=require("../actions/kwic");
var action_toc=require("../actions/toc");
var E=React.createElement;
var PT=React.PropTypes;
var styles={
	dbitem:{display:"flex",fontSize:"150%",borderBottom:"solid 1px black"}
	,name:{flex:3}
	,hits:{flex:1}
}

var DBListItem=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		action:PT.func.isRequired
	}
	,showKWIC:function(e){
		console.log(e)
	}
	,showTOC:function(e) {
		this.props.action("opentoc");
		action_toc.open(this.props.db.fullname,"mulu");
	}
	,onMouseEnter:function(e) {
		if (!e.target.innerHTML) return;
		e.target.style.borderRadius="10px";
		e.target.style.background="yellow";
		e.target.style.cursor="pointer";
	}
	,onMouseLeave:function(e) {
		e.target.style.background="none";
		e.target.style.cursor="default";
	}
	,render:function() {
		var db=this.props.db;
		return <div style={styles.dbitem} >
			<span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
			      onClick={this.showTOC} style={styles.name}>{db.shortname}</span>
			<span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
			      onClick={this.showKWIC} style={styles.hits}>{db.hits||""}</span></div>
	}
});

module.exports=DBListItem;