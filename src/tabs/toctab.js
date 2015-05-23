var React=require("react/addons");
var E=React.createElement;
var PureRenderMixin=React.addons.PureRenderMixin;

var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;

var TocContent=require("../views/toccontent");

var TocTab=React.createClass({
	mixins: [TabWrapperMixin,PureRenderMixin]
	,render:function() {
		return <Tab title="One">
        <Content><TocContent/></Content>
      </Tab>
	}
});

module.exports=TocTab;