var Reflux=require("reflux");
var actions=require("../actions/texts");
var Texts=Reflux.createStore({
	listenables:actions
	,texts:{}
	,onAdd:function(key,trait) {
		this.texts[key]=trait;
		this.trigger(this.texts,key);
	}
	,onRemove:function(key) {
		delete this.texts[key];
		this.trigger(this.texts);
	}
})
module.exports=Texts;