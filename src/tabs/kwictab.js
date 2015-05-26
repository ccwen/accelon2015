var React=require("react/addons");
var E=React.createElement;
var PT=React.PropTypes;
var PureRenderMixin=React.addons.PureRenderMixin;

var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;

var KWIC=require("../views/kwic");

var KWICTab = React.createClass({
  displayName: 'KWICTab'
  ,getInitialState:function() {
  	return {}
  }
  ,mixins: [TabWrapperMixin,PureRenderMixin]
  ,action:function(){

  }
  ,renderContent:function() {
  	return <KWIC trait={this.props.trait} timestamp={this.props.timestamp}/>
  }
  ,render:function() {
 		return <Tab ref="tab" icon={this.props.icon} title={this.props.title} 
    showToolbar={this.props.showToolbar}
    showFooter={this.props.showFooter} >
        <Content>
          {this.renderContent()}
        </Content>
        <Footer>
        </Footer>
    </Tab>
  }
});

module.exports=KWICTab;