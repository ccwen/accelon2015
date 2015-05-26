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
var store=require("../stores/toc");

var TocContent=require("../views/toccontent");

var TocTab=React.createClass({
	mixins: [Reflux.listenTo(store,"onData"),TabWrapperMixin,PureRenderMixin]
	,getInitialState:function() {
		return {toc:[]};
	}
	,propTypes:{
		q:PT.string
	}
	,onData:function(data,dbid,tocname,q,hits) {
		this.setState({toc:data,dbid:dbid,tocname:tocname,q:q,hits:hits});
	}	
	,render:function() {
		return <Tab title="One">
        <Content><TocContent dbid={this.state.dbid} 
        	q={this.state.q} toc={this.state.toc} hits={this.state.hits} /></Content>
      </Tab>
	}
});

module.exports=TocTab;