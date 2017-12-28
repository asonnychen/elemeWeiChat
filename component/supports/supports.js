// component/supports/supports.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    detail_class: '',
    class_map: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  ready() {
    this.setData({
      seller: app.globalData.localData.seller,
      score: app.globalData.localData.seller.score
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
