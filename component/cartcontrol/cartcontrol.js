// component/cartcontrol/cartcontrol.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodCount: {
      type: Number,
      value: 0,
      observer(newVal, oldVal) {
        this.setData({
          foodCount: newVal
        });
        if(newVal>oldVal){
          this.add_shopCar();
        }else if(newVal<oldVal){
          this.minus_shopCar();
        }
      }
    },
    foods: Object,
    foodsid: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    animateCount: '',
    animateCartAdd: '',
    animateCartDecrease: ''
  },
  ready() {
    this.animateCartAdd = wx.createAnimation({
      transformOrigin: '50% 50% 0',
      duration: 200,
      timingFunction: 'ease',
      delay: 0
    });
    this.setData({
      allSell: app.globalData.allSell,
      allCount: app.globalData.allCount
    })
  },


  /**
   * 组件的方法列表
   */
  methods: {
    count_hide(e) {
      this.animateCartAdd.translate3d(-50, 0, 0).rotate(-360).step();
      this.setData({
        animateCartAdd: this.animateCartAdd.export(),
        foodCount: this.data.foodCount + 1
      })
    },
    add_count() {
      // 增加当前商品购买数
      var that = this;
      this.setData({
        animateCartAdd: this.animateCartAdd.export(),
        foodCount: this.data.foodCount + 1
      });
    },
    add_shopCar() {
      // 生成购物车数据(增加)
      var that = this;
      var shopCar = {};
      shopCar.foodName = this.data.foods.name;
      shopCar.count = this.data.foodCount;
      shopCar.foodId = this.properties.foodsid;
      shopCar.price = this.properties.foods.price;
      shopCar.allSell = this.data.foodCount * this.properties.foods.price
      wx.setStorageSync('shopFood' + that.properties.foodsid, shopCar);
      app.globalData.allSell += this.properties.foods.price;
      app.globalData.allCount++;
      this.setData({
        allSell: app.globalData.allSell,
        allCount: app.globalData.allCount
      })
    },
    minus_shopCar(){
      // 生成购物车数据(减少)      
      var that = this;
      var shopCar = {};
      shopCar.foodName = this.data.foods.name;
      shopCar.count = this.data.foodCount;
      shopCar.foodId = this.properties.foodsid;
      shopCar.price = this.properties.foods.price;
      shopCar.allSell = this.data.foodCount * this.properties.foods.price
      wx.setStorageSync('shopFood' + that.properties.foodsid, shopCar);
      app.globalData.allSell -= this.properties.foods.price;
      app.globalData.allCount--;
      this.setData({
        allSell: app.globalData.allSell,
        allCount: app.globalData.allCount
      })
    },
    decrease_count() {
      // 减少当前商品购买数      
      this.setData({
        foodCount: this.data.foodCount - 1
      })
      if (this.data.foodCount == 0) {
        this.animateCartAdd.translate3d(0, 0, 0).rotate(360).step();
        this.setData({
          animateCartAdd: this.animateCartAdd.export(),
          foodCount: 0
        })
      }
    }
  }
})