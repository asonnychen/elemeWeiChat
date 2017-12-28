// component/shopcart/shopcart.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodCount: {
      type: Number,
      observer(newVal, oldVal) {
        // 这里触摸发组件数据同步
        let totalPrice = newVal * this.properties.selectFoods.price;
        this.setData({
          foodCount: newVal,
          total_price: totalPrice,
        })
      }
    },
    selectFoods: Object,
    foodsId: Number,
    allSell: {
      type: Number,
      observer(newVal, oldVal) {
        this.payDesc();
        this.payClass();
        this.setData({
          showShopCar: false
        })
        this.show_shopcar();
      }
    },
    allCount: Number
  },
  /**
   * 组件的初始数据
   */
  data: {
    seller: '',
    // 另需配送费
    deliveryPrice: 0,
    // 最底配送价
    min_price: 0,
    // 商品购买数*商品价=总价
    total_price: 0,
    // 起送价
    pay_desc: 0,
    pay_class: 'not-enough',
    fold: true,
    showShopCar: false
  },
  ready() {
    this.setData({
      seller: app.globalData.localData.seller,
      pay_desc: '￥' + app.globalData.localData.seller.minPrice + '元起送',
      min_price: app.globalData.localData.seller.minPrice
    });
    this.payDesc();
    this.payClass();
  },
  detached() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    payDesc() {
      // 右边总合计
      let allSellInfo = app.globalData.allSell == 0 ? this.properties.allSell : app.globalData.allSell;
      if (allSellInfo == 0) {
        let payDesc = '￥' + this.data.seller.minPrice + '元起送';
        this.setData({
          pay_desc: payDesc
        })
      } else if (allSellInfo < this.data.seller.minPrice) {
        let diff = this.data.seller.minPrice - allSellInfo;
        this.setData({
          pay_desc: '还差￥' + diff + '起送'
        })
      } else {
        this.setData({
          pay_desc: '去结算'
        })
      }
    },
    payClass() {
      // 购物车亮灯
      let allSellInfo = app.globalData.allSell == 0 ? this.properties.allSell : app.globalData.allSell;
      if (allSellInfo < this.data.min_price) {
        this.setData({
          pay_class: 'not-enough'
        })
      } else {
        this.setData({
          pay_class: 'enough'
        })
      }
    },
    shopcart_show(){
      this.setData({
        showShopCar: !this.data.showShopCar
      })
      this.show_shopcar();
    },
    show_shopcar() {
      // 生成显示购物数据
      let res = wx.getStorageInfoSync().keys;
      let lenghth = res.lenghth;
      let sellName = [];
      let sellCount = [];
      let nolySellPrice = [];
      let sellTotal = [];
      res.forEach((val, id, arr) => {
        sellName.push(wx.getStorageSync(val).foodName);
        sellCount.push(wx.getStorageSync(val).count);
        nolySellPrice.push(wx.getStorageSync(val).price);
        sellTotal.push(wx.getStorageSync(val).allSell);
      });
      this.setData({
        sellName,
        sellCount,
        nolySellPrice,
        sellTotal
      });
    },
    clear_shop_car() {
      // 清空购物车缓存并返回主页
      wx.clearStorageSync();
      app.globalData.allSell = 0;
      app.globalData.allCount = 0;
      this.setData({
        showShopCar: false
      })
      wx.navigateBack({
        url: "../goods/goods"
      })
    }
  }
})