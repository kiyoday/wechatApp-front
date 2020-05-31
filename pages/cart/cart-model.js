
import {Base} from '../utils/base.js';

class Cart extends Base{

  constructor(){
    super();
    this._storageKeyName='cart';
  }; 
  
  /*  缓存中拿数据
    * 获取购物车
    * param
    * flag - {bool} 是否过滤掉不下单的商品
    */
  getCartDataFromLocal(flag){
    var res = wx.getStorageSync(this._storageKeyName);
    if(!res){
        res=[];
    }
    //在下单的时候过滤不下单的商品，
    if(flag){
      var newRes=[];
      for(let i=0;i<res.length;i++){
        if(res[i].selectStatus){
            newRes.push(res[i]);
        }
      }
      res=newRes;
    }

    return res;
  };

  /*
    * 加入到购物车
    * 如果之前没有样的商品，则直接添加一条新的记录， 数量为 counts
    * 如果有，则只将相应数量 + counts
    * @params:
    * item - {obj} 商品对象,
    * counts - {int} 商品数目,
    * */
  add(item,counts){
    var cartData=this.getCartDataFromLocal();

    if(!cartData){
        cartData=[];
    }
    var isHadInfo=this._isHasThatOne(item.id,cartData);
    //新商品
    if(isHadInfo.index==-1) {
        item.counts=counts;
        item.selectStatus=true;  //默认在购物车中为选中状态
        cartData.push(item);
    }
    //已有商品
    else{
        cartData[isHadInfo.index].counts+=counts;
    }
    this.execSetStorageSync(cartData);  //更新本地缓存
    return cartData;
  };

  /*
    *获得购物车商品总数目,包括分类和不分类
    * param:
    * flag - {bool} 是否区分选中和不选中
    * return
    * counts1 - {int} 不分类
    * counts2 -{int} 分类
    */
  getCartTotalCounts(flag){
    var data=this.getCartDataFromLocal(),
      counts1=0,
      counts2=0;
    for(let i=0;i<data.length;i++){
      if (flag){
        if(data[i].selectStatus) {
          counts1 += data[i].counts;
          counts2++;
        }
      }else{
        counts1 += data[i].counts;
        counts2++;
      }
    }
    return {
      counts1:counts1,
      counts2:counts2
    };
  };

    /*本地缓存 保存／更新*/
  execSetStorageSync(data){
      wx.setStorageSync(this._storageKeyName,data);
  };

  /*判断购物车中是否已经存在该商品
  * 返回商品数据及数组中序号
  */
  _isHasThatOne(id,arr){
    var item,
        result={index:-1};
    for(let i=0;i<arr.length;i++){
        item=arr[i];
        if(item.id==id) {
          //返回商品属性
          result = {
              index:i,
              data:item
          };
          break;
        }
    }
    return result;
  }

}

export {Cart};