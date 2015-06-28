var React=require("react/addons");
var E=React.createElement;
var PureRenderMixin=React.addons.PureRenderMixin;
var kde=require("ksana-database");
var kse=require("ksana-search");
var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;

var TextContent=require("../views/textcontent");
var TextToolbar=require("./texttoolbar");
var TextFooter=require("./textfooter");
var action=require("../actions/texts");
var renderTags=["h1","h2","h3","h4","h5","h6","h7","h8","h9"];
var TextTab = React.createClass({
  displayName: 'TextTab'
  ,getInitialState:function() {
  	return {segment:{}};
  }
  ,mixins: [TabWrapperMixin,PureRenderMixin]
  ,fetchText:function(trait) {
    kse.highlightSeg(trait.engine,trait.file,trait.seg,{q:trait.q,renderTags:renderTags,nospan:true},
      function(segment){
        this.setState({segment:segment})
    }.bind(this));
  } 
  ,componentWillReceiveProps:function(nextProps){
    this.fetchText(nextProps.trait);
  }
  ,componentDidMount:function() {
    this.fetchText(this.props.trait);
  }  
  ,renderContent:function() {
  	return E(TextContent ,{text:this.state.segment.text});
  }
  ,changeTab:function(segid) {
    var dbid=this.props.trait.dbid;    
    if (segid) {
      var title=dbid+":"+segid;
      var fseg=this.props.trait.engine.findSeg(segid,1)[0];
      var newtrait={key:title,title:title,dbid:dbid,
        file:fseg.file,seg:fseg.seg,q:this.props.q,engine:this.props.trait.engine};

      action.closeAdd(this.props.trait.key,newtrait);
    }
  }
  ,prevSeg:function() {
    this.changeTab(this.props.trait.engine.prevSeg(this.state.segment.segname));
  }
  ,nextSeg:function() {
    this.changeTab(this.props.trait.engine.nextSeg(this.state.segment.segname));
  }
  ,action:function(act,p1,p2) {
    if (act==="next") this.nextSeg();
    else if (act==="prev") this.prevSeg();
  }
  ,render:function() {
 		return <Tab ref="tab" icon={this.props.icon} title={this.props.title} 
    showToolbar={this.props.showToolbar}
    showFooter={this.props.showFooter} >
        <Toolbar>
          <TextToolbar action={this.action}/>
        </Toolbar>
        <Content>
          {this.renderContent()}
        </Content>
    </Tab>
  }
});

module.exports=TextTab;