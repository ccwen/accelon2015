var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var action=require("../actions/databases");

var styles={
	tofind: {fontSize:"200%",borderRadius:"10px",outline:0,border: "solid 1px #dcdcdc"}
}
var TextContent=React.createClass({
	mixins:[PureRenderMixin]
	,getInitialState:function(){
		return {tofind:'大千'}
	}
	,propTypes:{
		onTofindChange:PT.func
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
		if (this.props.onTofindChange) this.props.onTofindChange(this.state.tofind);
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
			E("input",{ref:"tofind",style:styles.tofind,size:5,
				onKeyPress:this.onKeyPress,onChange:this.onChange,value:this.state.tofind})
		);
	}
});
module.exports=TextContent;