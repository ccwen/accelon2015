var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;


var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Content = ReactPanels.Content;

var LeftPanel=React.createClass({
	mixins:[PureRenderMixin],
	render:function() {
 		return <Panel theme="flexbox2">
      <Tab title="One">
        <Content>Content of One</Content>
      </Tab>
      <Tab title="Two">
        <Content>Content of Two</Content>
      </Tab>
    </Panel>
	}
});
module.exports=LeftPanel;