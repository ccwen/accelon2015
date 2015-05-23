var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var Reflux=require("reflux");
var update=React.addons.update;

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Content = ReactPanels.Content;
var Button = ReactPanels.Button;

var store=require("./stores/texts");
var Welcome=require("./views/welcome");
var defaultTabs=[<Welcome/>];
var TextTab=require("./tabs/texttab");

var action=require("./actions/texts");

var RightPanel=React.createClass({
	mixins:[PureRenderMixin,Reflux.listenTo(store,"onData")]
	,getInitialState:function() {
		return {tabs:defaultTabs}
	}
	,panelbuttons:function(){
		return <Button title="Remove active tab" onButtonClick={this.closeTab}>
            <i className="fa fa-times"></i>
          </Button>
  }
  ,closeTab:function(e){
    var selectedIndex = this.refs.panel.getSelectedIndex();
    var tabkey=this.state.tabs[selectedIndex].key;
    action.remove(tabkey);
  }
  ,onData:function(data,newly){
  	if (!Object.keys(data).length) {
  		this.setState({tabs:defaultTabs})
  	} else {
  		var tabs=[];
  		for (var i in data) {
  			tabs.push(update(data[i],{$merge:{key:i}}));
  		}
  		this.setState({tabs:tabs});
  	}
  }
  ,renderTab:function(tab) {
  	if (React.isValidElement(tab)) {
  		return tab;
  	} else {
			return E(TextTab,{title:tab.title,text:tab.text});
  	}
  },
	render:function() {
 		return <Panel ref="panel" theme="flexbox2" buttons={[this.panelbuttons()]} >
	 		{this.state.tabs.map(this.renderTab)}
    </Panel>
	}
});
module.exports=RightPanel;