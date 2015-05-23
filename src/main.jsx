var React=require("react");
var LeftPanel=require("./leftpanel");
var RightPanel=require("./rightpanel");
var E=React.createElement;

var styles={
  container:{
   width:"100%",height:"100%",background:"#333333",
   display:"flex"    
  },
  leftpanel:{
    flex:1
  },
  rightpanel:{
    flex:3
  }
}

var maincomponent = React.createClass({
  render: function() {
    return E("div",{style:styles.container},
      E("div",{style:styles.leftpanel},E(LeftPanel,{})),
      E("div",{style:styles.rightpanel},E(RightPanel,{}))
    );
  }
});
module.exports=maincomponent;