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

var TextContent=require("../views/textcontent");
var TextToolbar=require("./texttoolbar");
var TextFooter=require("./textfooter");

var TextTab = React.createClass({
  displayName: 'TextTab'
  ,getInitialState:function() {
  	return {}
  }
  ,mixins: [TabWrapperMixin,PureRenderMixin]
  ,action:function(){

  }
  ,renderContent:function() {
  	return <TextContent text={this.props.text}/>
  }
  ,render:function() {
 		return <Tab ref="tab" icon={this.props.icon} title={this.props.title} 
    showToolbar={this.props.showToolbar}
    showFooter={this.props.showFooter} >
        <Toolbar>
          <TextToolbar action={this.action}/>
        </Toolbar>
        <Content>
          {this.renderContent()}
        </Content>
        <Footer>
          <TextFooter action={this.action}/>
        </Footer>
    </Tab>
  }
});

module.exports=TextTab;