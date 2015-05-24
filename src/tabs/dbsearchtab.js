var React=require("react/addons");
var E=React.createElement;
var PT=React.PropTypes;
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");

var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;

var store=require("../stores/databases");
var action=require("../actions/databases");

var DBList=require("../views/dblist");
var DBSearchInput=require("../views/dbsearchinput");

var DBListTab=React.createClass({
	mixins: [Reflux.listenTo(store,"onData"),TabWrapperMixin,PureRenderMixin]
	,getInitialState:function() {
		return {databases:[]};
	}
	,propTypes:{
		action:PT.func.isRequired
	}
	,componentDidMount:function() {
		setTimeout(function(){
			action.list("cbeta2015");
		}.bind(this),500);
	}
	,onData:function(data) {
		this.setState({databases:data});
	}	
	,render:function() {
		return <Tab title="One">
        <Content>
        	<DBSearchInput />
        	<DBList action={this.props.action} databases={this.state.databases}/>

        </Content>
      </Tab>
	}
});

module.exports=DBListTab;