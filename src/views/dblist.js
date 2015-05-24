var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var E=React.createElement;
var PT=React.PropTypes;
var DBListItem=require("./dblistitem");

var DBListContent=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		databases:PT.array.isRequired
		,action:PT.func.isRequired
	}	
	,renderItem:function(db,idx){
		return <DBListItem action={this.props.action} key={idx} db={db}/>
	}
	,render:function() {
		return E("div",{},
			this.props.databases.map(this.renderItem)
		);
	}
});
module.exports=DBListContent;