const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
Page({
  data: {
    clientHeight:'',
    newsItem: [],
    currentTab: 0
  },
  onLoad(options)
   {
    this.setNews();
        var that = this 
    wx.getSystemInfo({ 
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight
            }); 
           console.log(res.windowHeight)
        } 
    })
  },
  //滑动切换
  swiperTab(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  setNews() {
    {
      let newsItem = []
      for (let i = 0; i < 18; i++) {
        let date = new Date()
        date.setDate(date.getDate() + i)
        newsItem.push(//push items to array element
          {
            time: dayMap[date.getDay()],
            content: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          }
        )
      } this.setData({ newsItem: newsItem })
    }
  }
})
