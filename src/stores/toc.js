/** 
Store of Keywords in context
*/

var Reflux=require("reflux");
var actions=require("../actions/toc");
var kse=require("ksana-search");
var TOCStore=Reflux.createStore({
	listenables:actions
	,find:function(key) {
	}
	,onOpen:function(dbname,tocname,q) {
		var that=this;
		kse.search(dbname,q,{},function(err,res){
			if (err) {
				console.error(err);
			} else {
				res.engine.getTOC({tocname:tocname},function(data){
					that.trigger(data,dbname,tocname,q,res.rawresult);
				})
			}
		})
	}
	,onSearch:function(key) {
	}
})
module.exports=TOCStore;