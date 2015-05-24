var Reflux=require("reflux");
var actions=require("../actions/databases");
var kde=require("ksana-database");
var kse=require("ksana-search");
var update=require("react").addons.update;

var DBListStore=Reflux.createStore({
	databases:[]
	,listenables:actions
	,init:function() {
		var r=kde.rpc.list({},function(databases){
			this.databases=databases;
		}.bind(this));
	}
	,onList:function(appname) {
		appname=appname||"accelon2015";
		this.searchable=this.databases.filter(function(item){return item.folder===appname})
		this.trigger(this.searchable);
	}
	,setResult:function(fullname,hits) {
		for (var i=0;i<this.searchable.length;i++) {
			var db=this.searchable[i];
			if (db.fullname===fullname) {
				var updatedb=update(db,{$merge:{hits:hits}});
				this.searchable.splice(i,1);
				this.searchable=update(this.searchable,{$push:[updatedb]});
				this.trigger(this.searchable);
				return;
			}
		}
	}
	,onSearch:function(tofind){
		console.log("searching",tofind);
		var that=this;
		this.searchable.map(function(dbname){
			kse.search(dbname.fullname,tofind,{},function(err,data){
				that.setResult(dbname.fullname,data.rawresult.length);
			});
		});
	}
})

module.exports=DBListStore;