
import {Base} from '../utils/base.js';

class Home extends Base{
  constructor(){
    super();
  }

  getBannerData(id, callBack){
    var params = {
      url:'banner/'+id,
      sCallBack:function(res){
        callBack && callBack(res.items);
      }
    }

    this.request(params);

    // wx.request({
    //   url:'http://s.com/api/v1/banner/' + id,
    //   method:'GET',
    //   success:function(res){
    //     // console.log(res);
    //     callBack(res);
    //   }
    // })
  }
}

export {Home};