var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Content = ReactPanels.Content;


var RightPanel=React.createClass({
	mixins:[PureRenderMixin],
	render:function() {
 		return <Panel theme="flexbox2">
      <Tab title="One" icon="fa fa-plane">
        <Content>Content of One</Content>
      </Tab>
      <Tab title="Two" icon="fa fa-fire">
        <Content>Content of Two</Content>
      </Tab>
    </Panel>
	}
});
module.exports=RightPanel;