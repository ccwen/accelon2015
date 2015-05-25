var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var E=React.createElement;
var PT=React.PropTypes;
var DBListItem=require("./dblistitem");
var styles={
	container:{height:"99%",overflowY:"auto",overflowX:"hidden"}
}
var DBListContent=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		databases:PT.array.isRequired
		,action:PT.func.isRequired
		,tofind:PT.string.isRequired
	}	
	,renderItem:function(db,idx){
		return <DBListItem action={this.props.action} key={idx} db={db} tofind={this.props.tofind}/>
	}
	,render:function() {
		return E("div",{style:styles.container},
			this.props.databases.map(this.renderItem)
		);
	}
});
module.exports=DBListContent;