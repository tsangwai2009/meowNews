
Page({
  data: {
    kindItem:[1,2,3,4,5,6,7],
    newsItemGn:[],
    newsItemGj:[],
    newsItemCj:[],
    newsItemYl:[],
    newsItemJs:[],
    newsItemTy:[],
    newsItemOther:[],
    clientHeight:'',
    kind: ["gn","gj","cj","yl","js","ty","other"],
    tabs: [{ kind: "國內" }, { kind: "國際" }, { kind: "財經" }, 
      { kind: "娛樂" }, { kind: "軍事" }, { kind: "體育" },
      { kind: "其他" }],
    currentTab: 0
  },
  onLoad(options)
  {
    for (let i = 0; i < 7; i++) { this.getNews(this.data.kind[i])}
    var that = this 
    wx.getSystemInfo({ 
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight
            }); 
           console.log(res.windowHeight)
        } })
  },
  onPullDownRefresh()
  { 
    for (let i = 0; i < 7; i++) { this.getNews(this.data.kind[i], () => { wx.stopPullDownRefresh(); }) }
  },
  //滑动切换
  swiperTab(e) {
    this.setData({
      currentTab: e.detail.current
    })
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
  getNews(code,callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: { "type": code },
      success: res => {
        let result = res.data.result;
        console.log(result);
        this.setNews(result,code)
      },
      complete: () => { callback && callback() }//check function parameter exist
    })
  },
  setNews(result,code) 
    {
      let newsItem = [] //anytype
      for (let i = 0; i <result.length; i++) {
        newsItem.push(//push items to array element
          {
            id:result[i].id,
            title: result[i].title,
            date: result[i].date,
            source: result[i].source,
            firstImage: result[i].firstImage

          }
        )
      } 
    if (code=="gn") this.setData({ newsItemGn: newsItem})
    if (code == "gj") this.setData({ newsItemGj: newsItem })
    if (code == "cj") this.setData({ newsItemCj: newsItem })
    if (code == "yl") this.setData({ newsItemYl: newsItem })
    if (code == "js") this.setData({ newsItemJs: newsItem })
    if (code == "ty") this.setData({ newsItemTy: newsItem })
    if (code == "other") this.setData({ newsItemOther: newsItem })
    },
    newsDetail: function(event) {
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
      })
    }
})
