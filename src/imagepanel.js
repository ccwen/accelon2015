/**
http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3
*/
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var ReactPanels=require("react-panels");
var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Content = ReactPanels.Content;
var FloatingPanel = ReactPanels.FloatingPanel;

var ImagePanel=React.createClass({
	render:function() {
		return <FloatingPanel theme="flexbox" width={1300} top={500} left={10} ref="panel" >
		<Tab title="aaa"><Content><img src="001-001b.jpg"/></Content></Tab>
		<Tab title="aaa"><Content>xxx</Content></Tab>
		</FloatingPanel>
	}
});
module.exports=ImagePanel;