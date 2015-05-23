var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var Reflux=require("reflux");

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
	mixins:[Reflux.listenTo(store,"onData")]
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
  	if (!data.length) {
  		this.setState({tabs:defaultTabs})
  	} else {
  		this.setState({tabs:data});
  	}
  }
  ,renderTab:function(tab,idx) {
  	if (React.isValidElement(tab)) {
  		return tab;
  	} else {
			return E(TextTab,{key:idx,title:tab.title,text:tab.text});
  	}
  },
	render:function() {
 		return <Panel ref="panel" theme="flexbox2" buttons={[this.panelbuttons()]} >
	 		{this.state.tabs.map(this.renderTab)}
    </Panel>
	}
});
module.exports=RightPanel;