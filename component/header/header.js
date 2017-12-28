// component/header/header.js
let app = getApp();
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
  },
  data: {
    // 这里是一些组件内部数据
  },
  ready() {
    this.setData({
      seller: app.globalData.localData.seller,
      score: app.globalData.localData.seller.score
    })
  },
  methods: {
    showDetail: function (e) {
      // 弹出层店铺信息
      this.setData({
        show: !this.data.show,
        detail_class: 'show'
      })
    }
  }
})