// /product.js
import {Product} from '../product/product-model.js';
import {Cart} from '../cart/cart-model.js';

var product = new Product();
var cart=new Cart();

Page({


  data: {
    id:null,
    loadingHidden:false,
    hiddenSmallImg:true,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
    ProductCounts:1,
    currentTabsIndex:0,
    cartTotalCounts:0,
  },

  onLoad: function (options) {
    var id = options.id;
    this.data.id = id;
    this._loadData();
  },

  /*加载所有数据*/
  _loadData:function(){
    product.getDetailInfo(this.data.id,(data)=>{
      this.setData({
        Product:data,
        cartTotalCounts:cart.getCartTotalCounts().counts1,
      });
    });
  },

  //选择购买数目
  bindPickerChange:function(event){
    var index = event.detail.value;
    var selectedCount = this.data.countsArray[index];
    this.setData({
      ProductCounts:selectedCount
    });
  },

  //切换详情面板
  onTabsItemTap:function(event){
    var index=product.getDataSet(event,'index');

    this.setData({
        currentTabsIndex:index
    });
  },

  /*添加到购物车*/
  onAddingToCartTap:function(events){
    //防止快速点击
    // if(this.data.isFly){
    //   return;
    // }
    // this._flyToCartEffect(events);
    this.addToCart();
  },

  /*将商品数据添加到内存中*/
  addToCart:function(){
    var tempObj={};
    var keys=['id','name','main_img_url','price'];

    for(var key in this.data.Product){
      if(keys.indexOf(key)>=0){
        tempObj[key]=this.data.Product[key];
      }
    }

    cart.add(tempObj,this.data.ProductCounts);
  },

  /*加入购物车动效*/
  _flyToCartEffect:function(events){
    //获得当前点击的位置，距离可视区域左上角
    var touches=events.touches[0];
    var diff={
            x:'25px',
            y:25-touches.clientY+'px'
        },
        style='display: block;-webkit-transform:translate('+diff.x+','+diff.y+') rotate(350deg) scale(0)';  //移动距离
    this.setData({
        isFly:true,
        translateStyle:style
    });
    var that=this;
    setTimeout(()=>{
        that.setData({
            isFly:false,
            translateStyle:'-webkit-transform: none;',  //恢复到最初状态
            isShake:true,
        });
        setTimeout(()=>{
            var counts=that.data.cartTotalCounts+that.data.ProductCounts;
            that.setData({
                isShake:false,
                cartTotalCounts:counts
            });
        },200);
    },1000);
  },
   /*跳转到购物车*/
  onCartTap:function(){
    wx.switchTab({
        url: '/pages/cart/cart'
    });
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function(){
      this._loadData(()=>{
          wx.stopPullDownRefresh()
      });
  },

  //分享效果
  onShareAppMessage: function () {
      return {
          title: '零食商贩 Pretty Vendor',
          path: 'pages/product/product?id=' + this.data.id
      }
  }

})