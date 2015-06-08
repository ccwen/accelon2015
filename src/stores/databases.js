var Reflux=require("reflux");
var actions=require("../actions/databases");
var kde=require("ksana-database");
var kse=require("ksana-search");

var DBListStore=Reflux.createStore({
	databases:[]
	,listenables:actions
	,init:function() {
		kde.listkdb(function(databases){
				this.databases=databases;
		}.bind(this));
	}
	,onList:function(appname) {
		appname=appname||"";
		if (appname) this.searchable=this.databases.filter(function(item){return item.folder===appname});
		else this.searchable=this.databases;
		this.trigger(this.searchable);
	}
	,setResult:function(fullname,hits) {
		this.searchable=this.searchable.map(function(db){
			if (db.fullname===fullname) db.hits=hits;
			return JSON.parse(JSON.stringify(db));
		});
		this.searchable.sort(function(a,b){
			return b.hits-a.hits;
		});

		this.trigger(this.searchable);
	}
	,clearResult:function() {
		this.searchable=this.searchable.map(function(db){
			delete db.hits;
			return db;
		});

		this.trigger(this.searchable);
	}
	,onSearch:function(tofind){
		var that=this;
		
		if (!tofind) {
			this.clearResult();
			return;
		}
		this.searchable.map(function(db){
			kse.search(db.fullname,tofind,{},function(err,data){
				that.setResult(db.fullname,data.rawresult.length);
			});
		});
	}
})

module.exports=DBListStore;