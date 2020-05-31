// /product.js
import {Product} from '../product/product-model.js';

var product = new Product();

Page({


  data: {
    id:null,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
    productCounts:1,
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
        Product:data
      });
    });
  },

  //选择购买数目
  bindPickerChange:function(event){
    var index = event.detail.value;
    var selectedCount = this.data.countsArray[index];
    this.setData({
      productCounts:selectedCount
    });
  },

  //切换详情面板
  onTabsItemTap:function(event){
    var index=product.getDataSet(event,'index');

    this.setData({
        currentTabsIndex:index
    });
},

})