// pages/goods/goods.js
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    seller: {},
    show: false,
    class_map: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    foodCount: 0,
    scrollNum: 0,
    scrollMove: 0,
    scrollTop: 0,
    typeHeight: 0,
    goodHeight: 0
  },
  showDetail: function (e) {
    // 弹出层店铺信息
    this.setData({
      show: !this.data.show,
      detail_class: 'show'
    })
  },
  right_target(e) {
    // 右列表高度计算
    let List = this.data.heightList;
    List.forEach((item,id,arr)=>{
      if (e.detail.scrollTop >= arr[id] && e.detail.scrollTop < arr[id + 1]) {
        this.setData({
          scrollNum: id
        });
      }
    })
  },
  left_active(e) {
    // 左列表控制右列滚动条ID
    let id = e.target.dataset.id;
    let tType = this.data.scrollMove[id];
    this.setData({
      scrollNum: id,
      toView: tType
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得全局数据的goods并指向给data
    this.setData({
      goods: app.globalData.localData.goods,
      seller: app.globalData.localData.seller
    });
    let that = this;
    let arr = [];
    this.data.goods.forEach((item, index) => {
      arr.push('a' + index)
    });
    this.setData({
      scrollMove: arr
    })
    // // 获取右列表标题高度
    // wx.createSelectorQuery().select('.menu-wrap .right-scroll .menu-item .title').boundingClientRect(function (rect) {
    //   rect.hight
    // }).exec(function (rect) {
    //   that.setData({
    //     typeHeight: rect[0].height
    //   })
    // });
    // 获取右列表各内容高度
    wx.createSelectorQuery().select('.menu-wrap .right-scroll .menu-item .item').boundingClientRect(function (rect) {
      rect.hight
    }).exec(function (rect) {
      that.setData({
        goodHeight: rect[0].height
      });
      let heightLists = [0];
      let curHeight = 0;
      that.data.goods.forEach((item) => {
        curHeight += (item.foods.length * that.data.goodHeight);
        heightLists.push(curHeight);
      });
      that.setData({
        heightList: heightLists
      })
    });
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
    this.setData({
      allSell: app.globalData.allSell
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

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