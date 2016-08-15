var utls={
	setFoucs:function(el){
       el.addClass("active").siblings().removeClass("active");
	}
}

// 使用module.exports这个方法将utls暴漏出去
module.exports = utls;



