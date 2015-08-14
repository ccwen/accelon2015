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