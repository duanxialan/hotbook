/*var indexPtl=require("./module/index.string");
var concent=document.body.innerHTML;
document.body.innerHTML=concent+indexPtl;*/
//引入spa类库
require("./lib/spa.min");
//引入swiper类库
require("./lib/swiper-3.3.1.min.js");
//引入视图文件
require("./views/index");
require("./views/home");
require("./views/find");
require("./views/my");
require("./views/detail");
require("./views/quit");
require("./views/guide");

SPA.config({
	indexView:"guide"
})