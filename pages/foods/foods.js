// pages/foods/foods.js
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    foods: {},
    goodsId: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      foods: getApp().globalData.localData.goods[options.goodsid].foods[options.foodsid],
      foodsId: options.foodsid,
      allSell: options.allSell
    });
    var shopcar = 'shopFood' + this.data.foodsId;
    var res = wx.getStorageSync(shopcar);
    if (res && res.foodName == this.data.foods.name) {
      this.setData({
        foodCount: res.count
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取购物车信息
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})