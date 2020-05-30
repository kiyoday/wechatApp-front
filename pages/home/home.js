// home.js
import {Home} from 'home-model.js';

var home = new Home();

Page({

  data: {

  },

  onLoad:function(){
    this._loadData()
  },

  _loadData:function(){
    var id = 1;

    home.getBannerData(id,(res)=>{
      // console.log(res);
      //数据绑定而不是dom
      this.setData({
        'bannerArr':res,
      });
    });

    home.getThemeData((res)=>{
      this.setData({
        'themeArr':res,
      });
    });

    home.getProductsData((data)=>{
      this.setData({
        'productsArr':data,
      });
    });
  },

  onProductsItemTap:function(event){
    var id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id,
    })
  },

  onThemesItemTap:function(event){
    var id = home.getDataSet(event,'id');
    var name = home.getDataSet(event,'name');
    wx.navigateTo({
      url: '../theme/theme?id'+id+'&name='+name,
    })
  }

})