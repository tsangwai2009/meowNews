Page({

  data: {
    title: '',
    time: '',
    source: '',
    view: '',
    id:"",
    detailItem:[]
  },
  onLoad(options)//when first load
  {
    console.log(options.id);
    this.setData({ id: options.id })
    this.getDetail();
  },
  //pull down action
  onPullDownRefresh() {
    this.getDetail(() => { wx.stopPullDownRefresh(); });
  },
  //request for news detail
  getDetail(callback)
  {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result;
        console.log(result)
        this.setDetail(result)
      },
      complete: () => { callback && callback() }
    })
  },
  //內容渲染
  setDetail(result)
  { this.setData({
    title: result.title,
    time: result.date,
    source: result.source,
    view: `閱讀 ${result.readCount}`
  })
    let detailItem = []
    for (let i = 0; i < result.content.length; i++) {
      detailItem.push(//push items to array element
        { type: result.content[i].type,
          text: result.content[i].text != '' ? result.content[i].text:'',
          photo: result.content[i].src != '' ? result.content[i].src : ''
        }
      )
    } this.setData({ detailItem: detailItem })
  }
})