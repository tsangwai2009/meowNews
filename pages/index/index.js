const NOTRECERIVED = 0
const SUCCESS = 1

Page({
  data: {
    newsItem:[],
    clientHeight:'',
    kind: ["gn","gj","cj","yl","js","ty","other"],
    tabs: [{ tab: 0, kind: "國內" }, { tab: 1, kind: "國際" }, { tab: 2, kind: "財經" }, 
      { tab: 3, kind: "娛樂" }, { tab: 4, kind: "軍事" }, { tab: 5, kind: "體育" },
      { tab: 6,kind: "其他" }],
    currentTab: 0,
    status: NOTRECERIVED
  },
  onLoad(options)//載入時獲取設備高度及發出請求獲得api信息
  { 
    this.getNews(this.data.kind[this.data.currentTab])
    var that = this 
    wx.getSystemInfo({ 
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight
            }); 
           console.log(res.windowHeight)
        } })
  },
  onPullDownRefresh()//下拉刷新
  { 
    this.getNews(this.data.kind[this.data.currentTab], () => { wx.stopPullDownRefresh(); })
  },
  //滑动切换
  swiperTab(e) {
    this.setData({
      currentTab: e.detail.current
    })
    this.getNews(this.data.kind[this.data.currentTab])
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
  getNews(code, callback) {//發出請求
    this.setData({ status: NOTRECERIVED })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: { "type": code },
      success: res => {
        let result = res.data.result;
        this.setNews(result,code)
        this.setData({status: SUCCESS})
      },
      fail() { this.setData({ status: NOTRECERIVED })}
      ,
      complete: () => { callback && callback() }//check function parameter exist
    })
  },
  setNews(result, code) //信息渲染
    {
      let newsItem = [] //anytype
      for (let i = 0; i <result.length; i++) {
        newsItem.push(//push items to array element
          {
            id:result[i].id,
            title: result[i].title,
            date: result[i].date,
            //default "佚名" if no source
            source: result[i].source != '' ? result[i].source : "佚名",
            //default "cat.png" if no image
            firstImage: result[i].firstImage != '' ? result[i].firstImage : '/images/cat.png',

          }
        )
      } 
      this.setData({ newsItem: newsItem})
    },
    newsDetail: function(event) {//跳轉至詳細內容
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
      })
    }
})
