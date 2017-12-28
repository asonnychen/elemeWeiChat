// component/ratingselect/ratingselect.js
import {
  formatDate
} from '../../utils/util.js';
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [],
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    ratings: Array
  },
  data: {
    recommend: 0,
    spitslot: 0,
    have_rating: true,
    time: [],
    class: true,
    content: []
  },
  ready() {
    let recommends = 0;
    let spitslots = 0;
    let rating = [];
    let times = [];
    this.data.ratings.forEach((val, id) => {
      if (val.rateTime) times.push(
        formatDate(new Date(val.rateTime), 'yyyy-MM-dd hh:mm')
      );
      if (val.rateType === 0) {
        recommends++
      } else {
        spitslots++
      }
      if (!(val.text === '')) rating.push(val);

    });
    this.setData({
      recommend: recommends,
      spitslot: spitslots,
      have_rating: rating,
      time: times,
      content: this.data.ratings
    });
  },
  detached: function () {
  },
  methods: {
    addClass(e) {
      this.setData({
        class: !this.data.class
      })
    },
    _allContent() {
      this.setData({
        content: this.data.ratings
      })
    },
    _recContent() {
      this.setData({
        content: this.data.ratings.filter((val) => {
          return val.rateType === 0
        })
      })
    },
    _spiContent() {
      this.setData({
        content: this.data.ratings.filter((val) => {
          return val.rateType === 1
        })
      })
    }
  }
})