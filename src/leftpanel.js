var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var PT=React.PropTypes;

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Button = ReactPanels.Button;
var Content = ReactPanels.Content;

var TocTab=require("./tabs/toctab");
var DBSearchTab=require("./tabs/dbsearchtab");

var LeftPanel=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		action: PT.func.isRequired
	}
  ,action:function(type,p1,p2) {
  	if (type==="opentoc"){
  		this.refs.panel.setSelectedIndex(1);
  		return;
  	}
  	this.props.action.apply(this,arguments);
  }
	,render:function() {
 		return <Panel ref="panel" theme="flexbox">
 			<DBSearchTab action={this.action}  title="DB"/>
      <TocTab action={this.action} title="Toc"/>
    </Panel>
	}
});
module.exports=LeftPanel;