var React=require("react/addons");
var E=React.createElement;
var PureRenderMixin=React.addons.PureRenderMixin;
var ksa=require("ksana-simple-api");
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
    ksa.fetch({db:trait.db,uti:trait.uti,q:trait.q,renderTags:renderTags},function(err,segments){
        this.setState({segment:segments[0]})
    }.bind(this));
  } 
  ,componentWillReceiveProps:function(nextProps){
    this.fetchText(nextProps.trait);
  }
  ,componentDidMount:function() {
    this.fetchText(this.props.trait);
  }  
  ,renderContent:function() {
  	return E(TextContent ,{text:this.state.segment.text,hits:this.state.segment.hits});
  }
  ,changeTab:function(uti) {
    var db=this.props.trait.db;
    if (db.indexOf("/")>-1) db=db.substr(db.indexOf("/")+1);
    if (uti) {
      var title=db+":"+uti;
      var newtrait={key:title,title:title,db:db,uti:uti,q:this.props.trait.q};
      action.closeAdd(this.props.trait.key,newtrait);
    }
  }
  ,prevSeg:function() {
    ksa.prevUti({db:this.props.trait.db,uti:this.state.segment.uti},function(err,prev){
        this.changeTab(prev);  
    }.bind(this));
  }
  ,nextSeg:function() {
    ksa.nextUti({db:this.props.trait.db,uti:this.state.segment.uti},function(err,next){
        this.changeTab(next);  
    }.bind(this));
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