/** 
Store of Keywords in context
*/

var Reflux=require("reflux");
var actions=require("../actions/kwic");
var kse=require("ksana-search");

var KWICStore=Reflux.createStore({
	listenables:actions
	,kwic:[]
	,find:function(field,val) {
		for (var i=0;i<this.kwic.length;i++) {
			if (this.kwic[i][field]===val) return i;
		}
		return -1;
	}
	,add_replace:function(trait) {
		var i=this.find("dbname",trait.dbname);
		if (i>-1) this.kwic.splice(i,1);
		this.kwic.unshift(trait);
	}
	,onOpen:function(db,tofind,opts) {
		kse.search(db,tofind,opts,function(err,data){
			if (!err) {
				if (!data.key) data.key='S'+Math.round(Math.random()*10);
				this.add_replace(data);
				this.trigger(this.kwic);
			};
		}.bind(this));
	}
	,onRemove:function(key) {
		var i=this.find("key",key);
		if (i===-1)return;
		this.kwic.splice(i,1);
		this.trigger(this.kwic);
	}
	,onSearch:function() {
	}
})
module.exports=KWICStore;