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
    return {hideLeftPanel:false};
  }
  ,onHideLeftPanel:function() {
    this.setState({hideLeftPanel:true});
  }
  ,onShowLeftPanel:function() {
    this.setState({hideLeftPanel:false}); 
  }
  ,renderLeft:function() {
    if (this.state.hideLeftPanel) {
      return E("button",{style:styles.showPanelButton,onClick:this.onShowLeftPanel},
           E("i",{className:"fa fa-chevron-right"}));
    } else {
      return E("div",{style:styles.leftpanel},E(LeftPanel,{onHide:this.onHideLeftPanel}));
    } 
  }
  ,render: function() {
    return E("div",{style:styles.container},
      this.renderLeft(),
      E("div",{style:styles.rightpanel},E(RightPanel,{}))
    );
  }
});
module.exports=maincomponent;
//      E(ImagePanel),
