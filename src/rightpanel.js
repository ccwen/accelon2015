var React=require("react");
var Reflux=require("reflux");
var TextPanel=require("./textpanel");
var AuxPanel=require("./auxpanel");
var E=React.createElement;
var PT=React.PropTypes;

var styles={
  container:{
   width:"100%",height:"100%"
   ,background:"#333333"
   ,display:"flex"
   ,flexDirection: "column"
   ,overflow:"hidden"  
  },
  textpanel:{
    flex:3
  },
  auxpanel:{
    flex:1
  }
};
var store_kwic=require("./stores/kwic");

var RightPanel=React.createClass({
	mixins:[Reflux.listenTo(store_kwic,"onKWICData")]
  ,getInitialState:function() {
    return {kwic:[]};
  }

  ,onKWICData:function(data) {
    this.setState({kwic:data});
  }
	,renderAuxPanel:function() {
		if (this.props.bottomPanelShown) {
			return E("div",{style:styles.auxpanel}, E(AuxPanel,{kwic:this.state.kwic}));
		}
	}
  ,render: function() {
    return E("div",{style:styles.container},
       E("div",{style:styles.textpanel}, 
       		E(TextPanel,{action:this.props.action,
       			bottomPanelShown:this.props.bottomPanelShown,leftPanelShown:this.props.leftPanelShown}))
       ,this.renderAuxPanel()
    );
  }
});
module.exports=RightPanel;
