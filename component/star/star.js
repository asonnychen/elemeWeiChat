// component/star/star.js
let app = getApp();
Component({
  properties: {
    score: Number,
    size: Number,
    margin: Number
  },
  data: {
    result: []
  },
  attached(e) {},
  ready(e) {
    this.setData({
      seller: app.globalData.localData.seller
    })
    this.itemClasses();
  },
  moved(e) {},
  methods: {
    itemClasses(e) {
      // 评分加星计算
      const LENGTH = 5;
      const CLS_NO = 'on';
      const CLS_HALF = 'half';
      const CLS_OFF = 'off';
      let result = [];
      let scores = Math.floor(this.data.score * 2) / 2;
      let integer = Math.floor(this.data.score);
      let hasDecimal = this.data.score % 1 >= 0.5;
      for (let i = 0; i < integer; i++) {
        result.push(CLS_NO);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      this.setData({
        results: result
      })
    }
  }
})