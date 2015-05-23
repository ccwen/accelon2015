var React=require("react");
require("ksana2015-webruntime/livereload")();
require("ksana2015-webruntime/ksanagap").boot("accelon2015",function(){
	var Main=React.createElement(require("./src/main.jsx"));
	ksana.mainComponent=React.render(Main,document.getElementById("main"));	
});
