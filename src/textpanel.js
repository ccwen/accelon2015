var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var PT=React.PropTypes;
var Reflux=require("reflux");

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Content = ReactPanels.Content;
var Button = ReactPanels.Button;

var store=require("./stores/texts");
var Welcome=require("./views/welcome");
var defaultTabs=[<Welcome key="welcome"/>];
var TextTab=require("./tabs/texttab");

var action=require("./actions/texts");

var TextPanel=React.createClass({
	mixins:[Reflux.listenTo(store,"onData")]
	,getInitialState:function() {
		return {traits:defaultTabs}
	}
  ,propTypes:{
    action:PT.func.isRequired
  }
  ,hideLeftPanel:function() {
    this.props.action("hideLeftPanel");
  }
  ,hideBottomPanel:function() {
    this.props.action("hideBottomPanel");
  }  
  ,showLeftPanel:function() {
    this.props.action("showLeftPanel");
  }
  ,showBottomPanel:function() {
    this.props.action("showBottomPanel");
  }  
	,panelbuttons:function(){
		return <Button title="Remove active tab" onButtonClick={this.closeTab}>
            <i className="fa fa-times"></i>
          </Button>
  }
  ,leftbuttons:function(){
    var prop1=this.props.leftPanelShown?{onButtonClick:this.hideLeftPanel}:{onButtonClick:this.showLeftPanel};
   // var prop2=this.props.bottomPanelShown?{onButtonClick:this.hideBottomPanel}:{onButtonClick:this.showBottomPanel};
    var cls1=this.props.leftPanelShown?"fa fa-chevron-left":"fa fa-chevron-right";
   // var cls2=this.props.bottomPanelShown?"fa fa-chevron-up":"fa fa-chevron-down";

    return [// E(Button,prop2,E("i",{className:cls2})),
            E(Button,prop1,E("i",{className:cls1}))
    ];
  }  
  ,closeTab:function(e){
    var selectedIndex = this.refs.panel.getSelectedIndex();
    var tabkey=this.state.traits[selectedIndex].key;
    action.remove(tabkey);
  }
  ,onData:function(data,newly){
  	if (!data.length) {
  		this.setState({traits:defaultTabs})
  	} else {
  		this.setState({traits:data});
  	}
  }
  ,renderTab:function(trait,idx) {
  	if (React.isValidElement(trait)) {
  		return trait;
  	} else {
  		var component=trait.Component||TextTab;
			return E(component,{key:idx,title:trait.title,trait:trait});
  	}
  },
	render:function() {
 		return <Panel ref="panel" theme="flexbox" buttons={[this.panelbuttons()]}
      leftButtons={this.leftbuttons()} >
	 		{this.state.traits.map(this.renderTab)}
    </Panel>
	}
});
module.exports=TextPanel;