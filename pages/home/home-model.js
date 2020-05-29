
class Home {

  constructor(){

  }

  getBannerData(id, callBack){
    wx.request({
      url:'http://s.com/api/v1/banner/' + id,
      method:'GET',
      success:function(res){
        // console.log(res);
        callBack(res);
      }
    })
  }
}

export {Home};