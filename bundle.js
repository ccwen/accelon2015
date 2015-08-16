(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\ksana2015\\accelon2015\\index.js":[function(require,module,exports){
var React=require("react");
require("ksana2015-webruntime/livereload")();
require("ksana2015-webruntime/ksanagap").boot("accelon2015",function(){
	var Main=React.createElement(require("./src/main.jsx"));
	ksana.mainComponent=React.render(Main,document.getElementById("main"));	
});

},{"./src/main.jsx":"C:\\ksana2015\\accelon2015\\src\\main.jsx","ksana2015-webruntime/ksanagap":"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\ksanagap.js","ksana2015-webruntime/livereload":"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\livereload.js","react":"react"}],"C:\\ksana2015\\accelon2015\\src\\actions\\databases.js":[function(require,module,exports){
module.exports=require("reflux").createActions(["list","search"]);
},{"reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\actions\\kwic.js":[function(require,module,exports){
/** 
Action of Keywords in context
*/
module.exports=require("reflux").createActions(["open","remove"]);
},{"reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\actions\\texts.js":[function(require,module,exports){
module.exports=require("reflux").createActions(["add","remove","closeAdd"]);
},{"reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\actions\\toc.js":[function(require,module,exports){
module.exports=require("reflux").createActions(["open","search"]);
},{"reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\auxpanel.js":[function(require,module,exports){
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
var AuxPanel=React.createClass({displayName: "AuxPanel",
  panelbuttons:function(){
    return React.createElement(Button, {title: "Remove active tab", onButtonClick: this.closeTab}, 
            React.createElement("i", {className: "fa fa-times"})
          )
  }
  ,propTypes:{
    kwic: PT.array.isRequired
  }
  ,closeTab:function(e){
    var selectedIndex = this.refs.panel.getSelectedIndex();
    var tabkey=this.props.kwic[selectedIndex].key;
    action.remove(tabkey);
  }
  ,action:function(type,p1,p2) {

  }
  ,renderKWIC:function(item,idx) {
    if (React.isValidElement(item)) {
      return item;
    } else {
      var component=item.Component||KWICTab;
      var title=item.q+" in "+item.db;
      return E(component,{key:idx,title:title, excerpts:item.excerpts,db:item.db,q:item.q});
    }
  }
	,render:function() {
 		return React.createElement(Panel, {ref: "panel", theme: "flexbox", buttons: [this.panelbuttons()]}, 
      this.props.kwic.map(this.renderKWIC)
    )
	}
});
module.exports=AuxPanel;
},{"./actions/kwic":"C:\\ksana2015\\accelon2015\\src\\actions\\kwic.js","./tabs/kwictab":"C:\\ksana2015\\accelon2015\\src\\tabs\\kwictab.js","react-panels":"C:\\ksana2015\\node_modules\\react-panels\\index.js","react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\leftpanel.js":[function(require,module,exports){
var React=require("react/addons");
var ReactPanels=require("react-panels");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var PT=React.PropTypes;

var Panel = ReactPanels.Panel;
var Tab = ReactPanels.Tab;
var Button = ReactPanels.Button;
var Content = ReactPanels.Content;

var TocTab=require("./tabs/toctab");
var DBSearchTab=require("./tabs/dbsearchtab");

var LeftPanel=React.createClass({displayName: "LeftPanel",
	mixins:[PureRenderMixin]
	,propTypes:{
		action: PT.func.isRequired
	}
  ,action:function(type,p1,p2) {
  	if (type==="opentoc"){
  		this.refs.panel.setSelectedIndex(1);
  		return;
  	}
  	this.props.action.apply(this,arguments);
  }
	,render:function() {
 		return React.createElement(Panel, {ref: "panel", theme: "flexbox"}, 
 			React.createElement(DBSearchTab, {action: this.action, title: "DB"}), 
      React.createElement(TocTab, {action: this.action, title: "Toc"})
    )
	}
});
module.exports=LeftPanel;
},{"./tabs/dbsearchtab":"C:\\ksana2015\\accelon2015\\src\\tabs\\dbsearchtab.js","./tabs/toctab":"C:\\ksana2015\\accelon2015\\src\\tabs\\toctab.js","react-panels":"C:\\ksana2015\\node_modules\\react-panels\\index.js","react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\main.jsx":[function(require,module,exports){
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

var maincomponent = React.createClass({displayName: "maincomponent",
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

},{"./leftpanel":"C:\\ksana2015\\accelon2015\\src\\leftpanel.js","./rightpanel":"C:\\ksana2015\\accelon2015\\src\\rightpanel.js","react":"react"}],"C:\\ksana2015\\accelon2015\\src\\rightpanel.js":[function(require,module,exports){
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
    ,position:"relative"
  }
};
var store_kwic=require("./stores/kwic");

var RightPanel=React.createClass({displayName: "RightPanel",
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

},{"./auxpanel":"C:\\ksana2015\\accelon2015\\src\\auxpanel.js","./stores/kwic":"C:\\ksana2015\\accelon2015\\src\\stores\\kwic.js","./textpanel":"C:\\ksana2015\\accelon2015\\src\\textpanel.js","react":"react","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\stores\\databases.js":[function(require,module,exports){
var Reflux=require("reflux");
var actions=require("../actions/databases");
var ksa=require("ksana-simple-api");

var DBListStore=Reflux.createStore({
	databases:[]
	,listenables:actions
	,init:function() {
		ksa.listkdb(function(databases){
				this.databases=databases;
		}.bind(this));
	}
	,triggerImmutable:function() {
		var searchable=[];
		for (var i=0;i<this.searchable.length;i++) {
			searchable.push(this.searchable[i]);
		}
		this.trigger(searchable);
	}
	,onList:function(appname) {
		appname=appname||"";
		if (appname) this.searchable=this.databases.filter(function(item){
			return item.folder===appname|| item.folder==="accelon2015_kdb"});
		else this.searchable=this.databases;
		this.triggerImmutable();
	}
	,clearResult:function() {
		this.searchable=this.searchable.map(function(db){
			delete db.hits;
			return db;
		});
		this.triggerImmutable();
	}
	,onSearch:function(tofind){
		var that=this;
		if (!tofind) {
			this.clearResult();
			return;
		}
		ksa.fillHits(this.searchable,tofind, function(res){
			this.searchable=JSON.parse(JSON.stringify(res));
			this.triggerImmutable();
		}.bind(this));

	}
})

module.exports=DBListStore;
},{"../actions/databases":"C:\\ksana2015\\accelon2015\\src\\actions\\databases.js","ksana-simple-api":"ksana-simple-api","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\stores\\kwic.js":[function(require,module,exports){
/** 
	Store of Key Words In Context (KWIC)
*/

var Reflux=require("reflux");
var actions=require("../actions/kwic");
var ksa=require("ksana-simple-api");

var KWICStore=Reflux.createStore({
	listenables:actions
	,kwic:[]
	,find:function(field,val) {
		for (var i=0;i<this.kwic.length;i++) {
			if (this.kwic[i][field]===val) return i;
		}
		return -1;
	}
	,triggerImmutable:function() {
			var kwic=[];
			for (var i=0;i<this.kwic.length;i++) {
				kwic.push(this.kwic[i]);
			}
			this.trigger(kwic);
	}
	,add_replace:function(trait) {
		var i=this.find("dbname",trait.dbname);
		if (i>-1) this.kwic.splice(i,1);
		this.kwic.unshift(trait);
	}
	,onOpen:function(dbid,tofind,opts) {
		ksa.excerpt({db:dbid,q:tofind},function(err,data){
			if (!err) {
				if (!data.key) data.key='S'+Math.round(Math.random()*10);
				this.add_replace({db:dbid,q:tofind,excerpts:data});
				this.triggerImmutable();
			};
		}.bind(this));
	}
	,onRemove:function(key) {
		var i=this.find("key",key);
		if (i===-1)return;
		this.kwic.splice(i,1);
		this.triggerImmutable();
	}
	,onSearch:function() {
	}
})
module.exports=KWICStore;
},{"../actions/kwic":"C:\\ksana2015\\accelon2015\\src\\actions\\kwic.js","ksana-simple-api":"ksana-simple-api","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\stores\\texts.js":[function(require,module,exports){
var Reflux=require("reflux");
var actions=require("../actions/texts");
var MAXTAB=10;

var Texts=Reflux.createStore({
	listenables:actions
	,texts:[]
	,find:function(key) {
		for (var i=0;i<this.texts.length;i++) {
			if (this.texts[i].key===key) return i;
		}
		return -1;
	}
	,add_replace:function(trait) {
		var i=this.find(trait.key);
		if (i>-1) this.texts.splice(i,1);
		if (this.texts.length>=MAXTAB) this.texts.pop();
	 	this.texts.unshift(trait);
	}
	,triggerImmutable:function(key) {
		var texts=[];
		for (var i=0;i<this.texts.length;i++) {
			texts.push(this.texts[i]);
		}
		this.trigger(texts,key);
	}
	,onCloseAdd:function(oldkey,trait) {
		var i=this.find(oldkey);
		if (i==-1)	return ;
		this.texts[i]=trait;
		this.triggerImmutable(trait.key);
	}
	,onAdd:function(trait) {
		this.add_replace(trait);
		this.triggerImmutable(trait.key);
	}
	,onRemove:function(key) {
		var i=this.find(key);
		if (i>-1) this.texts.splice(i,1);
		this.triggerImmutable(key);
	}
})
module.exports=Texts;
},{"../actions/texts":"C:\\ksana2015\\accelon2015\\src\\actions\\texts.js","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\stores\\toc.js":[function(require,module,exports){
/** 
Store of Keywords in context
*/

var Reflux=require("reflux");
var actions=require("../actions/toc");
var ksa=require("ksana-simple-api");
var TOCStore=Reflux.createStore({
	listenables:actions
	,find:function(key) {
	}
	,onOpen:function(dbname,q) {
		ksa.toc({db:dbname,q:q},function(err,res){
			this.trigger(res.toc,dbname,res.tocname,q,res.hits);
		}.bind(this));
	}
	,onSearch:function(key) {
	}
})
module.exports=TOCStore;
},{"../actions/toc":"C:\\ksana2015\\accelon2015\\src\\actions\\toc.js","ksana-simple-api":"ksana-simple-api","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\tabs\\dbsearchtab.js":[function(require,module,exports){
var React=require("react/addons");
var E=React.createElement;
var PT=React.PropTypes;
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");

var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;

var store=require("../stores/databases");
var action=require("../actions/databases");

var DBList=require("../views/dblist");
var DBSearchInput=require("../views/dbsearchinput");

var DBListTab=React.createClass({displayName: "DBListTab",
	mixins: [Reflux.listenTo(store,"onData"),TabWrapperMixin,PureRenderMixin]
	,getInitialState:function() {
		return {databases:[],tofind:""};
	}
	,propTypes:{
		action:PT.func.isRequired
	}
	,componentDidMount:function() {
		setTimeout(function(){
			action.list(ksana.js.kdbfolder);
		}.bind(this),500);
	}
	,onData:function(data) {
		this.setState({databases:data});
	}	
	,onTofindChange:function(tofind) {
		this.setState({tofind:tofind});
	}
	,render:function() {
		return React.createElement(Tab, {title: "One"}, 
        React.createElement(Content, null, 
        	React.createElement(DBSearchInput, {onTofindChange: this.onTofindChange}), 
        	React.createElement(DBList, {action: this.props.action, databases: this.state.databases, tofind: this.state.tofind})
        )
      )
	}
});

module.exports=DBListTab;
},{"../actions/databases":"C:\\ksana2015\\accelon2015\\src\\actions\\databases.js","../stores/databases":"C:\\ksana2015\\accelon2015\\src\\stores\\databases.js","../views/dblist":"C:\\ksana2015\\accelon2015\\src\\views\\dblist.js","../views/dbsearchinput":"C:\\ksana2015\\accelon2015\\src\\views\\dbsearchinput.js","react-panels":"C:\\ksana2015\\node_modules\\react-panels\\index.js","react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\tabs\\kwictab.js":[function(require,module,exports){
var React=require("react/addons");
var E=React.createElement;
var PT=React.PropTypes;
var PureRenderMixin=React.addons.PureRenderMixin;

var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;

var KWIC=require("../views/kwic");

var KWICTab = React.createClass({
  displayName: 'KWICTab'
  ,getInitialState:function() {
  	return {}
  }
  ,mixins: [TabWrapperMixin,PureRenderMixin]
  ,action:function(){

  }
  ,renderContent:function() {
  	return React.createElement(KWIC, {excerpts: this.props.excerpts, db: this.props.db, q: this.props.q})
  }
  ,render:function() {
 		return React.createElement(Tab, {ref: "tab", icon: this.props.icon, title: this.props.title, 
    showToolbar: this.props.showToolbar, 
    showFooter: this.props.showFooter}, 
        React.createElement(Content, null, 
          this.renderContent()
        ), 
        React.createElement(Footer, null
        )
    )
  }
});

module.exports=KWICTab;
},{"../views/kwic":"C:\\ksana2015\\accelon2015\\src\\views\\kwic.js","react-panels":"C:\\ksana2015\\node_modules\\react-panels\\index.js","react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\tabs\\textfooter.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var TextFooter=React.createClass({displayName: "TextFooter",
	mixins:[PureRenderMixin]
	,propTypes:{
		action:React.PropTypes.func.isRequired
	}
	,render:function(){
	   	if (this.props.editing) {
     	 return ( React.createElement("div", {style: {display:"flex"}}, 
        	React.createElement("button", {style: {marginLeft:"auto"}}, "apply Changes")
        	));
   		 } else {
      		return React.createElement("button", null, "dictionary")
   		 }	
	}
});

module.exports=TextFooter;

},{"react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\tabs\\texttab.js":[function(require,module,exports){
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
 		return React.createElement(Tab, {ref: "tab", icon: this.props.icon, title: this.props.title, 
    showToolbar: this.props.showToolbar, 
    showFooter: this.props.showFooter}, 
        React.createElement(Toolbar, null, 
          React.createElement(TextToolbar, {action: this.action})
        ), 
        React.createElement(Content, null, 
          this.renderContent()
        )
    )
  }
});

module.exports=TextTab;
},{"../actions/texts":"C:\\ksana2015\\accelon2015\\src\\actions\\texts.js","../views/textcontent":"C:\\ksana2015\\accelon2015\\src\\views\\textcontent.js","./textfooter":"C:\\ksana2015\\accelon2015\\src\\tabs\\textfooter.js","./texttoolbar":"C:\\ksana2015\\accelon2015\\src\\tabs\\texttoolbar.js","ksana-simple-api":"ksana-simple-api","react-panels":"C:\\ksana2015\\node_modules\\react-panels\\index.js","react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\tabs\\texttoolbar.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var TextToolbar=React.createClass({displayName: "TextToolbar",
	mixins:[PureRenderMixin]
	,propTypes:{
		action:React.PropTypes.func.isRequired
	}
	,getDefaultProps:function(){
		return {};
	}
	,prevSeg:function() {
		this.props.action("prev");
	}
	,nextSeg:function() {
		this.props.action("next");
	}
	,cloneTabInNewPanel:function() {
		this.props.action("clone");	
	}
	,fontresize:function() {
		this.props.action("fontresize");
	}
	,toggleEdit:function() {
		this.props.action("toggleedit");
	}	
	,resize:function() {
		this.props.action("resize");
	}
	,removeMarkup:function() {
		this.props.action("removeMarkup");
	}
	,render:function(){
		var btnstyle={marginLeft:"auto"};
		return (
     	React.createElement("div", {style: {display:"flex"}}, 
          React.createElement("button", {onClick: this.prevSeg}, React.createElement("i", {className: "fa fa-chevron-left"})), 
          React.createElement("button", {title: "change font size", onClick: this.fontresize}, React.createElement("i", {className: "fa fa-font"})), 
          React.createElement("button", {onClick: this.nextSeg}, React.createElement("i", {className: "fa fa-chevron-right"}))
          )	
         );
	}   
});

module.exports=TextToolbar;

},{"react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\tabs\\toctab.js":[function(require,module,exports){
var React=require("react/addons");
var E=React.createElement;
var PT=React.PropTypes;
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;
var store=require("../stores/toc");

var TocContent=require("../views/toccontent");

var TocTab=React.createClass({displayName: "TocTab",
	mixins: [Reflux.listenTo(store,"onData"),TabWrapperMixin,PureRenderMixin]
	,getInitialState:function() {
		return {toc:[]};
	}
	,propTypes:{
		q:PT.string
	}
	,onData:function(data,dbid,tocname,q,hits) {
		this.setState({toc:data,dbid:dbid,tocname:tocname,q:q,hits:hits});
	}	
	,render:function() {
		return React.createElement(Tab, {title: "One"}, 
        React.createElement(Content, null, React.createElement(TocContent, {dbid: this.state.dbid, 
        	q: this.state.q, toc: this.state.toc, hits: this.state.hits}))
      )
	}
});

module.exports=TocTab;
},{"../stores/toc":"C:\\ksana2015\\accelon2015\\src\\stores\\toc.js","../views/toccontent":"C:\\ksana2015\\accelon2015\\src\\views\\toccontent.js","react-panels":"C:\\ksana2015\\node_modules\\react-panels\\index.js","react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\textpanel.js":[function(require,module,exports){
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
var defaultTabs=[React.createElement(Welcome, {key: "welcome"})];
var TextTab=require("./tabs/texttab");

var action=require("./actions/texts");

var TextPanel=React.createClass({displayName: "TextPanel",
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
		return React.createElement(Button, {title: "Remove active tab", onButtonClick: this.closeTab}, 
            React.createElement("i", {className: "fa fa-times"})
          )
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
 		return React.createElement(Panel, {ref: "panel", theme: "flexbox", buttons: [this.panelbuttons()], 
      leftButtons: this.leftbuttons()}, 
	 		this.state.traits.map(this.renderTab)
    )
	}
});
module.exports=TextPanel;
},{"./actions/texts":"C:\\ksana2015\\accelon2015\\src\\actions\\texts.js","./stores/texts":"C:\\ksana2015\\accelon2015\\src\\stores\\texts.js","./tabs/texttab":"C:\\ksana2015\\accelon2015\\src\\tabs\\texttab.js","./views/welcome":"C:\\ksana2015\\accelon2015\\src\\views\\welcome.js","react-panels":"C:\\ksana2015\\node_modules\\react-panels\\index.js","react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\views\\dblist.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var E=React.createElement;
var PT=React.PropTypes;
var DBListItem=require("./dblistitem");
var styles={
	container:{height:"99%",overflowY:"auto",overflowX:"hidden"}
}
var DBListContent=React.createClass({displayName: "DBListContent",
	mixins:[PureRenderMixin]
	,propTypes:{
		databases:PT.array.isRequired
		,action:PT.func.isRequired
		,tofind:PT.string.isRequired
	}	
	,renderItem:function(db,idx){
		return React.createElement(DBListItem, {action: this.props.action, key: idx, db: db, tofind: this.props.tofind})
	}
	,render:function() {
		return E("div",{style:styles.container},
			this.props.databases.map(this.renderItem)
		);
	}
});
module.exports=DBListContent;
},{"./dblistitem":"C:\\ksana2015\\accelon2015\\src\\views\\dblistitem.js","react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\views\\dblistitem.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var action_kwic=require("../actions/kwic");
var action_toc=require("../actions/toc");
var E=React.createElement;
var PT=React.PropTypes;
var HoverLink=require("./hoverlink");

var styles={
	dbitem:{color:"white",display:"flex",fontSize:"150%",borderBottom:"solid 1px black"}
	,name:{flex:3}
	,hits:{flex:2}
}

var DBListItem=React.createClass({displayName: "DBListItem",
	mixins:[PureRenderMixin]
	,propTypes:{
		action:PT.func.isRequired
		,tofind:PT.string.isRequired
	}
	,showKWIC:function(e){
		this.props.action("openkwic");
		action_kwic.open(this.props.db.fullname,this.props.tofind,{range:{start:0}});
	}
	,showTOC:function(e) {
		this.props.action("opentoc");	
		action_toc.open(this.props.db.fullname,this.props.tofind);
	}
	,render:function() {
		var db=this.props.db;
		return React.createElement("div", {style: styles.dbitem}, 
			React.createElement("span", {onClick: this.showTOC, style: styles.name}, React.createElement(HoverLink, null, db.shortname)), 
			React.createElement("span", {onClick: this.showKWIC, style: styles.hits}, React.createElement(HoverLink, null, db.hits))
			)
	}
});

module.exports=DBListItem;
},{"../actions/kwic":"C:\\ksana2015\\accelon2015\\src\\actions\\kwic.js","../actions/toc":"C:\\ksana2015\\accelon2015\\src\\actions\\toc.js","./hoverlink":"C:\\ksana2015\\accelon2015\\src\\views\\hoverlink.js","react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\views\\dbsearchinput.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var action=require("../actions/databases");

var styles={
	tofind: {fontSize:"200%",borderRadius:"10px",outline:0,border: "solid 1px #dcdcdc"}
}
var TextContent=React.createClass({displayName: "TextContent",
	mixins:[PureRenderMixin]
	,getInitialState:function(){
		return {tofind:'大千'}
	}
	,propTypes:{
		onTofindChange:PT.func
	}
	,onKeyPress:function(e) {
		if (e.key=="Enter") {
			this.dosearch();
		}
	}
	,componentDidMount:function() {
		setTimeout(function(){
			this.refs.tofind.getDOMNode().focus();	
		}.bind(this),500);
	}
	,dosearch:function() {
		action.search(this.state.tofind);
		if (this.props.onTofindChange) this.props.onTofindChange(this.state.tofind);
	}
	,onChange:function(e) {
		this.setState({tofind:e.target.value});
		clearTimeout(this.timer);
		this.timer=setTimeout(function(){
			this.dosearch();
		}.bind(this),500);
	}
	,render:function() {
		return E("div",{},
			E("input",{ref:"tofind",style:styles.tofind,size:5,
				onKeyPress:this.onKeyPress,onChange:this.onChange,value:this.state.tofind})
		);
	}
});
module.exports=TextContent;
},{"../actions/databases":"C:\\ksana2015\\accelon2015\\src\\actions\\databases.js","react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\views\\hoverlink.js":[function(require,module,exports){
/**
	enclose a text to enable hover effect
	usage:
		<span onclick={} style={}><HoverLink>text</HoverLink</span>
*/
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var PT=React.PropTypes;

var styles={
	enter:{
		background:'highlight'
		,color:'highlightText'
		,borderRadius:'5px'
		,cursor:'pointer'
	}
	,leave:{
		background:null
		,color:null
		,cursor:''
	} 
}
var HoverLink=React.createClass({displayName: "HoverLink",
	mixins:[PureRenderMixin]
	,onleave:function(e) {
		for (var i in styles.leave) e.target.style[i]=styles.leave[i];
	}
	,onenter:function(e) {
		for (var i in styles.enter) e.target.style[i]=styles.enter[i];
	}
	,render:function() {
		return E("span",{onMouseLeave:this.onleave,onMouseEnter:this.onenter},this.props.children);
	}
});
module.exports=HoverLink;
},{"react/addons":"react/addons"}],"C:\\ksana2015\\accelon2015\\src\\views\\kwic.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var HoverLink=require("./hoverlink");
var action=require("../actions/texts");

var styles={
	container:{height:"20%",color:"white",overflowY:"auto",overflowX:"hidden"}
}
var KWIC=React.createClass({displayName: "KWIC",
	mixins:[PureRenderMixin]
	,propTypes:{
		excerpts:PT.array.isRequired
	}
	,opentext:function(e) {
		var n=e.target.parentElement.dataset.n;
		var excerpt=this.props.excerpts[n];
		var db=this.props.db;
		if (db.indexOf("/")>-1) db=db.substr(db.indexOf("/")+1);
		var key=db+":"+excerpt.uti;
		var title=key;
		action.add({db:this.props.db
			,q:this.props.q
			,uti:excerpt.uti
			,title:title
			,key:key
		});
	}
  ,highlight:function(text,hits){
    var ex=0,out=[];
    for (var i=0;i<hits.length;i++) {
      var now=hits[i][0];
      if (now>ex) {
        out.push(React.createElement("span", {key: ex}, text.substring(ex,now)));
      }
      out.push(React.createElement("span", {key: "h"+ex, className: "hl"+hits[i][2]}, 
        text.substr(now,hits[i][1])));
      ex=now+=hits[i][1];
    }
    out.push(React.createElement("span", {key: ex}, text.substr(ex)));
    return out;
  } 
	,renderExcerpt:function(item,idx) {
		return E("div",{key:idx}
			,E("span",{"data-n":idx,onClick:this.opentext},E(HoverLink,{},item.uti))
			,this.highlight(item.text,item.hits)
		);
	}
	,render:function() {
		return E("div",{style:styles.container},
			this.props.excerpts.map(this.renderExcerpt)
		);
	}
});
module.exports=KWIC;
},{"../actions/texts":"C:\\ksana2015\\accelon2015\\src\\actions\\texts.js","./hoverlink":"C:\\ksana2015\\accelon2015\\src\\views\\hoverlink.js","react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\views\\textcontent.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var PT=React.PropTypes;
var E=React.createElement;
var styles={
  container:{height:"65%",overflowY:"auto",overflowX:"hidden",color:"white",fontSize:"150%"}
}
var TextContent=React.createClass({displayName: "TextContent",
	mixins:[PureRenderMixin]
	,propTypes:{
		text:PT.string.isRequired
		,hits:PT.array
	}
	,getDefaultProps:function() {
		return {hits:[],text:""};
	}
  ,highlight:function(text,hits){
    var ex=0,out=[];
    for (var i=0;i<hits.length;i++) {
      var now=hits[i][0];
      if (now>ex) {
        out.push(React.createElement("span", {key: ex}, text.substring(ex,now)));
      }
      out.push(React.createElement("span", {key: "h"+ex, className: "hl"+hits[i][2]}, 
        text.substr(now,hits[i][1])));
      ex=now+=hits[i][1];
    }
    out.push(React.createElement("span", {key: ex}, text.substr(ex)));
    return out;
  } 
	,render:function() {
		return E("div",{style:styles.container}, this.highlight(this.props.text,this.props.hits));
	}
});
module.exports=TextContent;
},{"react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\views\\toccontent.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var PT=React.PropTypes;
var kde=require("ksana-database");
var TreeToc=require("ksana2015-treetoc").component;
var action=require("../actions/texts");
var action_kwic=require("../actions/kwic");
var styles={
	container:{overflowY:"auto",height:"99%",overflowX:"hidden",color:"white"}
}
var TocContent=React.createClass({displayName: "TocContent",
	mixins:[PureRenderMixin]
	,propTypes:{
		toc:PT.array.isRequired
		,hits:PT.array
		,q:PT.string
		,dbid:PT.string
	}
	,openkwic:function(tocid,tocitem){
		action_kwic.open(this.props.dbid,this.props.q,{range:{start:tocitem.vpos,end:tocitem.end}});
	}
	,opentext:function(tocid,tocitem){
		kde.open(this.props.dbid,function(err,db){
			var fseg=db.fileSegFromVpos(tocitem.vpos);
			fseg.seg--;
			var absseg=db.fileSegToAbsSeg(fseg.file,fseg.seg);
			var seg=fseg.seg, segnames=db.get("segnames");
			var title=db.dbname+":"+segnames[absseg];
			var key=title;
			if (segnames[absseg]==="_") {
				var title=db.dbname+":"+segnames[absseg];
				seg++;
			}
			action.add({key:key,title:title,engine:db,dbid:db.dbname,
				file:fseg.file,seg:seg,q:this.props.q});
		}.bind(this));
	}
	,render:function() {
		return E("div",{style:styles.container},
			E(TreeToc,{onSelect:this.opentext,onHitClick:this.openkwic,
				toc:this.props.toc,hits:this.props.hits})
		);
	}
});
module.exports=TocContent;
},{"../actions/kwic":"C:\\ksana2015\\accelon2015\\src\\actions\\kwic.js","../actions/texts":"C:\\ksana2015\\accelon2015\\src\\actions\\texts.js","ksana-database":"ksana-database","ksana2015-treetoc":"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\index.js","react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\accelon2015\\src\\views\\welcome.js":[function(require,module,exports){
var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var styles={
	container:{height:"100%",color:"white"}
}
var Welcome=React.createClass({displayName: "Welcome",
	render:function() {
		return E("div",{style:styles.container},"WELCOME");
	}
});
module.exports=Welcome;
},{"react/addons":"react/addons","reflux":"C:\\ksana2015\\node_modules\\reflux\\index.js"}],"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\addnode.js":[function(require,module,exports){
var React=require("react");
var E=React.createElement;
var linecount=function(t) {
	var lcount=0;
	t.replace(/\n/g,function(){
		lcount++;
	})
	return lcount+2;
}
var AddNode=React.createClass({
	propTypes:{
		action: React.PropTypes.func.isRequired
	}
	,addingkeydown:function(e) {
		var t=e.target.value;
		if (e.key=="Enter" && t.charCodeAt(t.length-1)==10) {
			this.props.action("addnode",t.trim().split("\n"),this.props.insertBefore);
		}
		var lc=linecount(t);
		e.target.rows=lc;
	}
	,componentDidMount:function() {
		this.refs.adding.getDOMNode().focus();
	}
	,render:function(){
		return E("div", {}, 
			E("textarea",
				{onKeyDown:this.addingkeydown,ref:"adding"
				 ,placeholder:"Enter twice to finish adding",defaultValue:""}
		));
	}

})

module.exports=AddNode;
},{"react":"react"}],"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\controls.js":[function(require,module,exports){
var React=require("react");
var E=React.createElement;

var Controls=React.createClass({
	propTypes:{
		enabled:React.PropTypes.array.isRequired
		,action:React.PropTypes.func.isRequired
	}
	,getDefaultProps:function(){
		return {enabled:[]};
	}
	,enb:function(name) {
		return this.props.enabled.indexOf(name)===-1;		
	}
	,act:function(name) {
		var that=this;
		return function(e){
			that.props.action(name,e.ctrlKey);
		}
	}
	,render:function() {
		return E("span",{},
			E("button" ,{onClick:this.act("addingnode"),title:"Create a new node below, press Ctrl to above here."},"＋"),
			E("button"　,{style:{visibility:"hidden"}}," "),
			E("button" ,{onClick:this.act("levelup"),title:"level -1",disabled:this.enb("levelup")},"⇠"),
			E("button" ,{onClick:this.act("leveldown"),title:"level +1",disabled:this.enb("leveldown")},"⇢")
		);
	}
})

module.exports=Controls;
},{"react":"react"}],"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\index.js":[function(require,module,exports){
/*
   toc data format
   array of { d:depth, o:opened, t:text, n:next_same_level ]

   only first level can be 0

   TODO, do not write directly to props.toc
*/
var React=require("react");
var TreeNode=require("./treenode");
var E=React.createElement;
var manipulate=require("./manipulate");

var buildToc = function(toc) {
	if (!toc || !toc.length || toc.built) return;
	var depths=[];
 	var prev=0;
 	if (toc.length>1) {
 		toc[0].o=true;//opened
 	}
 	for (var i=0;i<toc.length;i++) delete toc[i].n;
	for (var i=0;i<toc.length;i++) {
	    var depth=toc[i].d||toc[i].depth;
	    if (prev>depth) { //link to prev sibling
	      if (depths[depth]) toc[depths[depth]].n = i;
	      for (var j=depth;j<prev;j++) depths[j]=0;
	    }
    	depths[depth]=i;
    	prev=depth;
	}
	toc.built=true;
	return toc;
}
var genToc=function(toc,title) {
    var out=[{depth:0,text:title||ksana.js.title}];
    if (toc.texts) for (var i=0;i<toc.texts.length;i++) {
      out.push({t:toc.texts[i],d:toc.depths[i], vpos:toc.vpos[i]});
    }
    return out;
}

var TreeToc=React.createClass({
	propTypes:{
		toc:React.PropTypes.array.isRequired  //core toc dataset
		,opts:React.PropTypes.object    
		,onSelect:React.PropTypes.func  //user select a treenode
		,tocid:React.PropTypes.string  //toc view 
		,styles:React.PropTypes.object //custom styles
	}
	,getInitialState:function(){
		return {editcaption:-1,selected:[]};
	}
	,clearHits:function() {
		for (var i=0;i<this.props.toc;i++) {
			if (this.props.toc[i].hit) delete this.props.toc[i].hit;
		}
	}
	,componentWillReceiveProps:function(nextProps) {
		if (nextProps.toc && !nextProps.toc.built) {
			buildToc(nextProps.toc);
		}
		if (nextProps.hits!==this.props.hits) {
			this.clearHits();
		}
	}
	,getDefaultProps:function() {
		return {opts:{}};
	}
	,action:function() {
		var args=Array.prototype.slice.apply(arguments);
		var act=args.shift();
		var p1=args[0];
		var p2=args[1];
		var sels=this.state.selected;
		var toc=this.props.toc;
		var r=false;
		if (act==="updateall") {
			this.setState({editcaption:-1,deleting:-1});
		} else if (act==="editcaption") {
			var n=parseInt(p1);
			this.setState({editcaption:n,selected:[n]});
		} else if (act==="deleting") {
			this.setState({deleting:this.state.editcaption});
		} else if (act==="changecaption") {
			if (!this.state.editcaption===-1) return;
			if (!p1) {
				this.action("deleting");
			} else {
				this.props.toc[this.state.editcaption].t=p1;
				this.setState({editcaption:-1});
			}
		} else if (act==="select") {
			var selected=this.state.selected;
			if (!(this.props.opts.multiselect && p2)) {
				selected=[];
			}
			var n=parseInt(p1);
			if (n>0) selected.push(n);
			this.props.onSelect&&this.props.onSelect(this.props.tocid,this.props.toc[n],n,this.props.toc);
			this.setState({selected:selected,editcaption:-1,deleting:-1,adding:0});
		} else if (act==="addingnode") {
			var insertAt=sels[0];
			if (p1) {
				insertAt=-insertAt; //ctrl pressed insert before
			}
			this.setState({adding:insertAt,editcaption:-1});
		} else if (act=="addnode") {
			var n=this.state.selected[0];
			r=manipulate.addNode(toc,n,p1,p2)
		}else if (act==="levelup") r=manipulate.levelUp(sels,toc);
		else if (act==="leveldown") r=manipulate.levelDown(sels,toc);
		else if (act==="deletenode") r=manipulate.deleteNode(sels,toc);
		else if (act==="hitclick") {
			this.props.onHitClick&&this.props.onHitClick(this.props.tocid,this.props.toc[p1],p1,this.props.toc);
		}
		if (r) {
			buildToc(toc);
			this.setState({editcaption:-1,deleting:-1,adding:0});
			if (act==="deletenode") this.setState({selected:[]});
		}
	}
	,render:function() {
		return E("div",{},
			E(TreeNode,{toc:this.props.toc,
				editcaption:this.state.editcaption,
				deleting:this.state.deleting,
				selected:this.state.selected,
				styles:this.props.styles,
				adding:this.state.adding,
				action:this.action,opts:this.props.opts,cur:0,
				hits:this.props.hits}));
	}
})
module.exports={component:TreeToc,genToc:genToc,buildToc:buildToc};

},{"./manipulate":"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\manipulate.js","./treenode":"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\treenode.js","react":"react"}],"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\manipulate.js":[function(require,module,exports){
var descendantOf=function(n,toc) { /* returning all descendants */
	var d=toc[n].d;
	n++;
	while (n<toc.length) {
		if (toc[n].d<=d) return n;
		n++;
	}
	return toc.length-1;
}
var levelUp =function(sels,toc) { //move select node and descendants one level up
	if (!canLevelup(sels,toc))return;
	var n=sels[0];
	var cur=toc[n];
	var next=toc[n+1];
	var nextsib=cur.n||descendantOf(n,toc);
	if (next && next.d>cur.d) { //has child
		for (var i=n+1;i<nextsib;i++) {
			toc[i].d--;
		}
	}
	cur.d--;
	cur.o=true;//force open this node , so that sibling is visible
	return true;
}
var levelDown =function(sels,toc) {
	if (!canLeveldown(sels,toc))return; //move select node descendants one level down
	var n=sels[0];
	var cur=toc[n];
	var next=toc[n+1];

	//force open previous node as it becomes parent of this node
	var p=prevSibling(n,toc);
	if (p) toc[p].o=true;

	if (!cur.o) { //do no move descendants if opened
		if (next && next.d>cur.d) { //has child
			for (var i=n+1;i<cur.n;i++) {
				toc[i].d++;
			}
		}		
	}
	cur.d++;
	return true;
}

var addNode =function(toc,n,newnodes,insertbefore) {
	var d=toc[n].d;
	if (!insertbefore) {
		toc[n].o=true;
		n++;
	}
	var args=[n,0];

	for (var i=0;i<newnodes.length;i++) {
		args.push({d:d,t:newnodes[i]});
	}
	toc.splice.apply(toc,args);
	return true;
}
var deleteNode =function(sels,toc) {
	if (!canDeleteNode(sels,toc))return; //move select node descendants one level down
	var n=sels[0];
	var to=descendantOf(n,toc);
	toc.splice(n,to-n);
	return true;
}

var canDeleteNode=function(sels,toc) {
	if (sels.length==0) return false;
	var n=sels[0];
	return (sels.length==1 && toc[n].d>0 && toc.length>2);
}
var canLevelup=function(sels,toc) {
	if (sels.length==0) return false;
	var n=sels[0];
	return (sels.length==1 && toc[n].d>1);
}
var prevSibling=function(n,toc) {
	var p=n-1;
	var d=toc[n].d;
	while (p>0) {
		if (toc[p].d<d) return 0;
		if (toc[p].d==d) return p;
		p--;
	}
}
var canLeveldown=function(sels,toc) {
	if (sels.length==0) return false;
	var n=sels[0];
	return (sels.length==1 && prevSibling(n,toc));
}
var enabled=function(sels,toc) {
	var enabled=[];
	if (canLeveldown(sels,toc)) enabled.push("leveldown");
	if (canLevelup(sels,toc)) enabled.push("levelup");
	if (canDeleteNode(sels,toc)) enabled.push("deletenode");
	return enabled;
}
module.exports={enabled:enabled,levelUp:levelUp,levelDown:levelDown,
	addNode:addNode,deleteNode:deleteNode,descendantOf:descendantOf};
},{}],"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\treenode.js":[function(require,module,exports){
var React=require("react/addons");
var E=React.createElement;
var update=React.addons.update;
var manipulate=require("./manipulate");
var Controls=require("./controls");
var AddNode=require("./addnode");
var treenodehits=require("./treenodehits");
var styles={
	selectedcaption:{cursor:"pointer",background:"highlight",borderRadius:"5px"}
	,caption:{cursor:"pointer"}
	,childnode:{left:"15px",position:"relative"}
	,rootnode:{position:"relative"}
	,folderbutton: {cursor:"pointer",borderRadius:"50%"}
	,closed:{cursor:"pointer",fontSize:"75%"}
	,opened:{cursor:"pointer",fontSize:"75%"}	
	,leaf:{fontSize:"75%"}	
	,hiddenleaf:{visibility:"hidden"}	
	,deletebutton:{background:"red",color:"yellow"}
	,nodelink:{fontSize:"65%",cursor:"pointer"}
	,hit:{color:"pink",fontSize:"65%",cursor:"pointer"}
};


var TreeNode=React.createClass({
	mixins:[React.addons.pureRenderMixin]
	,propTypes:{
		toc:React.PropTypes.array.isRequired
		,opts:React.PropTypes.object
		,action:React.PropTypes.func.isRequired 
		,selected:React.PropTypes.array         //selected treenode (multiple)
		,cur:React.PropTypes.number.isRequired //current active treenode
		,styles:React.PropTypes.object  //custom style
	}
	,getDefaultProps:function() {
		return {cur:0,opts:{},toc:[]};
	}
	,click:function(e) {
		var n=parseInt(e.target.parentElement.attributes['data-n'].value);
		this.props.toc[n].o=!this.props.toc[n].o;
		this.forceUpdate();
		e.preventDefault();
    e.stopPropagation();
	}
	,select:function(e){
		if (e.target.nodeName!=="SPAN") return;
		var datan=e.target.parentElement.attributes['data-n'];
		if (!datan) return;
		var n=parseInt(datan.value);
		var selected=this.props.selected.indexOf(n)>-1;
		if (selected && this.props.opts.editable) {
			this.props.action("editcaption",n);
		} else {
			this.props.action("select",n,e.ctrlKey);
		}
		e.preventDefault();
    e.stopPropagation();
	}
	,componentWillReceiveProps:function(nextProps) {
		if (nextProps.styles && nextProps.styles!==this.props.styles) {
			styles=update(styles,{$merge:nextProps.styles});
		}
	}
	,componentDidUpdate:function() {
		if (this.refs.editcaption) {
			var dom=this.refs.editcaption.getDOMNode();
			dom.focus();
			dom.selectionStart=dom.value.length;
		}
	}
	,oninput:function(e) {
		var size=e.target.value.length+2;;
		if (size<5) size=5;
		e.target.size=size;
	}

	,editingkeydown:function(e) {
		if (e.key=="Enter") {
			this.props.action("changecaption",e.target.value);	
			e.stopPropagation();
		} else this.oninput(e);
	}
	,deleteNodes:function() {
		this.props.action("deletenode");
	}
	,renderDeleteButton:function(n) {
		var childnode=null;
		var children=manipulate.descendantOf(n,this.props.toc);
		if (children>n+1) childnode=E("span",{}," "+(children-n)+" nodes");
		var out=E("button",{onClick:this.deleteNodes,style:styles.deletebutton},"Delete",childnode);
		return out;
	}
	,mouseenter:function(e) {
		e.target.style.background="highlight";
		e.target.style.oldcolor=e.target.style.color;
		e.target.style.color="HighlightText";
		var t=e.target.innerHTML;
		if (t==="＋"||t==="－") e.target.style.borderRadius="50%";
		else e.target.style.borderRadius="5px";
	}
	,mouseleave:function(e) {
		e.target.style.background="none";
		e.target.style.color=e.target.style.oldcolor;
	}
	,renderFolderButton:function(n) {
		var next=this.props.toc[n+1];
		var cur=this.props.toc[n];
		var folderbutton=null;
		var props={style:styles.closed, onClick:this.click, onMouseEnter:this.mouseenter,onMouseLeave:this.mouseleave};
		if (cur.o) props.style=styles.opened;
		if (next && next.d>cur.d) { 
			if (cur.o) folderbutton=E("a",props,"－");//"▼"
			else       folderbutton=E("a",props,"＋");//"▷"
		} else {
			folderbutton=E("a",{ style:styles.hiddenleaf},"　");
		}
		return folderbutton;
	}
	,renderCaption:function(n) {
		var cur=this.props.toc[n];
		var stylename="caption";
		if (this.props.selected.indexOf(n)>-1) stylename="selectedcaption";
		var caption=null;
		if (this.props.deleting===n) {
			caption=this.renderDeleteButton(n);
		} else if (this.props.editcaption===n) {
			var size=cur.t.length+2;
			if (size<5) size=5;
			caption=E("input",{onKeyDown:this.editingkeydown,
				               size:size,ref:"editcaption",defaultValue:cur.t});
		} else {
			caption=E("span",{onMouseEnter:this.mouseenter,onMouseLeave:this.mouseleave,
				style:styles[stylename],title:n},cur.t);
		}
		return caption;
	}
	,renderAddingNode:function(n,above) {
		if (this.props.adding===n && n) { 
			return E(AddNode,{insertBefore:above,action:this.props.action});
		}
	}
	,renderEditControls:function(n) {
		if (!this.props.opts.editable) return;
		if (this.props.editcaption===n) {	
			var enabled=manipulate.enabled([n],this.props.toc);
			return E(Controls,{action:this.props.action,enabled:enabled});
		} 
	}
	,renderItem:function(e,idx){
		var t=this.props.toc[e];
		var props=update(this.props,{$merge:{key:"k"+idx,cur:e}});
		return E(TreeNode,props);
	}
	,clickhit:function(e) {
		var n=parseInt(e.target.dataset.n);
		this.props.action("hitclick",n);
		e.preventDefault();
		e.stopPropagation();
	}
	,renderHit:function(hit,n) {
		if (!hit) return;
		return E("span",{onClick:this.clickhit,style:styles.hit,"data-n":n,
			onMouseEnter:this.mouseenter,onMouseLeave:this.mouseleave},hit);
	}
	,render:function() {
		if (this.props.toc.length===0) return E("span",{},"");
		var n=this.props.cur;
		var cur=this.props.toc[n];
		var stylename="childnode",children=[];
		var selected=this.props.selected.indexOf(n)>-1;
		var depthdeco=renderDepth(cur.d,this.props.opts)
		if (cur.d==0) stylename="rootnode";
		var adding_before_controls=this.renderAddingNode(-n,true);
		var adding_after_controls=this.renderAddingNode(n);
		var editcontrols=this.renderEditControls(n);
		var folderbutton=this.renderFolderButton(n);
		if (cur.o) children=enumChildren(this.props.toc,n);

		var extracomponent=this.props.opts.onNode&& this.props.opts.onNode(cur,selected,n);
		caption=this.renderCaption(n);
		if (this.props.editcaption>-1 || this.props.deleting>-1) extracomponent=null;
		if (this.props.deleting>-1) editcontrols=null;
		var hits=treenodehits(this.props.toc,this.props.hits,n);

		return E("div",{onClick:this.select,"data-n":n,style:styles[stylename]},
			   adding_before_controls,
			   folderbutton,depthdeco,
			   editcontrols,
			   caption,
			   this.renderHit(hits,n),
			   extracomponent,
			   adding_after_controls,
			   children.map(this.renderItem));
	}
});

var ganzhi="　甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥";

var renderDepth=function(depth,opts) {
  var out=[];
  if (opts&&opts.tocstyle=="ganzhi") {
    return E("span", null, ganzhi[depth].trim()+" ");
  } else {
    if (opts&&opts.numberDepth && depth) return E("span", null, depth, ".")
    else return null;
  }
  return null;
};


var enumChildren=function(toc,cur) {
    var children=[];
    if (!toc || !toc.length || toc.length==1) return children;
    thisdepth=toc[cur].d||toc[cur].depth;
    if (cur==0) thisdepth=0;
    if (cur+1>=toc.length) return children;
    if ((toc[cur+1].d||toc[cur+1].depth)!= 1+thisdepth) {
    	return children;  // no children node
    }
    var n=cur+1;
    var child=toc[n];
    
    while (child) {
      children.push(n);
      var next=toc[n+1];
      if (!next) break;
      if ((next.d||next.depth)==(child.d||child.depth)) {
        n++;
      } else if ((next.d||next.depth)>(child.d||child.depth)) {
        n=child.n||child.next;
      } else break;
      if (n) child=toc[n];else break;
    }
    return children;
}
module.exports=TreeNode;
},{"./addnode":"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\addnode.js","./controls":"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\controls.js","./manipulate":"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\manipulate.js","./treenodehits":"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\treenodehits.js","react/addons":"react/addons"}],"C:\\ksana2015\\node_modules\\ksana2015-treetoc\\treenodehits.js":[function(require,module,exports){
var rangeOfTreeNode=function(toc,n) {
  //setting the ending vpos of a treenode
  //this value is fixed when hits is changed, but not saved in kdb
  if (typeof toc[n].end!=="undefined") return;

  if (n+1>=toc.length) {
    return;
  }
  var depth=toc[n].d , nextdepth=toc[n+1].d;
  if (n==toc.length-1 || n==0) {
      toc[n].end=Math.pow(2, 48);
      return;
  } else  if (nextdepth>depth){
    if (toc[n].n) {
      toc[n].end= toc[toc[n].n].vpos || Number.MAX_VALUE;  
    } else { //last sibling
      var next=n+1;
      while (next<toc.length && toc[next].d>depth) next++;
      if (next==toc.length) toc[n].end=Math.pow(2,48);
      else toc[n].end=toc[next].voff;
    }
  } else { //same level or end of sibling
    toc[n].end=toc[n+1].vpos;
  }
}
var calculateHit=function(toc,hits,n) {

  var start=toc[n].vpos;
  var end=toc[n].end;
  if (n==0) {
    return hits.length;
  } else {
    var hit=0;
    for (var i=0;i<hits.length;i++) {
      if (hits[i]>=start && hits[i]<end) hit++;
    }
    return hit;
  }
}

var treenodehits=function(toc,hits,n) {
  if (!hits || !hits.length) return 0;

  if (toc.length<2) return 0 ;

  //need to clear toc[n].hit when hits is changed.
  //see index.js clearHits()
  if (typeof toc[n].hit!=="undefined") return toc[n].hit;

  rangeOfTreeNode(toc,n);

  return toc[n].hit=calculateHit(toc,hits,n);
}

module.exports=treenodehits;
},{}],"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\downloader.js":[function(require,module,exports){

var userCancel=false;
var files=[];
var totalDownloadByte=0;
var targetPath="";
var tempPath="";
var nfile=0;
var baseurl="";
var result="";
var downloading=false;
var startDownload=function(dbid,_baseurl,_files) { //return download id
	var fs     = require("fs");
	var path   = require("path");

	
	files=_files.split("\uffff");
	if (downloading) return false; //only one session
	userCancel=false;
	totalDownloadByte=0;
	nextFile();
	downloading=true;
	baseurl=_baseurl;
	if (baseurl[baseurl.length-1]!='/')baseurl+='/';
	targetPath=ksanagap.rootPath+dbid+'/';
	tempPath=ksanagap.rootPath+".tmp/";
	result="";
	return true;
}

var nextFile=function() {
	setTimeout(function(){
		if (nfile==files.length) {
			nfile++;
			endDownload();
		} else {
			downloadFile(nfile++);	
		}
	},100);
}

var downloadFile=function(nfile) {
	var url=baseurl+files[nfile];
	var tmpfilename=tempPath+files[nfile];
	var mkdirp = require("./mkdirp");
	var fs     = require("fs");
	var http   = require("http");

	mkdirp.sync(path.dirname(tmpfilename));
	var writeStream = fs.createWriteStream(tmpfilename);
	var datalength=0;
	var request = http.get(url, function(response) {
		response.on('data',function(chunk){
			writeStream.write(chunk);
			totalDownloadByte+=chunk.length;
			if (userCancel) {
				writeStream.end();
				setTimeout(function(){nextFile();},100);
			}
		});
		response.on("end",function() {
			writeStream.end();
			setTimeout(function(){nextFile();},100);
		});
	});
}

var cancelDownload=function() {
	userCancel=true;
	endDownload();
}
var verify=function() {
	return true;
}
var endDownload=function() {
	nfile=files.length+1;//stop
	result="cancelled";
	downloading=false;
	if (userCancel) return;
	var fs     = require("fs");
	var mkdirp = require("./mkdirp");

	for (var i=0;i<files.length;i++) {
		var targetfilename=targetPath+files[i];
		var tmpfilename   =tempPath+files[i];
		mkdirp.sync(path.dirname(targetfilename));
		fs.renameSync(tmpfilename,targetfilename);
	}
	if (verify()) {
		result="success";
	} else {
		result="error";
	}
}

var downloadedByte=function() {
	return totalDownloadByte;
}
var doneDownload=function() {
	if (nfile>files.length) return result;
	else return "";
}
var downloadingFile=function() {
	return nfile-1;
}

var downloader={startDownload:startDownload, downloadedByte:downloadedByte,
	downloadingFile:downloadingFile, cancelDownload:cancelDownload,doneDownload:doneDownload};
module.exports=downloader;
},{"./mkdirp":"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\mkdirp.js","fs":false,"http":false,"path":false}],"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\html5fs.js":[function(require,module,exports){
/* emulate filesystem on html5 browser */
var get_head=function(url,field,cb){
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD", url, true);
	xhr.onreadystatechange = function() {
			if (this.readyState == this.DONE) {
				cb(xhr.getResponseHeader(field));
			} else {
				if (this.status!==200&&this.status!==206) {
					cb("");
				}
			}
	};
	xhr.send();
}
var get_date=function(url,cb) {
	get_head(url,"Last-Modified",function(value){
		cb(value);
	});
}
var get_size=function(url, cb) {
	get_head(url,"Content-Length",function(value){
		cb(parseInt(value));
	});
};
var checkUpdate=function(url,fn,cb) {
	if (!url) {
		cb(false);
		return;
	}
	get_date(url,function(d){
		API.fs.root.getFile(fn, {create: false, exclusive: false}, function(fileEntry) {
			fileEntry.getMetadata(function(metadata){
				var localDate=Date.parse(metadata.modificationTime);
				var urlDate=Date.parse(d);
				cb(urlDate>localDate);
			});
		},function(){
			cb(false);
		});
	});
}
var download=function(url,fn,cb,statuscb,context) {
	 var totalsize=0,batches=null,written=0;
	 var fileEntry=0, fileWriter=0;
	 var createBatches=function(size) {
		var bytes=1024*1024, out=[];
		var b=Math.floor(size / bytes);
		var last=size %bytes;
		for (var i=0;i<=b;i++) {
			out.push(i*bytes);
		}
		out.push(b*bytes+last);
		return out;
	 }
	 var finish=function() {
		 rm(fn,function(){
				fileEntry.moveTo(fileEntry.filesystem.root, fn,function(){
					setTimeout( cb.bind(context,false) , 0) ;
				},function(e){
					console.log("failed",e)
				});
		 },this);
	 };
		var tempfn="temp.kdb";
		var batch=function(b) {
		var abort=false;
		var xhr = new XMLHttpRequest();
		var requesturl=url+"?"+Math.random();
		xhr.open('get', requesturl, true);
		xhr.setRequestHeader('Range', 'bytes='+batches[b]+'-'+(batches[b+1]-1));
		xhr.responseType = 'blob';
		xhr.addEventListener('load', function() {
			var blob=this.response;
			fileEntry.createWriter(function(fileWriter) {
				fileWriter.seek(fileWriter.length);
				fileWriter.write(blob);
				written+=blob.size;
				fileWriter.onwriteend = function(e) {
					if (statuscb) {
						abort=statuscb.apply(context,[ fileWriter.length / totalsize,totalsize ]);
						if (abort) setTimeout( cb.bind(context,false) , 0) ;
				 	}
					b++;
					if (!abort) {
						if (b<batches.length-1) setTimeout(batch.bind(context,b),0);
						else                    finish();
				 	}
			 	};
			}, console.error);
		},false);
		xhr.send();
	}

	get_size(url,function(size){
		totalsize=size;
		if (!size) {
			if (cb) cb.apply(context,[false]);
		} else {//ready to download
			rm(tempfn,function(){
				 batches=createBatches(size);
				 if (statuscb) statuscb.apply(context,[ 0, totalsize ]);
				 API.fs.root.getFile(tempfn, {create: 1, exclusive: false}, function(_fileEntry) {
							fileEntry=_fileEntry;
						batch(0);
				 });
			},this);
		}
	});
}

var readFile=function(filename,cb,context) {
	API.fs.root.getFile(filename, {create: false, exclusive: false},function(fileEntry) {
		fileEntry.file(function(file){
			var reader = new FileReader();
			reader.onloadend = function(e) {
				if (cb) cb.call(cb,this.result);
			};
			reader.readAsText(file,"utf8");
		});
	}, console.error);
}

function createDir(rootDirEntry, folders,  cb) {
  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
  if (folders[0] == '.' || folders[0] == '') {
    folders = folders.slice(1);
  }
  rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
    // Recursively add the new subfolder (if we still have another to create).
    if (folders.length) {
      createDir(dirEntry, folders.slice(1),cb);
    } else {
			cb();
		}
  }, cb);
};


var writeFile=function(filename,buf,cb,context){
	var write=function(fileEntry){
		fileEntry.createWriter(function(fileWriter) {
			fileWriter.write(buf);
			fileWriter.onwriteend = function(e) {
				if (cb) cb.apply(cb,[buf.byteLength]);
			};
		}, console.error);
	}

	var getFile=function(filename){
		API.fs.root.getFile(filename, {exclusive:true}, function(fileEntry) {
			write(fileEntry);
		}, function(){
				API.fs.root.getFile(filename, {create:true,exclusive:true}, function(fileEntry) {
					write(fileEntry);
				});

		});
	}
	var slash=filename.lastIndexOf("/");
	if (slash>-1) {
		createDir(API.fs.root, filename.substr(0,slash).split("/"),function(){
			getFile(filename);
		});
	} else {
		getFile(filename);
	}
}

var readdir=function(cb,context) {
	var dirReader = API.fs.root.createReader();
	var out=[],that=this;
	dirReader.readEntries(function(entries) {
		if (entries.length) {
			for (var i = 0, entry; entry = entries[i]; ++i) {
				if (entry.isFile) {
					out.push([entry.name,entry.toURL ? entry.toURL() : entry.toURI()]);
				}
			}
		}
		API.files=out;
		if (cb) cb.apply(context,[out]);
	}, function(){
		if (cb) cb.apply(context,[null]);
	});
}
var getFileURL=function(filename) {
	if (!API.files ) return null;
	var file= API.files.filter(function(f){return f[0]==filename});
	if (file.length) return file[0][1];
}
var rm=function(filename,cb,context) {
	var url=getFileURL(filename);
	if (url) rmURL(url,cb,context);
	else if (cb) cb.apply(context,[false]);
}

var rmURL=function(filename,cb,context) {
	webkitResolveLocalFileSystemURL(filename, function(fileEntry) {
		fileEntry.remove(function() {
			if (cb) cb.apply(context,[true]);
		}, console.error);
	},  function(e){
		if (cb) cb.apply(context,[false]);//no such file
	});
}
function errorHandler(e) {
	console.error('Error: ' +e.name+ " "+e.message);
}
var initfs=function(grantedBytes,cb,context) {
	webkitRequestFileSystem(PERSISTENT, grantedBytes,  function(fs) {
		API.fs=fs;
		API.quota=grantedBytes;
		readdir(function(){
			API.initialized=true;
			cb.apply(context,[grantedBytes,fs]);
		},context);
	}, errorHandler);
}
var init=function(quota,cb,context) {
	navigator.webkitPersistentStorage.requestQuota(quota,
			function(grantedBytes) {
				initfs(grantedBytes,cb,context);
		}, errorHandler
	);
}
var queryQuota=function(cb,context) {
	var that=this;
	navigator.webkitPersistentStorage.queryUsageAndQuota(
	 function(usage,quota){
			initfs(quota,function(){
				cb.apply(context,[usage,quota]);
			},context);
	});
}
var API={
	init:init
	,readdir:readdir
	,checkUpdate:checkUpdate
	,rm:rm
	,rmURL:rmURL
	,getFileURL:getFileURL
	,writeFile:writeFile
	,readFile:readFile
	,download:download
	,get_head:get_head
	,get_date:get_date
	,get_size:get_size
	,getDownloadSize:get_size
	,queryQuota:queryQuota
}
module.exports=API;

},{}],"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\ksanagap.js":[function(require,module,exports){
var appname="installer";
if (typeof ksana=="undefined") {
	window.ksana={platform:"chrome"};
	if (typeof process!=="undefined" && 
		process.versions && process.versions["node-webkit"]) {
		window.ksana.platform="node-webkit";
	}
}
var switchApp=function(path) {
	var fs=require("fs");
	path="../"+path;
	appname=path;
	document.location.href= path+"/index.html"; 
	process.chdir(path);
}
var downloader={};
var rootPath="";

var deleteApp=function(app) {
	console.error("not allow on PC, do it in File Explorer/ Finder");
}
var username=function() {
	return "";
}
var useremail=function() {
	return ""
}
var runtime_version=function() {
	return "1.4";
}

//copy from liveupdate
var jsonp=function(url,dbid,callback,context) {
  var script=document.getElementById("jsonp2");
  if (script) {
    script.parentNode.removeChild(script);
  }
  window.jsonp_handler=function(data) {
    if (typeof data=="object") {
      data.dbid=dbid;
      callback.apply(context,[data]);    
    }  
  }
  window.jsonp_error_handler=function() {
    console.error("url unreachable",url);
    callback.apply(context,[null]);
  }
  script=document.createElement('script');
  script.setAttribute('id', "jsonp2");
  script.setAttribute('onerror', "jsonp_error_handler()");
  url=url+'?'+(new Date().getTime());
  script.setAttribute('src', url);
  document.getElementsByTagName('head')[0].appendChild(script); 
}


var loadKsanajs=function(){

	if (typeof process!="undefined" && !process.browser) {
		var ksanajs=require("fs").readFileSync("./ksana.js","utf8").trim();
		downloader=require("./downloader");
		ksana.js=JSON.parse(ksanajs.substring(14,ksanajs.length-1));
		rootPath=process.cwd();
		rootPath=require("path").resolve(rootPath,"..").replace(/\\/g,"/")+'/';
		ksana.ready=true;
	} else{
		var url=window.location.origin+window.location.pathname.replace("index.html","")+"ksana.js";
		jsonp(url,appname,function(data){
			ksana.js=data;
			ksana.ready=true;
		});
	}
}

loadKsanajs();

var boot=function(appId,cb) {
	if (typeof appId=="function") {
		cb=appId;
		appId="unknownapp";
	}
	if (!ksana.js && ksana.platform=="node-webkit") {
		loadKsanajs();
	}
	ksana.appId=appId;
	var timer=setInterval(function(){
			if (ksana.ready){
				clearInterval(timer);
				cb();
			}
		});
}


var ksanagap={
	platform:"node-webkit",
	startDownload:downloader.startDownload,
	downloadedByte:downloader.downloadedByte,
	downloadingFile:downloader.downloadingFile,
	cancelDownload:downloader.cancelDownload,
	doneDownload:downloader.doneDownload,
	switchApp:switchApp,
	rootPath:rootPath,
	deleteApp: deleteApp,
	username:username, //not support on PC
	useremail:username,
	runtime_version:runtime_version,
	boot:boot
}
module.exports=ksanagap;
},{"./downloader":"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\downloader.js","fs":false,"path":false}],"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\livereload.js":[function(require,module,exports){
var started=false;
var timer=null;
var bundledate=null;
var get_date=require("./html5fs").get_date;
var checkIfBundleUpdated=function() {
	get_date("bundle.js",function(date){
		if (bundledate &&bundledate!=date){
			location.reload();
		}
		bundledate=date;
	});
}
var livereload=function() {
	if(window.location.origin.indexOf("//127.0.0.1")===-1) return;

	if (started) return;

	timer1=setInterval(function(){
		checkIfBundleUpdated();
	},2000);
	started=true;
}

module.exports=livereload;
},{"./html5fs":"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\html5fs.js"}],"C:\\ksana2015\\node_modules\\ksana2015-webruntime\\mkdirp.js":[function(require,module,exports){
function mkdirP (p, mode, f, made) {
     var path = nodeRequire('path');
     var fs = nodeRequire('fs');
	
    if (typeof mode === 'function' || mode === undefined) {
        f = mode;
        mode = 0x1FF & (~process.umask());
    }
    if (!made) made = null;

    var cb = f || function () {};
    if (typeof mode === 'string') mode = parseInt(mode, 8);
    p = path.resolve(p);

    fs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirP(path.dirname(p), mode, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, mode, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                fs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync (p, mode, made) {
    var path = nodeRequire('path');
    var fs = nodeRequire('fs');
    if (mode === undefined) {
        mode = 0x1FF & (~process.umask());
    }
    if (!made) made = null;

    if (typeof mode === 'string') mode = parseInt(mode, 8);
    p = path.resolve(p);

    try {
        fs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = sync(path.dirname(p), mode, made);
                sync(p, mode, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = fs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};

module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

},{}],"C:\\ksana2015\\node_modules\\react-panels\\index.js":[function(require,module,exports){
/*
 * react-panels
 * https://github.com/Theadd/react-panels
 *
 * Copyright (c) 2015 R.Beltran https://github.com/Theadd
 * Licensed under the MIT license.
 */

var React = require('react/addons');


var flexbox2Skin = function (skin) {
  switch (skin || "") {
    default:
      return {
        tabColor: "#b0b0b0",
        tabIconColor: "#b0b0b0",
        activeTabColor: "#daaf64",
        tabTextShadow: "#000000",
        activeTabTextShadow: "#000000",
        titleTextShadow: "#a6a6a6",
        iconTextShadow: "#000000",
        iconColor: "#daaf64",
        titleColor: "#daaf64",
        buttonBackgroundColor: "rgba(104, 226, 207, 0.15)",
        hoverButtonBackgroundColor: "rgba(104, 226, 207, 0.3)",
        activeButtonBackgroundColor: "rgba(131, 247, 220, 0.33)",
        buttonColor: "#eaeaea",
        hoverButtonColor: "#ffffff",
        activeButtonColor: "#daaf64",
        buttonTextShadow: "#7F7F7F",
        highlightedButtonBoxShadow: "rgba(255, 255, 255, 0.6)",
        tabBackgroundColor: "rgba(104, 226, 207, 0.15)",
        activeTabBackgroundColor: "rgba(131, 247, 220, 0.33)",
        hoverTabBackgroundColor: "rgba(104, 226, 207, 0.3)",
        toolbarBackgroundColor: "rgba(171, 255, 220, 0.2)",
        contentBackgroundColor: "rgba(171, 255, 220, 0.34)",
        footerBackgroundColor: "rgba(171, 255, 220, 0.2)",
        borderColor: "#000000"
      };
  }
}

var flexbox2Style = function (_opts, skin) {
  var colors,
    opts = React.addons.update({
      skin: "default",
      renderPanelBorder: true,
      activeTabHeaderBorder: true
    }, {$merge: _opts});

  skin = skin || opts.skin;

  if (typeof skin === "object") {
    colors = React.addons.update(flexbox2Skin(), {$merge: skin});
  } else {
    colors = flexbox2Skin(skin);
  }

  return {
    PanelWrapper: {
      config: {
        autocompact: false
      }
    },
    Panel: {
      style: {
        borderTop: (opts.renderPanelBorder) ? "1px solid " + colors.borderColor : "0 none",
        borderRight: (opts.renderPanelBorder) ? "1px solid " + colors.borderColor : "0 none"
      },
      header: {
        style: {
          backgroundColor: "transparent",
          display: "flex",
          minWidth: "100%",
          marginBottom: "-2px"
        }
      },
      tabsStart: {
        style: {
          width: 0
        }
      },
      tabsEnd: {
        style: {
          width: 0
        }
      },
      tabs: {
        style: {
          float: "none",
          flex: 1,
          display: "flex",
          overflow: "hidden"
        }
      },
      icon: {
        style: {
          color: colors.iconColor,
          textShadow: "2px 2px 2px " + colors.iconTextShadow,
          float: "left"
        }
      },
      box: {
        style: {
          float: "left"
        }
      },
      title: {
        style: {
          color: colors.titleColor,
          textShadow: "1px 1px 1px " + colors.titleTextShadow
        }
      },
      group: {
        style: {
          padding: 0,
          display: "inline-block",
          height: "100%",
          margin: 0
        }
      },
      body: {
        style: {
          borderLeft: (opts.renderPanelBorder) ? "1px solid " + colors.borderColor : "0 none",
          height: "calc(100% - " + Utils.pixelsOf(opts.headerHeight - 2) + ")"
        }
      }
    },
    TabButton: {
      style: {
        borderBottom: "1px solid " +  colors.borderColor,
        borderRight: "1px solid " + colors.borderColor,
        backgroundColor: colors.tabBackgroundColor,
        height: opts.headerHeight - 1,
        margin: "0",
        position: "inherit",
        float: "none",
        overflow: "hidden",
        flex: "1 0 0px",
        opacity: 1
      },
      state: {
        hover: {
          style: {
            backgroundColor: colors.hoverTabBackgroundColor
          }
        }
      },
      mods: {
        active: {
          style: {
            borderBottom: "1px solid " + (opts.activeTabHeaderBorder ? colors.borderColor : colors.activeTabBackgroundColor),
            backgroundColor: colors.activeTabBackgroundColor
          },
          state: {
            hover: {
              style: {
                borderBottom: "1px solid " + (opts.activeTabHeaderBorder ? colors.borderColor : colors.activeTabBackgroundColor),
                backgroundColor: colors.activeTabBackgroundColor
              },
              icon: {
                style: {
                  color: colors.activeTabColor,
                  textShadow: "1px 1px 1px " + colors.tabTextShadow
                }
              },
              title: {
                style: {
                  color: colors.activeTabColor,
                  textShadow: "1px 1px 1px " + colors.activeTabTextShadow
                }
              }
            }
          },
          icon: {
            style: {
              color: colors.activeTabColor,
              textShadow: "1px 1px 1px " + colors.tabTextShadow
            }
          },
          title: {
            style: {
              color: colors.activeTabColor,
              textShadow: "1px 1px 1px " + colors.activeTabTextShadow
            }
          }
        },
        last: {
          style: {
            borderRight: "0 none"
          }
        }
      },
      icon: {
        style: {
          color: colors.tabIconColor,
          textShadow: "1px 1px 1px " + colors.tabTextShadow,
          opacity: 1
        }
      },
      title: {
        style: {
          color: colors.tabColor,
          textShadow: "1px 1px 1px " + colors.tabTextShadow
        }
      },
      box: {
        style: {
          marginRight: 0,
          maxWidth: "calc(100% - " + Utils.pixelsOf(opts.headerHeight) + ")",
          opacity: 1
        }
      }
    },
    Tab: {
      toolbar: {
        style: {
          minHeight: 0,
          lineHeight: "inherit",
          padding: "0",
          display: "block",
          position: "relative",
          marginTop: "1px"
        },
        children: {
          style: {
            padding: "10px",
            lineHeight: Utils.pixelsOf(opts.headerHeight),
            position: "relative",
            backgroundColor: colors.toolbarBackgroundColor
          }
        }
      },
      content: {
        style: {
          backgroundColor: colors.contentBackgroundColor,
          boxShadow: "0px 0px 29px rgba(0, 0, 0, 0.7) inset",
          borderTop: "1px solid " +  colors.borderColor
        }
      },
      footer: {
        style: {
          backgroundColor: colors.footerBackgroundColor,
          borderTop: "1px solid " +  colors.borderColor
        }
      }
    },
    Button: {
      style: {
        height: Utils.pixelsOf(opts.headerHeight - 1),
        backgroundColor: colors.buttonBackgroundColor,
        borderBottom: "1px solid " +  colors.borderColor,
        borderLeft: "1px solid " +  colors.borderColor
      },
      children: {
        style: {
          color: colors.buttonColor,
          textShadow: "1px 1px 1px " + colors.buttonTextShadow
        }
      },
      state: {
        hover: {
          style: {
            backgroundColor: colors.hoverButtonBackgroundColor
          },
          children: {
            style: {
              color: colors.hoverButtonColor
            }
          }
        }
      },
      mods: {
        active: {
          style: {
            backgroundColor: colors.activeButtonBackgroundColor
          },
          children: {
            style: {
              color: colors.activeButtonColor
            }
          }
        },
        highlighted: {
          style: {
            boxShadow: "0 0 9px " + colors.highlightedButtonBoxShadow + " inset"
          }
        },
        disabled: {
          style: {
            pointerEvents: "none",
            opacity: 0.5
          }
        }
      }
    }
  };
};


var flexboxStyle = function (opts, skin) {
  var colors;
  skin = skin || opts.skin;

  switch (skin) {
    case "fiery":
      colors = {
        tabColor: "#b0b0b0",
        tabIconColor: "#616161",
        activeTabColor: "#f72121",
        tabTextShadow: "#000000",
        activeTabTextShadow: "#000000",
        titleTextShadow: "#a6a6a6",
        iconTextShadow: "#000000",
        iconColor: "#ffffff",
        titleColor: "#ffffff",
        buttonBackgroundColor: "#202020",
        hoverButtonBackgroundColor: "#342828",
        activeButtonBackgroundColor: "#4d2c2c",
        buttonColor: "#eaeaea",
        hoverButtonColor: "#ffffff",
        activeButtonColor: "#f72121",
        buttonTextShadow: "#7F7F7F",
        tabBackgroundColor: "#202020",
        activeTabBackgroundColor: "#2e2e2e",
        hoverTabBackgroundColor: "#342828",
        toolbarBackgroundColor: "#4d2c2c",
        contentBackgroundColor: "#3e3e3e",
        footerBackgroundColor: "#4e4e4e"
      };
      break;

    default:
      colors = {
        tabColor: "#b0b0b0",
        tabIconColor: "#616161",
        activeTabColor: "#ffffff",
        tabTextShadow: "#000000",
        activeTabTextShadow: "#7F7F7F",
        titleTextShadow: "#a6a6a6",
        iconTextShadow: "#a6a6a6",
        iconColor: "#ffffff",
        titleColor: "#ffffff",
        buttonBackgroundColor: "#202020",
        hoverButtonBackgroundColor: "#2a2a2a",
        activeButtonBackgroundColor: "#4e4e4e",
        buttonColor: "#eaeaea",
        hoverButtonColor: "#ffffff",
        activeButtonColor: "#ffffff",
        buttonTextShadow: "#7F7F7F",
        tabBackgroundColor: "#202020",
        activeTabBackgroundColor: "#2e2e2e",
        hoverTabBackgroundColor: "#2a2a2a",
        toolbarBackgroundColor: "#4e4e4e",
        contentBackgroundColor: "#3e3e3e",
        footerBackgroundColor: "#4e4e4e"
      };
      break;
  }

  return {
    PanelWrapper: {
      config: {
        autocompact: false
      }
    },
    Panel: {
      style: {
        backgroundColor: "black",
        padding: "1px 1px 0 0"
      },
      header: {
        style: {
          backgroundColor: "transparent",
          display: "flex",
          minWidth: "100%"
        }
      },
      tabsStart: {
        style: {
          width: 0
        }
      },
      tabsEnd: {
        style: {
          width: 0
        }
      },
      tabs: {
        style: {
          float: "none",
          flex: 1,
          display: "flex",
          overflow: "hidden"
        }
      },
      icon: {
        style: {
          color: colors.iconColor,
          textShadow: "2px 2px 2px " + colors.iconTextShadow,
          float: "left"
        }
      },
      box: {
        style: {
          float: "left"
        }
      },
      title: {
        style: {
          color: colors.titleColor,
          textShadow: "1px 1px 1px " + colors.titleTextShadow
        }
      },
      group: {
        style: {
          padding: 0,
          display: "inline-block",
          height: "100%",
          margin: 0
        }
      },
      body: {
        style: {
          marginLeft: "1px"
        }
      }
    },
    TabButton: {
      style: {
        backgroundColor: colors.tabBackgroundColor,
        height: opts.headerHeight - 1,
        margin: "0 0 1px 1px",
        position: "inherit",
        float: "none",
        overflow: "hidden",
        flex: "1 0 0px"
      },
      state: {
        hover: {
          style: {
            backgroundColor: colors.hoverTabBackgroundColor
          }
        }
      },
      mods: {
        active: {
          style: {
            backgroundColor: colors.activeTabBackgroundColor
          },
          state: {
            hover: {
              style: {
                backgroundColor: colors.activeTabBackgroundColor
              },
              icon: {
                style: {
                  color: colors.activeTabColor,
                  textShadow: "1px 1px 1px " + colors.tabTextShadow
                }
              },
              title: {
                style: {
                  color: colors.activeTabColor,
                  textShadow: "1px 1px 1px " + colors.activeTabTextShadow
                }
              }
            }
          },
          icon: {
            style: {
              color: colors.activeTabColor,
              textShadow: "1px 1px 1px " + colors.tabTextShadow
            }
          },
          title: {
            style: {
              color: colors.activeTabColor,
              textShadow: "1px 1px 1px " + colors.activeTabTextShadow
            }
          }
        }
      },
      icon: {
        style: {
          color: colors.tabIconColor,
          textShadow: "1px 1px 1px " + colors.tabTextShadow
        }
      },
      title: {
        style: {
          color: colors.tabColor,
          textShadow: "1px 1px 1px " + colors.tabTextShadow
        }
      },
      box: {
        style: {
          marginRight: 0,
          maxWidth: "calc(100% - " + Utils.pixelsOf(opts.headerHeight) + ")"
        }
      }
    },
    Tab: {
      toolbar: {
        style: {
          minHeight: 0,
          lineHeight: "inherit",
          padding: "0",
          display: "block",
          position: "relative",
          top: "-1px"
        },
        children: {
          style: {
            padding: "10px",
            lineHeight: Utils.pixelsOf(opts.headerHeight),
            position: "relative",
            marginTop: "1px",
            backgroundColor: colors.toolbarBackgroundColor
          }
        }
      },
      content: {
        style: {
          backgroundColor: colors.contentBackgroundColor,
          marginBottom: "1px"
        }
      },
      footer: {
        style: {
          backgroundColor: colors.footerBackgroundColor,
          marginBottom: "1px"
        }
      }
    },
    Button: {
      style: {
        height: Utils.pixelsOf(opts.headerHeight - 1),
        backgroundColor: colors.buttonBackgroundColor,
        marginLeft: "1px"
      },
      children: {
        style: {
          color: colors.buttonColor,
          textShadow: "1px 1px 1px " + colors.buttonTextShadow
        }
      },
      state: {
        hover: {
          style: {
            backgroundColor: colors.hoverButtonBackgroundColor
          },
          children: {
            style: {
              color: colors.hoverButtonColor
            }
          }
        }
      },
      mods: {
        active: {
          style: {
            backgroundColor: colors.activeButtonBackgroundColor
          },
          children: {
            style: {
              color: colors.activeButtonColor
            }
          }
        }
      }
    }
  };
};


var chemicalStyle = function (opts, skin) {
  var colors;
  skin = skin || opts.skin;

  switch (skin) {
    case "blueish":
      colors = {
        tabColor: "rgba(0, 0, 0, 0.8)",
        activeTabColor: "rgba(0, 0, 0, 0.9)",
        tabTextShadow: "#bbbbbb",
        activeTabTextShadow: "#999999",
        activeTabBackgroundColor: "rgba(102, 143, 182, 0.25)",
        activeTabBorderColor: "rgba(0, 0, 0, 0.5)",
        titleTextShadow: "#a6a6a6",
        iconTextShadow: "rgba(0, 0, 0, 0.9)",
        iconColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "rgba(0, 0, 0, 0.8)",
        toolbarBoxShadow: "rgba(0, 0, 0, 0.1)",
        contentBackgroundColorWithToolbar: "rgba(102, 143, 182, 0.25)",
        footerBackgroundColor: "rgba(165, 165, 165, 0.32)",
        hoverTabBackgroundColor: "rgba(224, 230, 240, 0.65)",
        buttonBackgroundColor: "rgba(224, 230, 240, 0.65)",
        hoverButtonBackgroundColor: "rgba(102, 143, 182, 0.25)",
        activeButtonBackgroundColor: "rgba(102, 143, 182, 0.25)"
      };

      break;
    default:
      colors = {
        tabColor: "#ffffff",
        activeTabColor: "rgba(0, 0, 0, 0.9)",
        tabTextShadow: "#bbbbbb",
        activeTabTextShadow: "#999999",
        activeTabBackgroundColor: "rgba(255, 255, 255, 0.9)",
        activeTabBorderColor: "rgba(0, 0, 0, 0.5)",
        titleTextShadow: "#a6a6a6",
        iconTextShadow: "rgba(0, 0, 0, 0.9)",
        iconColor: "#ffffff",
        titleColor: "#ffffff",
        toolbarBoxShadow: "rgba(0, 0, 0, 0.1)",
        contentBackgroundColorWithToolbar: "rgba(255, 255, 255, 0.85)",
        footerBackgroundColor: "rgba(224, 230, 240, 0.8)",
        hoverTabBackgroundColor: "rgba(224, 230, 240, 0.65)",
        buttonBackgroundColor: "rgba(255, 255, 255, 0.2)",
        hoverButtonBackgroundColor: "rgba(255, 255, 255, 0.9)",
        activeButtonBackgroundColor: "rgba(255, 255, 255, 0.9)"
      };
      break;
  }

  return {
    Panel: {
      header: {
        style: {
          backgroundColor: "transparent",
          paddingRight: Utils.pixelsOf(opts.headerHeight)
        }
      },
      tabsStart: {
        style: {
          width: 50,
          float: "left"
        }
      },
      tabsEnd: {
        style: {
          width: 10,
          float: "right"
        }
      },
      tabs: {
        style: {
          float: "left"
        }
      },
      icon: {
        style: {
          color: colors.iconColor,
          textShadow: "2px 2px 2px " + colors.iconTextShadow,
          float: "left"
        }
      },
      box: {
        style: {
          float: "left"
        }
      },
      title: {
        style: {
          color: colors.titleColor,
          textShadow: "1px 1px 1px " + colors.titleTextShadow
        }
      },
      body: {
        style: {
          backgroundColor: "transparent",
          borderColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    },
    TabButton: {
      style: {
        borderRadius: "2px 2px 0 0",
        marginLeft: 1
      },
      state: {
        hover: {
          style: {
            backgroundColor: colors.hoverTabBackgroundColor
          },
          icon: {
            style: {
              color: "rgba(0, 0, 0, 0.9)",
              textShadow: "1px 1px 1px #999999"
            }
          },
          title: {
            style: {
              color: "rgba(0, 0, 0, 0.9)",
              textShadow: "1px 1px 1px #999999"
            }
          }
        }
      },
      mods: {
        active: {
          style: {
            borderColor: colors.activeTabBorderColor,
            backgroundColor: colors.activeTabBackgroundColor
          },
          state: {
            hover: {
              style: {
                backgroundColor: colors.activeTabBackgroundColor
              },
              icon: {
                style: {
                  color: colors.activeTabColor,
                  textShadow: "1px 1px 1px " + colors.activeTabTextShadow
                }
              },
              title: {
                style: {
                  color: colors.activeTabColor,
                  textShadow: "1px 1px 1px " + colors.activeTabTextShadow
                }
              }
            }
          },
          icon: {
            style: {
              color: colors.activeTabColor,
              textShadow: "1px 1px 1px " + colors.activeTabTextShadow
            }
          },
          title: {
            style: {
              color: colors.activeTabColor,
              textShadow: "1px 1px 1px " + colors.activeTabTextShadow
            }
          }
        }
      },
      icon: {
        style: {
          color: colors.tabColor,
          textShadow: "1px 1px 1px " + colors.tabTextShadow
        }
      },
      title: {
        style: {
          color: colors.tabColor,
          textShadow: "1px 1px 1px " + colors.tabTextShadow
        }
      }
    },
    Tab: {
      mods: {
        withToolbar: {
          content: {
            style: {
              backgroundColor: colors.contentBackgroundColorWithToolbar
            }
          }
        }
      },
      toolbar: {
        style: {
          backgroundColor: colors.activeTabBackgroundColor,
          borderBottom: "0 none",
          marginBottom: "1px",
          borderRadius: "2px",
          boxShadow: "0 -2px 0 " + colors.toolbarBoxShadow + " inset"
        }
      },
      content: {
        style: {
          backgroundColor: colors.activeTabBackgroundColor,
          borderBottom: "0 none",
          marginBottom: "1px",
          borderRadius: "2px"
        }
      },
      footer: {
        style: {
          backgroundColor: colors.footerBackgroundColor,
          borderRadius: "2px"
        }
      }
    },
    Button: {
      style: {
        borderRadius: "2px 2px 0 0",
        backgroundColor: colors.buttonBackgroundColor,
        marginLeft: "1px"
      },
      state: {
        hover: {
          style: {
            backgroundColor: colors.hoverButtonBackgroundColor
          },
          children: {
            style: {
              color: "rgba(0, 0, 0, 0.9)",
              textShadow: "1px 1px 1px #ffffff"
            }
          }
        }
      },
      mods: {
        active: {
          style: {
            backgroundColor: colors.activeButtonBackgroundColor
          }
        }
      },
      children: {
        style: {
          color: "#ffffff",
          textShadow: "1px 1px 1px rgba(0, 0, 0, 0.9)"
        }
      }
    }
  };
};


var buildStyle = function (opts) {
  opts = opts || {};
  opts = {
    theme: opts.theme || "base",
    skin: opts.skin || "default",
    headerHeight: opts.headerHeight || 32,
    headerFontSize: opts.headerFontSize || 14,
    borderRadius: opts.borderRadius || 3,
    maxTitleWidth: opts.maxTitleWidth || 130,
    useAvailableHeight: opts.useAvailableHeight || false,
    renderPanelBorder: (typeof opts.renderPanelBorder === "boolean") ? opts.renderPanelBorder : true,
    activeTabHeaderBorder: (typeof opts.activeTabHeaderBorder === "boolean") ? opts.activeTabHeaderBorder : true
  };

  var styles = {
    base: {
      PanelWrapper: {
        style: {},
        config: {
          autocompact: true
        }
      },
      Panel: {
        style: {
          height: (opts.useAvailableHeight) ? "100%" : "inherit"
        },
        header: {
          style: {
            display: "block",
            fontSize: Utils.pixelsOf(opts.headerFontSize),
            height: opts.headerHeight
          }
        },
        tabsStart: {
          style: {
            width: 20,
            height: "100%"
          }
        },
        tabsEnd: {
          style: {
            width: 20,
            height: "100%"
          }
        },
        tabs: {
          style: {
            height: opts.headerHeight,
            float: "right",
            display: "inline-block",
            margin: 0,
            minWidth: Utils.pixelsOf(opts.headerHeight),
            padding: 0
          }
        },
        icon: {
          style: {
            display: "block",
            float: "left",
            fontSize: "125%",
            height: opts.headerHeight,
            lineHeight: Utils.pixelsOf(opts.headerHeight - 4),
            marginRight: -6,
            textAlign: "center",
            width: opts.headerHeight - 2
          }
        },
        box: {
          style: {
            marginLeft: 10,
            height: "100%",
            display: "inline-block",
            position: "relative",
            maxWidth: Utils.pixelsOf(opts.maxTitleWidth)
          }
        },
        title: {
          style: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            letterSpacing: 0,
            lineHeight: Utils.pixelsOf(opts.headerHeight),
            width: "auto"
          }
        },
        group: {
          style: {
            padding: "0 5px",
            backgroundColor: "transparent"
          }
        },
        body: {
          style: {
            height: (opts.useAvailableHeight) ? "calc(100% - " + opts.headerHeight + "px)" : "inherit"
          }
        }
      },
      TabButton: {
        style: {
          position: "relative",
          float: "left",
          display: "block",
          listStyle: "none",
          padding: "0 5px",
          height: opts.headerHeight,
          fontSize: "0.95em",
          cursor: "pointer"
        },
        mods: {
          untitled: {
            box: {
              style: {
                marginLeft: 0
              }
            }
          },
          active: {
            style: {
              cursor: "default"
            }
          }
        },
        icon: {
          style: {
            display: "block",
            float: "left",
            fontSize: "125%",
            height: opts.headerHeight,
            textAlign: "center",
            width: opts.headerHeight - 2,
            lineHeight: Utils.pixelsOf(opts.headerHeight - 2),
            marginRight: -9,
            marginLeft: -3,
            opacity: 0.85
          }
        },
        box: {
          style: {
            lineHeight: Utils.pixelsOf(opts.headerHeight),
            marginRight: 6,
            opacity: 0.85,
            marginLeft: 10,
            height: "100%",
            display: "inline-block",
            position: "relative",
            maxWidth: Utils.pixelsOf(opts.maxTitleWidth)
          }
        },
        title: {
          style: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            letterSpacing: 0,
            lineHeight: Utils.pixelsOf(opts.headerHeight),
            width: "auto"
          }
        }
      },
      Tab: {
        style: {
          display: "none"
        },
        mods: {
          active: {
            style: {
              display: (opts.useAvailableHeight) ? "flex" : "block",
              minHeight: (opts.useAvailableHeight) ? "100%" : "inherit",
              flexDirection: (opts.useAvailableHeight) ? "column" : "inherit",
              height: "100%"
            },
            content: {
              style: (opts.useAvailableHeight) ? {
                flex: 1,
                position: "relative"
              } : {},
              children: {
                style: (opts.useAvailableHeight) ? {
                  padding: "10px",
                  position: "absolute",
                  height: "100%",
                  width: "100%"
                } : { }
              }
            }
          },
          withToolbar: {
            toolbar: {
              style: { }
            }
          }
        },
        toolbar: {
          style: {
            minHeight: Utils.pixelsOf(opts.headerHeight),
            lineHeight: Utils.pixelsOf(opts.headerHeight)
          },
          children: {
            style: {
              padding: "10px"
            }
          }
        },
        content: {
          style: { },
          children: {
            style: {
              padding: "10px"
            }
          }
        },
        footer: {
          style: {
            minHeight: Utils.pixelsOf(opts.headerHeight),
            lineHeight: Utils.pixelsOf(opts.headerHeight),
            padding: "10px"
          },
          children: {
            style: {}
          }
        }
      },
      Button: {
        style: {
          float: "right",
          height: Utils.pixelsOf(opts.headerHeight),
          minWidth: Utils.pixelsOf(opts.headerHeight),
          display: "inline-block",
          lineHeight: Utils.pixelsOf(opts.headerHeight),
          margin: 0,
          padding: 0,
          textAlign: "center",
          cursor: "pointer",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none"
        },
        mods: {
          disabled: {
            style: {
              cursor: "default",
              pointerEvents: "none",
              opacity: 0.5
            }
          },
          hidden: {
            style: {
              display: "none"
            }
          },
          highlighted: {
            style: {}
          }
        },
        children: {
          style: {}
        }
      }
    },
    /* THEME: Chemical */
    chemical: chemicalStyle,
    flexbox: flexboxStyle,
    flexbox2: flexbox2Style
  };

  var theme = (opts.theme != "base") ? styles[opts.theme](opts) : {};

  return Utils.merge(styles.base, theme);
};

var createSheet = (function (opts) {
  var _sheet = buildStyle(opts),
    _skin = {};

  return function (target, mods, alter) {
    var using = _sheet;

    mods = mods || [];
    alter = alter || {}
    if (alter.skin || false) {
      if (!(_skin[alter.skin] || false)) {
        _skin[alter.skin] = buildStyle(React.addons.update(opts, {$merge: {skin: alter.skin}}));
      }
      using = _skin[alter.skin];
    }
    if (!mods.length) return using[target];
    var sheet = React.addons.update(using[target], {$merge: {}}),
      i;
    for (i = 0; i < mods.length; ++i) {
      if ((sheet.mods || false) && (sheet.mods[mods[i]] || false)) {
        sheet = Utils.merge(sheet, sheet.mods[mods[i]]);
      }
    }
    return sheet;
  }
});


var Utils = {
  pixelsOf: function (value) {
    var val = parseInt(value) || 0
    return (val) ? String(val) + "px" : "0";
  },
  /* Copyright (c) 2012 Nicholas Fisher (MIT License) https://github.com/KyleAMathews/deepmerge */
  merge: function (target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {};

    if (array) {
      target = target || [];
      dst = dst.concat(target);
      src.forEach(function(e, i) {
        if (typeof dst[i] === 'undefined') {
          dst[i] = e;
        } else if (typeof e === 'object') {
          dst[i] = Utils.merge(target[i], e);
        } else {
          if (target.indexOf(e) === -1) {
            dst.push(e);
          }
        }
      });
    } else {
      if (target && typeof target === 'object') {
        Object.keys(target).forEach(function (key) {
          dst[key] = target[key];
        })
      }
      Object.keys(src).forEach(function (key) {
        if (typeof src[key] !== 'object' || !src[key]) {
          dst[key] = src[key];
        }
        else {
          if (!target[key]) {
            dst[key] = src[key];
          } else {
            dst[key] = Utils.merge(target[key], src[key]);
          }
        }
      });
    }

    return dst;
  }
};

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var Mixins = {
  Styleable: {
    getInitialState: function () {
      this.__ssv = {};
      this.__ssvh = false;
      this.__ssa = {target: '', mods: [], alter: {}};
      return {};
    },
    contextTypes: {
      sheet: React.PropTypes.func
    },
    getSheet: function (target, mods, alter) {
      var rebuild = false, i;

      mods = (typeof this['getSheetMods'] === "function") ? this['getSheetMods'](mods || []) : mods || [];
      alter = alter || {}
      if (target != this.__ssa.target) rebuild = true;
      else {
        if (mods.length != this.__ssa.mods.length) rebuild = true;
        else if (mods.length != 0) {
          for (i = mods.length; --i >= 0;) {
            if (this.__ssa.mods.indexOf(mods[i]) == -1) {
              rebuild = true;
              break;
            }
          }
        }
        // TODO: check if alter has changed
      }

      if (rebuild) {
        this.__ssv = this.context.sheet(target, mods, alter);
        this.__ssvh = false;
        this.__ssa = {
          target: target,
          mods: Utils.merge(mods, []),
          alter: Utils.merge(alter, {})
        };
      }
      if ((typeof this.state._hover === "boolean")) {
        if (this.state._hover) {
          if (this.__ssvh || false) {
            return this.__ssvh;
          }
          if ((this.__ssv.state || false) && (this.__ssv.state.hover || false)) {
            this.__ssvh = Utils.merge(this.__ssv, this.__ssv.state.hover);
            return this.__ssvh;
          }
        }
      }

      return this.__ssv;
    }
  },
  Transitions: {
    propTypes: {
      transitionName: React.PropTypes.string,
      transitionEnter: React.PropTypes.bool,
      transitionLeave: React.PropTypes.bool,
      transitionAppear: React.PropTypes.bool
    },
    getTransitionProps: function (pcType) {
      pcType = pcType || this.props.panelComponentType;

      var props = {},
        globals = (this.context && this.context.globals && this.context.globals[pcType]) ?
          this.context.globals[pcType] : {},
        transitionName = (typeof this.props.transitionName === "string") ?
          this.props.transitionName : globals.transitionName || "";
      if (transitionName.length) {
        props = {
          transitionName: transitionName,
          transitionEnter: (typeof this.props.transitionEnter === "boolean") ?
            this.props.transitionEnter : globals.transitionEnter || false,
          transitionLeave: (typeof this.props.transitionLeave === "boolean") ?
            this.props.transitionLeave : globals.transitionLeave || false,
          transitionAppear: (typeof this.props.transitionAppear === "boolean") ?
            this.props.transitionAppear : globals.transitionAppear || false
        };
      } else {
        props = {
          transitionName: "none",
          transitionEnter: false,
          transitionLeave: false,
          transitionAppear: false
        };
      }
      return props;
    }
  },
  Toolbar: {
    getDefaultProps: function () {
      return {
        panelComponentType: "Toolbar"
      };
    }
  },
  Content: {
    getDefaultProps: function () {
      return {
        panelComponentType: "Content"
      };
    }
  },
  Footer: {
    getDefaultProps: function () {
      return {
        panelComponentType: "Footer"
      };
    }
  }
};

Mixins.StyleableWithEvents = {
  mixins: [Mixins.Styleable],

  getDefaultProps: function () {
    return {
      onMouseEnter: false,
      onMouseLeave: false
    };
  },

  getInitialState: function () {
    this.listeners = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    };
    return {
      _hover: false,
      _focus: false
    };
  },

  handleMouseEnter: function (ev) {
    if (typeof this.props['onMouseEnter'] === "function") this.props['onMouseEnter'](ev);

    this.setState({
      _hover: true
    });
  },

  handleMouseLeave: function (ev) {
    if (typeof this.props['onMouseLeave'] === "function") this.props['onMouseLeave'](ev);

    this.setState({
      _hover: false
    });
  }

};

Mixins.PanelWrapper = {

  propTypes: {
    transitionName: React.PropTypes.string,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool,
    transitionAppear: React.PropTypes.bool,
    globals: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      "icon": false,
      "title": "",
      "selectedIndex": 0,
      /** Triggered before a change tab event propagated from within the Panel (e.g., user's click).
       *  Optionally, return false to stop it.
       */
      "onTabChange": null,
      "buttons": [],
      "leftButtons": [],
      "globals": {}
    };
  },

  getInitialState: function () {
    var opts = {
      theme: this.props.theme,
      skin: this.props.skin,
      headerHeight: this.props.headerHeight,
      headerFontSize: this.props.headerFontSize,
      borderRadius: this.props.borderRadius,
      maxTitleWidth: this.props.maxTitleWidth,
      useAvailableHeight: this.props.useAvailableHeight,
      renderPanelBorder: this.props.renderPanelBorder,
      activeTabHeaderBorder: this.props.activeTabHeaderBorder
    };
    this._sheet = createSheet(opts);
    this.config = this._sheet("PanelWrapper").config;

    return {
      selectedIndex: parseInt(this.props.selectedIndex)
    };
  },

  childContextTypes: {
    selectedIndex: React.PropTypes.number,
    sheet: React.PropTypes.func,
    onTabChange: React.PropTypes.func,
    globals: React.PropTypes.object,
    numTabs: React.PropTypes.number
  },

  getChildContext: function () {
    return {
      selectedIndex: this.state.selectedIndex,
      sheet: this._sheet,
      onTabChange: this.handleTabChange,
      globals: this.props.globals,
      numTabs: React.Children.count(this.props.children)
    };
  },

  handleTabChange: function (index) {
    if (typeof this.props.onTabChange === "function") {
      if (this.props.onTabChange(index, this) !== false) {
        this.setSelectedIndex(index);
      }
    } else {
      this.setSelectedIndex(index);
    }
  },

  getSelectedIndex: function () {
    return this.state.selectedIndex;
  },

  setSelectedIndex: function (index, callback) {
    this.setState({selectedIndex: parseInt(index)});
    this.forceUpdate(function () {
      if (typeof callback === "function") {
        callback();
      }
    });
  },

  componentWillReceiveProps: function (nextProps) {
    var sIndex = this.state.selectedIndex,
      resetIndex = false,
      numTabs = React.Children.count(nextProps.children);

    if (nextProps.selectedIndex != this.props.selectedIndex) {
      sIndex = nextProps.selectedIndex;
      resetIndex = true;
    }
    if (sIndex >= numTabs) {
      sIndex = Math.max(numTabs - 1, 0);
      resetIndex = true;
    }
    if (resetIndex) {
      this.setState({selectedIndex: parseInt(sIndex)});
    }
  }

};

Mixins.TabWrapper = {
  observedProps: ['selectedIndex', 'index'],

  propTypes: {
    tabKey: React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      panelComponentType: "TabWrapper",
      icon: "",
      title: "",
      pinned: false,
      showToolbar: true,
      showFooter: true
    };
  },

  childContextTypes: {
    index: React.PropTypes.number,
    tabKey: React.PropTypes.any
  },

  getChildContext: function () {
    return {
      index: this.props.index,
      tabKey: this.props.tabKey
    };
  },

  contextTypes: {
    selectedIndex: React.PropTypes.number
  }

};

Mixins.Button = {
  mixins: [Mixins.StyleableWithEvents],

  getDefaultProps: function () {
    return {
      name: "default",
      title: "",
      visible: true,
      enabled: true,
      active: false,
      highlighted: false,
      onClick: false,
      onDoubleClick: false,
      onContextMenu: false,
      onChange: false
    };
  },

  getInitialState: function () {
    this.listeners.onClick = this._handleClick;
    this.listeners.onDoubleClick = this._handleDoubleClick;
    this.listeners.onContextMenu = this._handleContextMenu;
    return {
      visible: this.props.visible,
      enabled: this.props.enabled,
      active: this.props.active,
      highlighted: this.props.highlighted
    };
  },

  childContextTypes: {
    btnTitle: React.PropTypes.string,
    btnVisible: React.PropTypes.bool,
    btnEnabled: React.PropTypes.bool,
    btnActive: React.PropTypes.bool
  },

  getChildContext: function () {
    return {
      btnTitle: this.props.title,
      btnVisible: this.state.visible,
      btnEnabled: this.state.enabled,
      btnActive: this.state.active
    };
  },

  contextTypes: {
    selectedIndex: React.PropTypes.number
  },

  getSheetMods: function (otherMods) {
    var mods = otherMods || [];   //np
    if (this.state.active && mods.indexOf('active') == -1) mods.push('active');
    if (!this.state.visible && mods.indexOf('hidden') == -1) mods.push('hidden');
    if (!this.state.enabled && mods.indexOf('disabled') == -1) mods.push('disabled');
    if (this.state.highlighted && mods.indexOf('highlighted') == -1) mods.push('highlighted');

    return mods;
  },

  _handleDoubleClick: function (ev) {
    if (typeof this.props.onDoubleClick === "function" && this.props.onDoubleClick(ev, this) === false) return;

    if (typeof this['handleDoubleClick'] === "function") {
      return this['handleDoubleClick'](ev);
    }
  },

  _handleClick: function (ev) {
    if (typeof this.props.onClick === "function" && this.props.onClick(ev, this) === false) return;

    if (typeof this['handleClick'] === "function") {
      return this['handleClick'](ev);
    }
  },

  _handleContextMenu: function (ev) {
    if (typeof this.props.onContextMenu === "function" && this.props.onContextMenu(ev, this) === false) return;

    if (typeof this['handleContextMenu'] === "function") {
      return this['handleContextMenu'](ev);
    }
  }

};


var FloatingPanel = React.createClass({
  displayName: 'FloatingPanel',
  mixins: [Mixins.PanelWrapper],

  getDefaultProps: function () {
    return {
      "left": 0,
      "top": 0,
      "width": 420,
      "maxHeight":420,
      "style": {}
    };
  },
  propTypes: {
    left:React.PropTypes.number.isRequired,
    top:React.PropTypes.number.isRequired,
    width:React.PropTypes.number.isRequired,
    onClick:React.PropTypes.func,
  }
  ,getInitialState: function () {
    this.skipUpdate = false;
    return {
      left: parseInt(this.props.left),
      top: parseInt(this.props.top),
      width: parseInt(this.props.width)
    };
  },

  componentWillReceiveProps:function(nextProps) {
    this.setState({width:nextProps.width});
  }
  ,dragStart: function (e) {
    this.panelBounds = {
      startLeft: this.state.left,
      startTop: this.state.top,
      startPageX: e.pageX,
      startPageY: e.pageY
    };

    try {
      var img = document.createElement("img");
      img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAADUlEQVQI12NgYGBgAAAABQABXvMqOgAAAABJRU5ErkJggg==";
      img.width = 1;
      e.dataTransfer.setData('text/plain', "Panel");
      e.dataTransfer.setDragImage(img, -1000, -1000);
    } catch (err) { /* Fix for IE */ }

    window.addEventListener('dragover', this.dragOver);
  },

  dragEnd: function() {
    delete this.panelBounds;
    window.removeEventListener('dragover', this.dragOver);
    if (this.props.onBoundsChange) {
      this.props.onBoundsChange({left:this.state.left,top:this.state.top,width:this.state.width,
        height:this.getDOMNode().offsetHeight});
    }
  },

  dragOver: function(e) {
    if (this.panelBounds || false) {
      var left = this.panelBounds.startLeft + (e.pageX - this.panelBounds.startPageX),
        top = this.panelBounds.startTop + (e.pageY - this.panelBounds.startPageY);
      this.skipUpdate = true;
      this.setState({ left: left, top: top });
    }
  },
  handleMouseClick: function (e) {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(e);
    }
  },
  render: function() {
    var transform = "translate3d(" + Utils.pixelsOf(this.state.left) + ", " + Utils.pixelsOf(this.state.top) + ", 0)",
      wrapperStyle = React.addons.update({
        WebkitTransform: transform,
        MozTransform: transform,
        msTransform: transform,
        transform: transform,
        width: Utils.pixelsOf(this.state.width),
        position: "absolute"
      }, {$merge: this.props.style});

    if (!this.skipUpdate) {
      var props = React.addons.update({
          onDragStart: this.dragStart,
          onDragEnd: this.dragEnd,
          floating: true
        }, {$merge: this.config}),
        keys = Object.keys(this.props);

      for (var i = keys.length; --i >= 0;) {
        if (["children", "left", "top", "width", "style"].indexOf(keys[i]) != -1) continue;
        props[keys[i]] = this.props[keys[i]];
      }
      this.inner = (
        React.createElement(ReactPanel, props,
          this.props.children
        )
      );
    } else {
      this.skipUpdate = false;
    }

    return React.createElement("div", {style:wrapperStyle,onClick:this.handleMouseClick}, this.inner);
  }

});

var Panel = React.createClass({
  displayName: 'Panel',
  mixins: [Mixins.PanelWrapper],

  render: function() {
    var props = React.addons.update({}, {$merge: this.config}),
      keys = Object.keys(this.props);

    for (var i = keys.length; --i >= 0;) {
      if (["children"].indexOf(keys[i]) != -1) continue;
      props[keys[i]] = this.props[keys[i]];
    }
    return React.createElement(ReactPanel, props,
        this.props.children
    );
  }

});

var ReactPanel = React.createClass({
  displayName: 'ReactPanel',
  mixins: [Mixins.Styleable, Mixins.Transitions],

  getDefaultProps: function () {
    return {
      "icon": false,
      "title": "",
      "autocompact": true,
      "floating": false,
      "onDragStart": null,
      "onDragEnd": null,
      "maxTitleWidth": 130,
      "buttons": [],
      "leftButtons": []
    };
  },

  getInitialState: function () {
    return {
      compacted: (this.props.autocompact)
    };
  },

  contextTypes: {
    selectedIndex: React.PropTypes.number,
    sheet: React.PropTypes.func,
    onTabChange: React.PropTypes.func,
    globals: React.PropTypes.object
  },

  getSelectedIndex: function () {
    return this.context.selectedIndex;
  },

  handleClick: function (event, index) {
    this.context.onTabChange(parseInt(index));
  },

  componentDidMount: function () {
    if (this.props.autocompact) {
      var tabsStart = this.refs['tabs-start'].getDOMNode(),
        tabsEnd = this.refs['tabs-end'].getDOMNode(),
        using = this.refs.tabs.getDOMNode().offsetWidth,
        total = tabsEnd.offsetLeft - (tabsStart.offsetLeft + tabsStart.offsetWidth);

      if (using * 2 <= total) {   // TODO: ... * 2 is obviously not what it should be
        this.setState({compacted: false});
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.autocompact) {
      var childs = React.Children.count(this.props.children),
        next_childs = React.Children.count(nextProps.children);

      if (next_childs > childs && this.props.autocompact && !this.state.compacted) {
        var tabsStart = this.refs['tabs-start'].getDOMNode(),
          tabsEnd = this.refs['tabs-end'].getDOMNode(),
          using = this.refs.tabs.getDOMNode().offsetWidth,
          total = tabsEnd.offsetLeft - (tabsStart.offsetLeft + tabsStart.offsetWidth),
          maxTabWidth = this.props.maxTitleWidth + 35;

        if (using + maxTabWidth >= total) {
          this.setState({compacted: true});
        }
      } else {
        // TODO
      }
    }
  },

  handleDragStart: function (e) {
    if (typeof this.props.onDragStart === "function") {
      this.props.onDragStart(e);
    }
  },

  handleDragEnd: function () {
    if (typeof this.props.onDragEnd === "function") {
      this.props.onDragEnd();
    }
  },

  _getGroupedButtons: function (buttons) {
    var len = buttons.length,
      i, j, item, group = [], groups = [];

    for (i = 0; i < len; ++i) {
      item = buttons[i];

      if (typeof item === "object" && item instanceof Array) {
        if (group.length) {
          groups.push(group);
          group = [];
        }
        for (j = 0; j < item.length; ++j) {
          group.push(React.addons.cloneWithProps(item[j], {key: j}));
        }
        if (group.length) {
          groups.push(group);
          group = [];
        }
      } else {
        group.push(React.addons.cloneWithProps(item, {key: i}));
      }
    }
    if (group.length) {
      groups.push(group);
    }

    return groups;
  },

  render: function() {
    var self = this,
      draggable = (this.props.floating) ? "true" : "false",
      sheet = this.getSheet("Panel"),
      tp = this.getTransitionProps("Panel");

    var icon = (this.props.icon) ? (
        React.createElement("span", {style:sheet.icon.style},
          React.createElement("i", {className:this.props.icon})
        )
      ) : null,
      title = (this.props.title.length) ? (
        React.createElement("div", {style:sheet.box.style},
          React.createElement("div", {style:sheet.title.style},
            this.props.title
          )
        )
      ) : null;

    var tabIndex = 0,
      selectedIndex = this.getSelectedIndex(),
      tabButtons = [],
      tabs = [],
      groupIndex = 0;

    React.Children.forEach(self.props.children, function(child) {
      var ref = "tabb-" + tabIndex,
        tabKey = (typeof child.key !== "undefined" && child.key != null) ? child.key : ref,
        showTitle = true,
        props = {
          "icon": child.props.icon,
          "title": child.props.title,
          "pinned": child.props.pinned
        };

      if (self.state.compacted) {
        if (!(props.pinned || selectedIndex == tabIndex)) {
          showTitle = false;
        }
      }

      tabButtons.push(
        React.createElement(TabButton, {key: tabKey, title: props.title, icon: props.icon,
          index: tabIndex, ref: ref, showTitle: showTitle, onClick: self.handleClick})
      );

      tabs.push(
        React.addons.cloneWithProps(child, {
          key: tabIndex,
          tabKey: tabKey,
          selectedIndex: selectedIndex,
          index: tabIndex
        })
      );
      ++tabIndex;
    });

    return (
      React.createElement("div", {style: sheet.style},
        React.createElement("header", {draggable: draggable, onDragEnd: self.handleDragEnd,
            onDragStart: self.handleDragStart, ref: "header", style: sheet.header.style},
          icon, title,
          React.createElement("div", {style: sheet.tabsStart.style, ref: "tabs-start"}),
          this._getGroupedButtons(this.props.leftButtons).map(function (group) {
            return React.createElement("ul", {style: sheet.group.style, key: groupIndex++}, group );
          })
          ,
          React.createElement(ReactCSSTransitionGroup, {component: "ul", ref: "tabs", style: sheet.tabs.style, transitionName: tp.transitionName,
              transitionAppear: tp.transitionAppear, transitionEnter: tp.transitionEnter,
              transitionLeave: tp.transitionLeave},
            tabButtons
          ),
          React.createElement("div", {style: sheet.tabsEnd.style, ref: "tabs-end"}),
          this._getGroupedButtons(this.props.rightButtons||this.props.buttons).map(function (group) {
            return React.createElement("ul", {style: sheet.group.style, key: groupIndex++}, group );
          })
        ),
        React.createElement("div", {style: sheet.body.style}, tabs )
      )
    );
  }

});


var TabButton = React.createClass({displayName: "TabButton",
  mixins: [Mixins.StyleableWithEvents],

  getDefaultProps: function () {
    return {
      "icon": "",
      "title": "",
      "index": 0,
      "showTitle": true
    };
  },

  contextTypes: {
    selectedIndex: React.PropTypes.number,
    numTabs: React.PropTypes.number
  },

  handleClick: function (event) {
    event.preventDefault();
    this.props.onClick(event, this.props.index);
  },

  render: function() {
    var icon = null,
      title = "",
      mods = (this.context.selectedIndex == this.props.index) ? ['active'] : [];

    if (!(this.props.showTitle && this.props.title.length)) mods.push('untitled');
    if (this.props.index == this.context.numTabs - 1) mods.push('last');
    var sheet = this.getSheet("TabButton", mods, {});

    if (this.props.showTitle && this.props.title.length) {
      title = React.createElement("div", {style:sheet.title.style},this.props.title);
    }

    if (this.props.icon) {
      icon = (
        React.createElement("div", {style:sheet.icon.style},
          React.createElement("i", {className:this.props.icon})
        )
      );
    }

    return (
      React.createElement("li", React.__spread({onClick: this.handleClick, style: sheet.style},  this.listeners),
        React.createElement("div", {title: this.props.title},
          icon, React.createElement("div", {style: sheet.box.style}, title)
        )
      )
    );
  }
});

var Tab = React.createClass({
  displayName: 'Tab',
  mixins: [Mixins.Styleable, Mixins.Transitions],

  propTypes: {
    onActiveChanged: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      "icon": "",
      "title": "",
      "pinned": false,
      "showToolbar": true,
      "showFooter": true,
      "panelComponentType": "Tab",
      "automount": false
    };
  },

  contextTypes: {
    selectedIndex: React.PropTypes.number,
    index: React.PropTypes.number,
    globals: React.PropTypes.object
  },

  componentDidMount: function () {
    this._doEvents();
  },

  componentDidUpdate: function () {
    this._doEvents();
  },

  _doEvents: function () {
    if (typeof this.props.onActiveChanged === "function") {
      this.wasActive = this.wasActive || false;
      var active = this.isActive();
      if (this.wasActive != active) {
        this.props.onActiveChanged(this, active);
        this.wasActive = active;
      }
    }
  },

  getValue: function (name) {
    switch (name) {
      case "index":
        return (typeof this.props.index !== "undefined") ? this.props.index : this.context.index;
      case "selectedIndex":
        return this.context.selectedIndex;
      case "showToolbar":
        return this.props.showToolbar;
      case "showFooter":
        return this.props.showFooter;
      case "active":
        return this.isActive();
      case "hasToolbar":
        return this.hasToolbar || false;
      case "hasFooter":
        return this.hasFooter || false;
      case "mounted":
        return this.mounted || false;
      case "automount":
        return this.props.automount;
      case "numChilds":
        return React.Children.count(this.props.children);
      case "tabKey":
        return (typeof this.props.tabKey !== "undefined") ? this.props.tabKey : this.context.tabKey;
    }
  },

  isActive: function () {
    if (typeof this.props.index !== "undefined") {
      return (this.props.index == this.context.selectedIndex);
    } else {
      return (this.context.index == this.context.selectedIndex);
    }
  },

  render: function() {
    var self = this,
      numChilds = React.Children.count(this.props.children),
      active = this.isActive(),
      tp = this.getTransitionProps(),
      mods = (active) ? ['active'] : [],
      sheet = {};

    this.mounted = (this.mounted || false) || this.props.automount || active;
    this.hasToolbar=this.hasFooter=false;

    var innerContent = (this.mounted) ? React.Children.map(self.props.children, function(child, i) {
      var type = (i == 0 && numChilds >= 2) ? 0 : 1;   // 0: Toolbar, 1: Content, 2: Footer
      if (React.isValidElement(child) && (typeof child.props.panelComponentType !== "undefined")) {
        switch (String(child.props.panelComponentType)) {
          case "Toolbar": type = 0; break;
          case "Content": type = 1; break;
          case "Footer": type = 2; break;
        }
      }
      if (i == 0) {
        if (type == 0) {
          this.hasToolbar = true;
          if (self.props.showToolbar) mods.push('withToolbar');
        }
        sheet = self.getSheet("Tab", mods);
      }
      if (i == self.props.children.length-1) {
        if (type == 2) {
          this.hasFooter = true;
          if (self.props.showFooter) mods.push('withFooter');
        }
      }
      switch (type) {
        case 0:
          return (self.props.showToolbar) ? (
            React.createElement("div", {key: i, style: sheet.toolbar.style},
              React.createElement("div", {className: "tab-toolbar", style: sheet.toolbar.children.style},
                child
              )
            )
          ) : null;
        case 1:
          var contentStyle = React.addons.update({
            overflowY: this.props.maxContentHeight?"auto":"hidden",
            overflowX:"hidden",
            maxHeight : this.props.maxContentHeight || "none",
          }, {$merge: sheet.content.style});

          return (
            React.createElement("div", {key: i, style: contentStyle},
              React.createElement("div", {className: "tab-content", style: sheet.content.children.style},
                child
              )
            )
          );
        case 2:
          return (self.props.showFooter) ? (
            React.createElement("div", {key: i, style: sheet.footer.style},
              React.createElement("div", {className: "tab-footer", style: sheet.footer.children.style},
                child
              )
            )
          ) : null;
      }
    }.bind(this)) : null;

    return (
      React.createElement(ReactCSSTransitionGroup, {component: "div", style: sheet.style, transitionName: tp.transitionName,
          transitionAppear: tp.transitionAppear && active, transitionEnter: tp.transitionEnter && active,
          transitionLeave: tp.transitionLeave && active},
        innerContent
      )
    );

  }

});


var ToggleButton = React.createClass({
  displayName: 'ToggleButton',
  mixins: [Mixins.Button],

  handleClick: function (ev) {
    var self = this;

    this.setState({active: !this.state.active});
    this.forceUpdate(function () {
      if (typeof self.props.onChange === "function") {
        self.props.onChange(this);
      }
    });
  },

  render: function () {
    var sheet = this.getSheet('Button');

    //JSX source: https://github.com/Theadd/react-panels/blob/v2/src/jsx/buttons.jsx#L21-L25
    return (
      React.createElement("li", React.__spread({style: sheet.style},  this.listeners, {title: this.props.title}),
        React.createElement("span", {style: sheet.children.style},
          this.props.children
        )
      )
    );
  }
});

var Button = React.createClass({
  displayName: 'Button',
  mixins: [Mixins.Button],

  propTypes: {
    onButtonClick: React.PropTypes.func
  },

  handleClick: function (ev) {
    if (typeof this.props.onButtonClick === "function") {
      this.props.onButtonClick(this, ev);
    }
  },

  render: function () {
    var sheet = this.getSheet('Button');

    return (
      React.createElement("li", React.__spread({style: sheet.style},  this.listeners, {title: this.props.title}),
        React.createElement("span", {style: sheet.children.style},
          this.props.children
        )
      )
    );
  }
});


var Toolbar = React.createClass({
  displayName: 'Toolbar',
  mixins: [Mixins.Toolbar],

  render: function () {
    return React.createElement("div", {}, this.props.children );
  }

});

var Content = React.createClass({
  displayName: 'Content',
  mixins: [Mixins.Content],

  render: function () {
    return React.createElement("div", {}, this.props.children );
  }

});

var Footer = React.createClass({
  displayName: 'Footer',
  mixins: [Mixins.Footer],

  render: function () {
    return React.createElement("div", {}, this.props.children );
  }

});

var PanelAddons = {};

var ReactPanels = {
  Panel: Panel,
  FloatingPanel: FloatingPanel,
  ReactPanel: ReactPanel,
  Tab: Tab,
  Mixins: Mixins,
  Toolbar: Toolbar,
  Content: Content,
  Footer: Footer,
  ToggleButton: ToggleButton,
  Button: Button,
  addons: PanelAddons
};


module.exports = ReactPanels;

},{"react/addons":"react/addons"}],"C:\\ksana2015\\node_modules\\reflux\\index.js":[function(require,module,exports){
module.exports = require('./src');

},{"./src":"C:\\ksana2015\\node_modules\\reflux\\src\\index.js"}],"C:\\ksana2015\\node_modules\\reflux\\node_modules\\eventemitter3\\index.js":[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],"C:\\ksana2015\\node_modules\\reflux\\node_modules\\native-promise-only\\npo.js":[function(require,module,exports){
/*! Native Promise Only
    v0.7.6-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u,a=this;if(!a.triggered){a.triggered=!0,a.def&&(a=a.def);try{(c=n(o))?(u=new f(a),c.call(o,function(){r.apply(u,arguments)},function(){i.apply(u,arguments)})):(a.msg=o,a.state=1,a.chain.length>0&&t(e,a))}catch(s){i.call(u||new f(a),s)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return s(a,"prototype",g,!1),s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

},{}],"C:\\ksana2015\\node_modules\\reflux\\src\\ActionMethods.js":[function(require,module,exports){
/**
 * A module of methods that you want to include in all actions.
 * This module is consumed by `createAction`.
 */
module.exports = {
};

},{}],"C:\\ksana2015\\node_modules\\reflux\\src\\Keep.js":[function(require,module,exports){
exports.createdStores = [];

exports.createdActions = [];

exports.reset = function() {
    while(exports.createdStores.length) {
        exports.createdStores.pop();
    }
    while(exports.createdActions.length) {
        exports.createdActions.pop();
    }
};

},{}],"C:\\ksana2015\\node_modules\\reflux\\src\\ListenerMethods.js":[function(require,module,exports){
var _ = require('./utils'),
    maker = require('./joins').instanceJoinCreator;

/**
 * Extract child listenables from a parent from their
 * children property and return them in a keyed Object
 *
 * @param {Object} listenable The parent listenable
 */
var mapChildListenables = function(listenable) {
    var i = 0, children = {}, childName;
    for (;i < (listenable.children||[]).length; ++i) {
        childName = listenable.children[i];
        if(listenable[childName]){
            children[childName] = listenable[childName];
        }
    }
    return children;
};

/**
 * Make a flat dictionary of all listenables including their
 * possible children (recursively), concatenating names in camelCase.
 *
 * @param {Object} listenables The top-level listenables
 */
var flattenListenables = function(listenables) {
    var flattened = {};
    for(var key in listenables){
        var listenable = listenables[key];
        var childMap = mapChildListenables(listenable);

        // recursively flatten children
        var children = flattenListenables(childMap);

        // add the primary listenable and chilren
        flattened[key] = listenable;
        for(var childKey in children){
            var childListenable = children[childKey];
            flattened[key + _.capitalize(childKey)] = childListenable;
        }
    }

    return flattened;
};

/**
 * A module of methods related to listening.
 */
module.exports = {

    /**
     * An internal utility function used by `validateListening`
     *
     * @param {Action|Store} listenable The listenable we want to search for
     * @returns {Boolean} The result of a recursive search among `this.subscriptions`
     */
    hasListener: function(listenable) {
        var i = 0, j, listener, listenables;
        for (;i < (this.subscriptions||[]).length; ++i) {
            listenables = [].concat(this.subscriptions[i].listenable);
            for (j = 0; j < listenables.length; j++){
                listener = listenables[j];
                if (listener === listenable || listener.hasListener && listener.hasListener(listenable)) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * A convenience method that listens to all listenables in the given object.
     *
     * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
     */
    listenToMany: function(listenables){
        var allListenables = flattenListenables(listenables);
        for(var key in allListenables){
            var cbname = _.callbackName(key),
                localname = this[cbname] ? cbname : this[key] ? key : undefined;
            if (localname){
                this.listenTo(allListenables[key],localname,this[cbname+"Default"]||this[localname+"Default"]||localname);
            }
        }
    },

    /**
     * Checks if the current context can listen to the supplied listenable
     *
     * @param {Action|Store} listenable An Action or Store that should be
     *  listened to.
     * @returns {String|Undefined} An error message, or undefined if there was no problem.
     */
    validateListening: function(listenable){
        if (listenable === this) {
            return "Listener is not able to listen to itself";
        }
        if (!_.isFunction(listenable.listen)) {
            return listenable + " is missing a listen method";
        }
        if (listenable.hasListener && listenable.hasListener(this)) {
            return "Listener cannot listen to this listenable because of circular loop";
        }
    },

    /**
     * Sets up a subscription to the given listenable for the context object
     *
     * @param {Action|Store} listenable An Action or Store that should be
     *  listened to.
     * @param {Function|String} callback The callback to register as event handler
     * @param {Function|String} defaultCallback The callback to register as default handler
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
     */
    listenTo: function(listenable, callback, defaultCallback) {
        var desub, unsubscriber, subscriptionobj, subs = this.subscriptions = this.subscriptions || [];
        _.throwIf(this.validateListening(listenable));
        this.fetchInitialState(listenable, defaultCallback);
        desub = listenable.listen(this[callback]||callback, this);
        unsubscriber = function() {
            var index = subs.indexOf(subscriptionobj);
            _.throwIf(index === -1,'Tried to remove listen already gone from subscriptions list!');
            subs.splice(index, 1);
            desub();
        };
        subscriptionobj = {
            stop: unsubscriber,
            listenable: listenable
        };
        subs.push(subscriptionobj);
        return subscriptionobj;
    },

    /**
     * Stops listening to a single listenable
     *
     * @param {Action|Store} listenable The action or store we no longer want to listen to
     * @returns {Boolean} True if a subscription was found and removed, otherwise false.
     */
    stopListeningTo: function(listenable){
        var sub, i = 0, subs = this.subscriptions || [];
        for(;i < subs.length; i++){
            sub = subs[i];
            if (sub.listenable === listenable){
                sub.stop();
                _.throwIf(subs.indexOf(sub)!==-1,'Failed to remove listen from subscriptions list!');
                return true;
            }
        }
        return false;
    },

    /**
     * Stops all subscriptions and empties subscriptions array
     */
    stopListeningToAll: function(){
        var remaining, subs = this.subscriptions || [];
        while((remaining=subs.length)){
            subs[0].stop();
            _.throwIf(subs.length!==remaining-1,'Failed to remove listen from subscriptions list!');
        }
    },

    /**
     * Used in `listenTo`. Fetches initial data from a publisher if it has a `getInitialState` method.
     * @param {Action|Store} listenable The publisher we want to get initial state from
     * @param {Function|String} defaultCallback The method to receive the data
     */
    fetchInitialState: function (listenable, defaultCallback) {
        defaultCallback = (defaultCallback && this[defaultCallback]) || defaultCallback;
        var me = this;
        if (_.isFunction(defaultCallback) && _.isFunction(listenable.getInitialState)) {
            var data = listenable.getInitialState();
            if (data && _.isFunction(data.then)) {
                data.then(function() {
                    defaultCallback.apply(me, arguments);
                });
            } else {
                defaultCallback.call(this, data);
            }
        }
    },

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with the last emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinTrailing: maker("last"),

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with the first emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinLeading: maker("first"),

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with all emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinConcat: maker("all"),

    /**
     * The callback will be called once all listenables have triggered.
     * If a callback triggers twice before that happens, an error is thrown.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinStrict: maker("strict")
};

},{"./joins":"C:\\ksana2015\\node_modules\\reflux\\src\\joins.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\ListenerMixin.js":[function(require,module,exports){
var _ = require('./utils'),
    ListenerMethods = require('./ListenerMethods');

/**
 * A module meant to be consumed as a mixin by a React component. Supplies the methods from
 * `ListenerMethods` mixin and takes care of teardown of subscriptions.
 * Note that if you're using the `connect` mixin you don't need this mixin, as connect will
 * import everything this mixin contains!
 */
module.exports = _.extend({

    /**
     * Cleans up all listener previously registered.
     */
    componentWillUnmount: ListenerMethods.stopListeningToAll

}, ListenerMethods);

},{"./ListenerMethods":"C:\\ksana2015\\node_modules\\reflux\\src\\ListenerMethods.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\PublisherMethods.js":[function(require,module,exports){
var _ = require('./utils');

/**
 * A module of methods for object that you want to be able to listen to.
 * This module is consumed by `createStore` and `createAction`
 */
module.exports = {

    /**
     * Hook used by the publisher that is invoked before emitting
     * and before `shouldEmit`. The arguments are the ones that the action
     * is invoked with. If this function returns something other than
     * undefined, that will be passed on as arguments for shouldEmit and
     * emission.
     */
    preEmit: function() {},

    /**
     * Hook used by the publisher after `preEmit` to determine if the
     * event should be emitted with given arguments. This may be overridden
     * in your application, default implementation always returns true.
     *
     * @returns {Boolean} true if event should be emitted
     */
    shouldEmit: function() { return true; },

    /**
     * Subscribes the given callback for action triggered
     *
     * @param {Function} callback The callback to register as event handler
     * @param {Mixed} [optional] bindContext The context to bind the callback with
     * @returns {Function} Callback that unsubscribes the registered event handler
     */
    listen: function(callback, bindContext) {
        bindContext = bindContext || this;
        var eventHandler = function(args) {
            if (aborted){
                return;
            }
            callback.apply(bindContext, args);
        }, me = this, aborted = false;
        this.emitter.addListener(this.eventLabel, eventHandler);
        return function() {
            aborted = true;
            me.emitter.removeListener(me.eventLabel, eventHandler);
        };
    },

    /**
     * Attach handlers to promise that trigger the completed and failed
     * child publishers, if available.
     *
     * @param {Object} The promise to attach to
     */
    promise: function(promise) {
        var me = this;

        var canHandlePromise =
            this.children.indexOf('completed') >= 0 &&
            this.children.indexOf('failed') >= 0;

        if (!canHandlePromise){
            throw new Error('Publisher must have "completed" and "failed" child publishers');
        }

        promise.then(function(response) {
            return me.completed(response);
        }, function(error) {
            return me.failed(error);
        });
    },

    /**
     * Subscribes the given callback for action triggered, which should
     * return a promise that in turn is passed to `this.promise`
     *
     * @param {Function} callback The callback to register as event handler
     */
    listenAndPromise: function(callback, bindContext) {
        var me = this;
        bindContext = bindContext || this;
        this.willCallPromise = (this.willCallPromise || 0) + 1;

        var removeListen = this.listen(function() {

            if (!callback) {
                throw new Error('Expected a function returning a promise but got ' + callback);
            }

            var args = arguments,
                promise = callback.apply(bindContext, args);
            return me.promise.call(me, promise);
        }, bindContext);

        return function () {
          me.willCallPromise--;
          removeListen.call(me);
        };

    },

    /**
     * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
     */
    trigger: function() {
        var args = arguments,
            pre = this.preEmit.apply(this, args);
        args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
        if (this.shouldEmit.apply(this, args)) {
            this.emitter.emit(this.eventLabel, args);
        }
    },

    /**
     * Tries to publish the event on the next tick
     */
    triggerAsync: function(){
        var args = arguments,me = this;
        _.nextTick(function() {
            me.trigger.apply(me, args);
        });
    },

    /**
     * Returns a Promise for the triggered action
     *
     * @return {Promise}
     *   Resolved by completed child action.
     *   Rejected by failed child action.
     *   If listenAndPromise'd, then promise associated to this trigger.
     *   Otherwise, the promise is for next child action completion.
     */
    triggerPromise: function(){
        var me = this;
        var args = arguments;

        var canHandlePromise =
            this.children.indexOf('completed') >= 0 &&
            this.children.indexOf('failed') >= 0;

        var promise = _.createPromise(function(resolve, reject) {
            // If `listenAndPromise` is listening
            // patch `promise` w/ context-loaded resolve/reject
            if (me.willCallPromise) {
                _.nextTick(function() {
                    var old_promise_method = me.promise;
                    me.promise = function (promise) {
                        promise.then(resolve, reject);
                        // Back to your regularly schedule programming.
                        me.promise = old_promise_method;
                        return me.promise.apply(me, arguments);
                    };
                    me.trigger.apply(me, args);
                });
                return;
            }

            if (canHandlePromise) {
                var removeSuccess = me.completed.listen(function(args) {
                    removeSuccess();
                    removeFailed();
                    resolve(args);
                });

                var removeFailed = me.failed.listen(function(args) {
                    removeSuccess();
                    removeFailed();
                    reject(args);
                });
            }

            me.triggerAsync.apply(me, args);

            if (!canHandlePromise) {
                resolve();
            }
        });

        return promise;
    }
};

},{"./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\StoreMethods.js":[function(require,module,exports){
/**
 * A module of methods that you want to include in all stores.
 * This module is consumed by `createStore`.
 */
module.exports = {
};

},{}],"C:\\ksana2015\\node_modules\\reflux\\src\\bindMethods.js":[function(require,module,exports){
module.exports = function(store, definition) {
  for (var name in definition) {
    if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(definition, name);

        if (!propertyDescriptor.value || typeof propertyDescriptor.value !== 'function' || !definition.hasOwnProperty(name)) {
            continue;
        }

        store[name] = definition[name].bind(store);
    } else {
        var property = definition[name];

        if (typeof property !== 'function' || !definition.hasOwnProperty(name)) {
            continue;
        }

        store[name] = property.bind(store);
    }
  }

  return store;
};

},{}],"C:\\ksana2015\\node_modules\\reflux\\src\\connect.js":[function(require,module,exports){
var Reflux = require('./index'),
    _ = require('./utils');

module.exports = function(listenable,key){
    return {
        getInitialState: function(){
            if (!_.isFunction(listenable.getInitialState)) {
                return {};
            } else if (key === undefined) {
                return listenable.getInitialState();
            } else {
                return _.object([key],[listenable.getInitialState()]);
            }
        },
        componentDidMount: function(){
            _.extend(this,Reflux.ListenerMethods);
            var me = this, cb = (key === undefined ? this.setState : function(v){me.setState(_.object([key],[v]));});
            this.listenTo(listenable,cb);
        },
        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
    };
};

},{"./index":"C:\\ksana2015\\node_modules\\reflux\\src\\index.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\connectFilter.js":[function(require,module,exports){
var Reflux = require('./index'),
  _ = require('./utils');

module.exports = function(listenable, key, filterFunc) {
    filterFunc = _.isFunction(key) ? key : filterFunc;
    return {
        getInitialState: function() {
            if (!_.isFunction(listenable.getInitialState)) {
                return {};
            } else if (_.isFunction(key)) {
                return filterFunc.call(this, listenable.getInitialState());
            } else {
                // Filter initial payload from store.
                var result = filterFunc.call(this, listenable.getInitialState());
                if (result) {
                  return _.object([key], [result]);
                } else {
                  return {};
                }
            }
        },
        componentDidMount: function() {
            _.extend(this, Reflux.ListenerMethods);
            var me = this;
            var cb = function(value) {
                if (_.isFunction(key)) {
                    me.setState(filterFunc.call(me, value));
                } else {
                    var result = filterFunc.call(me, value);
                    me.setState(_.object([key], [result]));
                }
            };

            this.listenTo(listenable, cb);
        },
        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
    };
};


},{"./index":"C:\\ksana2015\\node_modules\\reflux\\src\\index.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\createAction.js":[function(require,module,exports){
var _ = require('./utils'),
    Reflux = require('./index'),
    Keep = require('./Keep'),
    allowed = {preEmit:1,shouldEmit:1};

/**
 * Creates an action functor object. It is mixed in with functions
 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
 * be overridden in the definition object.
 *
 * @param {Object} definition The action object definition
 */
var createAction = function(definition) {

    definition = definition || {};
    if (!_.isObject(definition)){
        definition = {actionName: definition};
    }

    for(var a in Reflux.ActionMethods){
        if (!allowed[a] && Reflux.PublisherMethods[a]) {
            throw new Error("Cannot override API method " + a +
                " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    for(var d in definition){
        if (!allowed[d] && Reflux.PublisherMethods[d]) {
            throw new Error("Cannot override API method " + d +
                " in action creation. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    definition.children = definition.children || [];
    if (definition.asyncResult){
        definition.children = definition.children.concat(["completed","failed"]);
    }

    var i = 0, childActions = {};
    for (; i < definition.children.length; i++) {
        var name = definition.children[i];
        childActions[name] = createAction(name);
    }

    var context = _.extend({
        eventLabel: "action",
        emitter: new _.EventEmitter(),
        _isAction: true
    }, Reflux.PublisherMethods, Reflux.ActionMethods, definition);

    var functor = function() {
        return functor[functor.sync?"trigger":"triggerPromise"].apply(functor, arguments);
    };

    _.extend(functor,childActions,context);

    Keep.createdActions.push(functor);

    return functor;

};

module.exports = createAction;

},{"./Keep":"C:\\ksana2015\\node_modules\\reflux\\src\\Keep.js","./index":"C:\\ksana2015\\node_modules\\reflux\\src\\index.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\createStore.js":[function(require,module,exports){
var _ = require('./utils'),
    Reflux = require('./index'),
    Keep = require('./Keep'),
    mixer = require('./mixer'),
    allowed = {preEmit:1,shouldEmit:1},
    bindMethods = require('./bindMethods');

/**
 * Creates an event emitting Data Store. It is mixed in with functions
 * from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit`
 * and `shouldEmit` may be overridden in the definition object.
 *
 * @param {Object} definition The data store object definition
 * @returns {Store} A data store instance
 */
module.exports = function(definition) {

    definition = definition || {};

    for(var a in Reflux.StoreMethods){
        if (!allowed[a] && (Reflux.PublisherMethods[a] || Reflux.ListenerMethods[a])){
            throw new Error("Cannot override API method " + a +
                " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
            );
        }
    }

    for(var d in definition){
        if (!allowed[d] && (Reflux.PublisherMethods[d] || Reflux.ListenerMethods[d])){
            throw new Error("Cannot override API method " + d +
                " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
            );
        }
    }

    definition = mixer(definition);

    function Store() {
        var i=0, arr;
        this.subscriptions = [];
        this.emitter = new _.EventEmitter();
        this.eventLabel = "change";
        bindMethods(this, definition);
        if (this.init && _.isFunction(this.init)) {
            this.init();
        }
        if (this.listenables){
            arr = [].concat(this.listenables);
            for(;i < arr.length;i++){
                this.listenToMany(arr[i]);
            }
        }
    }

    _.extend(Store.prototype, Reflux.ListenerMethods, Reflux.PublisherMethods, Reflux.StoreMethods, definition);

    var store = new Store();
    Keep.createdStores.push(store);

    return store;
};

},{"./Keep":"C:\\ksana2015\\node_modules\\reflux\\src\\Keep.js","./bindMethods":"C:\\ksana2015\\node_modules\\reflux\\src\\bindMethods.js","./index":"C:\\ksana2015\\node_modules\\reflux\\src\\index.js","./mixer":"C:\\ksana2015\\node_modules\\reflux\\src\\mixer.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\index.js":[function(require,module,exports){
exports.ActionMethods = require('./ActionMethods');

exports.ListenerMethods = require('./ListenerMethods');

exports.PublisherMethods = require('./PublisherMethods');

exports.StoreMethods = require('./StoreMethods');

exports.createAction = require('./createAction');

exports.createStore = require('./createStore');

exports.connect = require('./connect');

exports.connectFilter = require('./connectFilter');

exports.ListenerMixin = require('./ListenerMixin');

exports.listenTo = require('./listenTo');

exports.listenToMany = require('./listenToMany');


var maker = require('./joins').staticJoinCreator;

exports.joinTrailing = exports.all = maker("last"); // Reflux.all alias for backward compatibility

exports.joinLeading = maker("first");

exports.joinStrict = maker("strict");

exports.joinConcat = maker("all");

var _ = require('./utils');

exports.EventEmitter = _.EventEmitter;

exports.Promise = _.Promise;

/**
 * Convenience function for creating a set of actions
 *
 * @param definitions the definitions for the actions to be created
 * @returns an object with actions of corresponding action names
 */
exports.createActions = function(definitions) {
    var actions = {};
    for (var k in definitions){
        if (definitions.hasOwnProperty(k)) {
            var val = definitions[k],
                actionName = _.isObject(val) ? k : val;

            actions[actionName] = exports.createAction(val);
        }
    }
    return actions;
};

/**
 * Sets the eventmitter that Reflux uses
 */
exports.setEventEmitter = function(ctx) {
    var _ = require('./utils');
    exports.EventEmitter = _.EventEmitter = ctx;
};


/**
 * Sets the Promise library that Reflux uses
 */
exports.setPromise = function(ctx) {
    var _ = require('./utils');
    exports.Promise = _.Promise = ctx;
};


/**
 * Sets the Promise factory that creates new promises
 * @param {Function} factory has the signature `function(resolver) { return [new Promise]; }`
 */
exports.setPromiseFactory = function(factory) {
    var _ = require('./utils');
    _.createPromise = factory;
};


/**
 * Sets the method used for deferring actions and stores
 */
exports.nextTick = function(nextTick) {
    var _ = require('./utils');
    _.nextTick = nextTick;
};

/**
 * Provides the set of created actions and stores for introspection
 */
exports.__keep = require('./Keep');

/**
 * Warn if Function.prototype.bind not available
 */
if (!Function.prototype.bind) {
  console.error(
    'Function.prototype.bind not available. ' +
    'ES5 shim required. ' +
    'https://github.com/spoike/refluxjs#es5'
  );
}

},{"./ActionMethods":"C:\\ksana2015\\node_modules\\reflux\\src\\ActionMethods.js","./Keep":"C:\\ksana2015\\node_modules\\reflux\\src\\Keep.js","./ListenerMethods":"C:\\ksana2015\\node_modules\\reflux\\src\\ListenerMethods.js","./ListenerMixin":"C:\\ksana2015\\node_modules\\reflux\\src\\ListenerMixin.js","./PublisherMethods":"C:\\ksana2015\\node_modules\\reflux\\src\\PublisherMethods.js","./StoreMethods":"C:\\ksana2015\\node_modules\\reflux\\src\\StoreMethods.js","./connect":"C:\\ksana2015\\node_modules\\reflux\\src\\connect.js","./connectFilter":"C:\\ksana2015\\node_modules\\reflux\\src\\connectFilter.js","./createAction":"C:\\ksana2015\\node_modules\\reflux\\src\\createAction.js","./createStore":"C:\\ksana2015\\node_modules\\reflux\\src\\createStore.js","./joins":"C:\\ksana2015\\node_modules\\reflux\\src\\joins.js","./listenTo":"C:\\ksana2015\\node_modules\\reflux\\src\\listenTo.js","./listenToMany":"C:\\ksana2015\\node_modules\\reflux\\src\\listenToMany.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\joins.js":[function(require,module,exports){
/**
 * Internal module used to create static and instance join methods
 */

var slice = Array.prototype.slice,
    _ = require("./utils"),
    createStore = require("./createStore"),
    strategyMethodNames = {
        strict: "joinStrict",
        first: "joinLeading",
        last: "joinTrailing",
        all: "joinConcat"
    };

/**
 * Used in `index.js` to create the static join methods
 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
 * @returns {Function} A static function which returns a store with a join listen on the given listenables using the given strategy
 */
exports.staticJoinCreator = function(strategy){
    return function(/* listenables... */) {
        var listenables = slice.call(arguments);
        return createStore({
            init: function(){
                this[strategyMethodNames[strategy]].apply(this,listenables.concat("triggerAsync"));
            }
        });
    };
};

/**
 * Used in `ListenerMethods.js` to create the instance join methods
 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
 * @returns {Function} An instance method which sets up a join listen on the given listenables using the given strategy
 */
exports.instanceJoinCreator = function(strategy){
    return function(/* listenables..., callback*/){
        _.throwIf(arguments.length < 3,'Cannot create a join with less than 2 listenables!');
        var listenables = slice.call(arguments),
            callback = listenables.pop(),
            numberOfListenables = listenables.length,
            join = {
                numberOfListenables: numberOfListenables,
                callback: this[callback]||callback,
                listener: this,
                strategy: strategy
            }, i, cancels = [], subobj;
        for (i = 0; i < numberOfListenables; i++) {
            _.throwIf(this.validateListening(listenables[i]));
        }
        for (i = 0; i < numberOfListenables; i++) {
            cancels.push(listenables[i].listen(newListener(i,join),this));
        }
        reset(join);
        subobj = {listenable: listenables};
        subobj.stop = makeStopper(subobj,cancels,this);
        this.subscriptions = (this.subscriptions || []).concat(subobj);
        return subobj;
    };
};

// ---- internal join functions ----

function makeStopper(subobj,cancels,context){
    return function() {
        var i, subs = context.subscriptions,
            index = (subs ? subs.indexOf(subobj) : -1);
        _.throwIf(index === -1,'Tried to remove join already gone from subscriptions list!');
        for(i=0;i < cancels.length; i++){
            cancels[i]();
        }
        subs.splice(index, 1);
    };
}

function reset(join) {
    join.listenablesEmitted = new Array(join.numberOfListenables);
    join.args = new Array(join.numberOfListenables);
}

function newListener(i,join) {
    return function() {
        var callargs = slice.call(arguments);
        if (join.listenablesEmitted[i]){
            switch(join.strategy){
                case "strict": throw new Error("Strict join failed because listener triggered twice.");
                case "last": join.args[i] = callargs; break;
                case "all": join.args[i].push(callargs);
            }
        } else {
            join.listenablesEmitted[i] = true;
            join.args[i] = (join.strategy==="all"?[callargs]:callargs);
        }
        emitIfAllListenablesEmitted(join);
    };
}

function emitIfAllListenablesEmitted(join) {
    for (var i = 0; i < join.numberOfListenables; i++) {
        if (!join.listenablesEmitted[i]) {
            return;
        }
    }
    join.callback.apply(join.listener,join.args);
    reset(join);
}

},{"./createStore":"C:\\ksana2015\\node_modules\\reflux\\src\\createStore.js","./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\listenTo.js":[function(require,module,exports){
var Reflux = require('./index');


/**
 * A mixin factory for a React component. Meant as a more convenient way of using the `ListenerMixin`,
 * without having to manually set listeners in the `componentDidMount` method.
 *
 * @param {Action|Store} listenable An Action or Store that should be
 *  listened to.
 * @param {Function|String} callback The callback to register as event handler
 * @param {Function|String} defaultCallback The callback to register as default handler
 * @returns {Object} An object to be used as a mixin, which sets up the listener for the given listenable.
 */
module.exports = function(listenable,callback,initial){
    return {
        /**
         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
         * and then make the call to `listenTo` with the arguments provided to the factory function
         */
        componentDidMount: function() {
            for(var m in Reflux.ListenerMethods){
                if (this[m] !== Reflux.ListenerMethods[m]){
                    if (this[m]){
                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
                    }
                    this[m] = Reflux.ListenerMethods[m];
                }
            }
            this.listenTo(listenable,callback,initial);
        },
        /**
         * Cleans up all listener previously registered.
         */
        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
    };
};

},{"./index":"C:\\ksana2015\\node_modules\\reflux\\src\\index.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\listenToMany.js":[function(require,module,exports){
var Reflux = require('./index');

/**
 * A mixin factory for a React component. Meant as a more convenient way of using the `listenerMixin`,
 * without having to manually set listeners in the `componentDidMount` method. This version is used
 * to automatically set up a `listenToMany` call.
 *
 * @param {Object} listenables An object of listenables
 * @returns {Object} An object to be used as a mixin, which sets up the listeners for the given listenables.
 */
module.exports = function(listenables){
    return {
        /**
         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
         * and then make the call to `listenTo` with the arguments provided to the factory function
         */
        componentDidMount: function() {
            for(var m in Reflux.ListenerMethods){
                if (this[m] !== Reflux.ListenerMethods[m]){
                    if (this[m]){
                        throw "Can't have other property '"+m+"' when using Reflux.listenToMany!";
                    }
                    this[m] = Reflux.ListenerMethods[m];
                }
            }
            this.listenToMany(listenables);
        },
        /**
         * Cleans up all listener previously registered.
         */
        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
    };
};

},{"./index":"C:\\ksana2015\\node_modules\\reflux\\src\\index.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\mixer.js":[function(require,module,exports){
var _ = require('./utils');

module.exports = function mix(def) {
    var composed = {
        init: [],
        preEmit: [],
        shouldEmit: []
    };

    var updated = (function mixDef(mixin) {
        var mixed = {};
        if (mixin.mixins) {
            mixin.mixins.forEach(function (subMixin) {
                _.extend(mixed, mixDef(subMixin));
            });
        }
        _.extend(mixed, mixin);
        Object.keys(composed).forEach(function (composable) {
            if (mixin.hasOwnProperty(composable)) {
                composed[composable].push(mixin[composable]);
            }
        });
        return mixed;
    }(def));

    if (composed.init.length > 1) {
        updated.init = function () {
            var args = arguments;
            composed.init.forEach(function (init) {
                init.apply(this, args);
            }, this);
        };
    }
    if (composed.preEmit.length > 1) {
        updated.preEmit = function () {
            return composed.preEmit.reduce(function (args, preEmit) {
                var newValue = preEmit.apply(this, args);
                return newValue === undefined ? args : [newValue];
            }.bind(this), arguments);
        };
    }
    if (composed.shouldEmit.length > 1) {
        updated.shouldEmit = function () {
            var args = arguments;
            return !composed.shouldEmit.some(function (shouldEmit) {
                return !shouldEmit.apply(this, args);
            }, this);
        };
    }
    Object.keys(composed).forEach(function (composable) {
        if (composed[composable].length === 1) {
            updated[composable] = composed[composable][0];
        }
    });

    return updated;
};

},{"./utils":"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js"}],"C:\\ksana2015\\node_modules\\reflux\\src\\utils.js":[function(require,module,exports){
/*
 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
 * order to remove the dependency
 */
var isObject = exports.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

exports.extend = function(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
                Object.defineProperty(obj, prop, propertyDescriptor);
            } else {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
};

exports.isFunction = function(value) {
    return typeof value === 'function';
};

exports.EventEmitter = require('eventemitter3');

exports.nextTick = function(callback) {
    setTimeout(callback, 0);
};

exports.capitalize = function(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
};

exports.callbackName = function(string){
    return "on"+exports.capitalize(string);
};

exports.object = function(keys,vals){
    var o={}, i=0;
    for(;i<keys.length;i++){
        o[keys[i]] = vals[i];
    }
    return o;
};

exports.Promise = require("native-promise-only");

exports.createPromise = function(resolver) {
    return new exports.Promise(resolver);
};

exports.isArguments = function(value) {
    return typeof value === 'object' && ('callee' in value) && typeof value.length === 'number';
};

exports.throwIf = function(val,msg){
    if (val){
        throw Error(msg||val);
    }
};

},{"eventemitter3":"C:\\ksana2015\\node_modules\\reflux\\node_modules\\eventemitter3\\index.js","native-promise-only":"C:\\ksana2015\\node_modules\\reflux\\node_modules\\native-promise-only\\npo.js"}]},{},["C:\\ksana2015\\accelon2015\\index.js"])
//# sourceMappingURL=bundle.js.map
