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

})