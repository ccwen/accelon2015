var Reflux=require("reflux");
var actions=require("../actions/texts");
var MAXTAB=10;

var Texts=Reflux.createStore({
	listenables:actions
	,texts:[]
	,find:function(key) {
		for (var i=0;i<this.texts.length;i++) {
			if (this.texts[i].key===key) return i;
		}
		return -1;
	}
	,add_replace:function(trait) {
		var i=this.find(trait.key);
		if (i>-1) this.texts.splice(i,1);
		if (this.texts.length>=MAXTAB) this.texts.pop();
	 	this.texts.unshift(trait);
	}
	,triggerImmutable:function(key) {
		var texts=[];
		for (var i=0;i<this.texts.length;i++) {
			texts.push(this.texts[i]);
		}
		this.trigger(texts,key);
	}
	,onCloseAdd:function(oldkey,trait) {
		var i=this.find(oldkey);
		if (i==-1)	return ;
		this.texts[i]=trait;
		this.triggerImmutable(trait.key);
	}
	,onAdd:function(trait) {
		this.add_replace(trait);
		this.triggerImmutable(trait.key);
	}
	,onRemove:function(key) {
		var i=this.find(key);
		if (i>-1) this.texts.splice(i,1);
		this.triggerImmutable(key);
	}
})
module.exports=Texts;