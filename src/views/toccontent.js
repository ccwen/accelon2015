var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var Reflux=require("reflux");
var E=React.createElement;
var action=require("../actions/texts");

var TocContent=React.createClass({
	mixin:[PureRenderMixin]
	,opentext:function(e) {
		var key=Math.random().toString().substr(3,6);
		action.add({key:key,title:'T'+key,text:"content of "+key});
	},
	render:function() {
		return E("div",{},
			E("button",{onClick:this.opentext},"open text")
		);
	}
});
module.exports=TocContent;