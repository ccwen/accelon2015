var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Button = ReactPanels.Button;
var Content = ReactPanels.Content;

var AuxPanel=React.createClass({
	mixins:[PureRenderMixin]
	,hidePanel:function() {
		this.props.onHide();
	}
  ,panelbuttons:function(){
    return <Button title="Remove active tab" onButtonClick={this.closeTab}>
            <i className="fa fa-times"></i>
          </Button>
  }

  ,action:function(type,p1,p2) {
  	if (type=="opentoc"){
  		this.refs.panel.setSelectedIndex(1);
  	}
  }
	,render:function() {
 		return <Panel ref="panel" theme="flexbox2" buttons={[this.panelbuttons()]}>
    </Panel>
	}
});
module.exports=AuxPanel;