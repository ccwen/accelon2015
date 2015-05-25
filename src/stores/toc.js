/** 
Store of Keywords in context
*/

var Reflux=require("reflux");
var actions=require("../actions/toc");
var kde=require("ksana-database");
var TOCStore=Reflux.createStore({
	listenables:actions
	,find:function(key) {
	}
	,onOpen:function(dbname,tocname,q) {
		var that=this;
		kde.open(dbname,function(err,db){
			if (err) {
				console.error(err);
			} else {
				db.getTOC({tocname:tocname},function(data){
					that.trigger(data,dbname,tocname,q);
				})
			}
		})
	}
	,onSearch:function(key) {
	}
})
module.exports=TOCStore;