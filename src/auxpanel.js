var React=require("react/addons");
var ReactPanels=require("react-panels");
var E=React.createElement;
var PT=React.PropTypes;

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Button = ReactPanels.Button;
var Content = ReactPanels.Content;
var defaultTabs=[];

//var store_dictionaries=require("./stores/kwic");
var KWICTab=require("./tabs/kwictab");
var action=require("./actions/kwic");
var AuxPanel=React.createClass({
  panelbuttons:function(){
    return <Button title="Remove active tab" onButtonClick={this.closeTab}>
            <i className="fa fa-times"></i>
          </Button>
  }
  ,propTypes:{
    timestamp: PT.string.isRequired
    ,kwic: PT.string.isRequired
  }
  ,closeTab:function(e){
    var selectedIndex = this.refs.panel.getSelectedIndex();
    var tabkey=this.props.kwic[selectedIndex].key;
    action.remove(tabkey);
  }
  ,action:function(type,p1,p2) {

  }
  ,renderKWIC:function(trait,idx) {
    if (React.isValidElement(trait)) {
      return trait;
    } else {
      var component=trait.Component||KWICTab;
      var title=trait.query+" in "+trait.dbname;
      //use timestamp to force repaint
      return E(component,{key:idx,title:title,trait:trait,timestamp:this.props.timestamp});
    }
  }
	,render:function() {
 		return <Panel ref="panel" theme="flexbox" buttons={[this.panelbuttons()]}>
      {this.props.kwic.map(this.renderKWIC)}
    </Panel>
	}
});
module.exports=AuxPanel;