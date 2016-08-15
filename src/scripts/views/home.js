var homeTpl=require("../module/home.string");
//引入utls
var utls = require("../utls/utls");

SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.livedata=[];
		}
	}],
	//初始化
	init:{
		  vm:null, 
          livelistArr:[],
		  hotSlider:null,
 		  foSlider:null,  
		  formatData:function(data){
		  	//声明
		  	var tempArr= [];
		  		for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
		  			 tempArr[i]= [];
		  			 tempArr[i].push(data[2*i]);
		  			 tempArr[i].push(data[2*i+1]);
		  		}
		  		return tempArr;
		  }
	},
	//绑定视图事件
	bindEvents:{	
		beforeShow:function(){
			//获取视图
			var that = this;
			//获取vm
		that.vm = this.getVM();
			$.ajax({
				//url:"./json/livelist.json",
				url:"/api/getLivelist.php",
               type:"get",
               data:{
               	   rtype:"origin" 
               },
				success:function(rs){
				  that.livelistArr = rs.data;
                  that.vm.livedata = that.formatData(rs.data);
				},
				error:function(){
					console.log("错误");
				}
			})
		},
		//视图显示出来之前执行的回调函数
		show:function(){
			var that = this;
			this.foSlider= new Swiper("#home-container",{
				loop:false,
				 onSlideChangeStart:function(swiper){
					var index = swiper.activeIndex;
					var $tags = $("#title li");
					utls.setFoucs($tags.eq(index));					
				}
			})
			this.hotSlider= new Swiper("#swiper-hot",{
				loop:false,
				 onSlideChangeStart:function(swiper){
					var index = swiper.activeIndex;
					var $tags = $("#nav>li");
					utls.setFoucs($tags.eq(index));					
				}
			})

	        //下拉刷新    上拉加载
	  var myScroll = this.widgets.homeListScroll;

      var scrollSize = 30;

      myScroll.scrollBy(0,-scrollSize);

      var header=$(".header img"),
          topImgHasClass=header.hasClass("up");
      var foot=$(".foot img"),
          bottomImgHasClass=header.hasClass("down");
      myScroll.on("scroll",function(){
        var y=this.y,
            maxY=this.maxScrollY-y;
            if(y>=0){
                 !topImgHasClass && header.addClass("up");
                 return "";
            }
            if(maxY>=0){
                 !bottomImgHasClass && foot.addClass("down");
                 return "";
            }
      })

      myScroll.on("scrollEnd",function(){
        if(this.y>=-scrollSize && this.y<0){
              myScroll.scrollTo(0,-scrollSize);
              header.removeClass("up");
        }else if(this.y>=0){
              header.attr("src","/footbook/images/ajax-loader.gif");
                      // 下拉刷新
              $.ajax({
                  //url:"/footbook/mock/livelist.json",  mock数据
                  url:"/api/getLivelist.php",
                  type:"get",
                  data:{
                     rtype:"refresh"
                  },
                  success:function(rs){
                     that.livelistArr = rs.data.concat(that.livelistArr);
                     that.vm.livedata = that.formatData(that.livelistArr);   

                     myScroll.scrollTo(0,-scrollSize);
                  	header.removeClass("up");
                  	header.attr("src","/footbook/images/arrow.png");
                  }
              }) 
        }

        var maxY=this.maxScrollY-this.y;
        var self=this;
        if(maxY>-scrollSize && maxY<0){
              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
              foot.removeClass("down")
              console.log("refresh");
        }else if(maxY>=0){
            foot.attr("src","/footbook/images/ajax-loader.gif")
            //请求加载数据
             $.ajax({
                  //url:"/footbook/mock/livelist.json",  mock数据
                  url:"/api/getLivelist.php",
                  type:"get",
                  data:{
                     rtype:"more"
                  },
                  success:function(rs){
                     that.livelistArr = that.livelistArr.concat(rs.data);
                     that.vm.livedata = that.formatData(that.livelistArr);   

                     myScroll.refresh();
                     myScroll.scrollTo(0,self.y+maxY);
                     foot.removeClass("down");
                     foot.attr("src","/footbook/images/arrow.png")
                  }
              }) 
        }
      })

	}			
},
	bindActions:{	
		"hot.slide":function(e){
			var index=$(e.el).index();
			this.foSlider.slideTo(index,1000,true);
		},	
		"tap.slide":function(e){
			var index=$(e.el).index();
			this.hotSlider.slideTo(index);
		},
		"goto.detail":function(e,data){
			SPA.open("detail",{//open用于打开新的视图
				param:data    //跳转视图时传递参数 
			});    
		}
	}
})