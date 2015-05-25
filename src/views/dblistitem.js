var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var action_kwic=require("../actions/kwic");
var action_toc=require("../actions/toc");
var E=React.createElement;
var PT=React.PropTypes;
var HoverLink=require("./hoverlink");

var styles={
	dbitem:{color:"white",display:"flex",fontSize:"150%",borderBottom:"solid 1px black"}
	,name:{flex:3}
	,hits:{flex:2}
}

var DBListItem=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		action:PT.func.isRequired
		,tofind:PT.string.isRequired
	}
	,showKWIC:function(e){
		this.props.action("openkwic");
		action_kwic.open(this.props.db.fullname,this.props.tofind,{range:{start:0}});
	}
	,showTOC:function(e) {
		this.props.action("opentoc");
		action_toc.open(this.props.db.fullname,"mulu",this.props.tofind);
	}
	,render:function() {
		var db=this.props.db;
		return <div style={styles.dbitem} >
			<span onClick={this.showTOC} style={styles.name}><HoverLink>{db.shortname}</HoverLink></span>
			<span onClick={this.showKWIC} style={styles.hits}><HoverLink>{db.hits}</HoverLink></span>
			</div>
	}
});

module.exports=DBListItem;