
import {Config} from '../utils/config.js';

class Base{
  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }

  request(params){
    var url = this.baseRequestUrl + params.url;

    if(!params.type){
      params.type = 'GET';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header:{
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success:function(res){
        // if(params.sCallBack){
        //   params.sCallBack(res);
        // }
        params.sCallback&&params.sCallback(res.data);
      },
      fail:function(err){
        console.log(err);
      }
    })
  }
  

  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
};
}

export {Base};