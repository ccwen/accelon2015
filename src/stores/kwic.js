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