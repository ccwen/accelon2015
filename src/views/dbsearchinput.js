var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;

var action=require("../actions/databases");
var TextContent=React.createClass({
	mixins:[PureRenderMixin]
	,getInitialState:function(){
		return {tofind:'菩提'}
	}
	,onKeyPress:function(e) {
		if (e.key=="Enter") {
			this.dosearch();
		}
	}
	,componentDidMount:function() {
		setTimeout(function(){
			this.refs.tofind.getDOMNode().focus();	
		}.bind(this),500);
	}
	,dosearch:function() {
		action.search(this.state.tofind);
	}
	,onChange:function(e) {
		this.setState({tofind:e.target.value});
		clearTimeout(this.timer);
		this.timer=setTimeout(function(){
			this.dosearch();
		}.bind(this),500);
	}
	,render:function() {
		return E("div",{},
			E("input",{ref:"tofind",onKeyPress:this.onKeyPress,onChange:this.onChange,value:this.state.tofind})
		);
	}
});
module.exports=TextContent;