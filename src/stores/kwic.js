/** 
Store of Keywords in context
*/

var Reflux=require("reflux");
var actions=require("../actions/kwic");
var KWICStore=Reflux.createStore({
	listenables:actions
	,find:function(key) {
	}
	,onOpen:function(trait) {
	}
	,onSearch:function(key) {
	}
})
module.exports=KWICStore;