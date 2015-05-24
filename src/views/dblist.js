var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var E=React.createElement;
var styles={
	dbitem:{display:"flex",fontSize:"150%",borderBottom:"solid 1px black"}
	,name:{flex:3}
	,hits:{flex:1}
}

var DBListContent=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		databases:React.PropTypes.array.isRequired
	}	
	,renderDB:function(db,idx) {
		return <div key={idx} style={styles.dbitem}><span style={styles.name}>{db.shortname}</span>
		<span style={styles.hits}>{db.hits||""}</span></div>
	}
	,render:function() {
		return E("div",{},
			this.props.databases.map(this.renderDB)
		);
	}
});
module.exports=DBListContent;