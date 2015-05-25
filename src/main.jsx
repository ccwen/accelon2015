var React=require("react");
var LeftPanel=require("./leftpanel");
var RightPanel=require("./rightpanel");
var E=React.createElement;
//var ImagePanel=require("./imagepanel");
var styles={
  container:{
   width:"100%",height:"100%",background:"#333333",
   display:"flex",
   overflow:"hidden"  
  },
  leftpanel:{
    flex:1
  },
  rightpanel:{
    flex:3
  },
  showPanelButton:{
    position:"absolute",
    left:"0px",
    top:"0px",
    fontSize:"150%",
    zIndex:99999,
  }
}

var maincomponent = React.createClass({
  getInitialState:function() {
    return {hideLeftPanel:false,hideBottomPanel:false};
  }
  ,action:function(act,p1,p2) {
    if(act==="hideLeftPanel") {
      this.setState({hideLeftPanel:true});
    } else if (act==="showLeftPanel") {
      this.setState({hideLeftPanel:false});
    } else if (act==="hideBottomPanel") {
      this.setState({hideBottomPanel:true});
    } else if (act==="showBottomPanel") {
      this.setState({hideBottomPanel:false});
    }
  }
  ,renderLeft:function() {
    if (!this.state.hideLeftPanel) {
      return E("div",{style:styles.leftpanel},E(LeftPanel,{action:this.action}));
    } 
  }
  ,render: function() {
    return E("div",{style:styles.container},
      this.renderLeft(),
      E("div",{style:styles.rightpanel}, E(RightPanel,{action:this.action,
        bottomPanelShown:!this.state.hideBottomPanel,
        leftPanelShown:!this.state.hideLeftPanel})
      )
    );
  }
});
module.exports=maincomponent;
//      E(ImagePanel),
