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