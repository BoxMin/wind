import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";


Page({

  /**
   * 页面的初始数据
   */
  data: {
      themeA: null,
      themeE: null,
      bannerB: null,
      grid: [],
      activityD: null,
      paging: null,
      loadingType: 'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad() {
   this.initAllData()
   this.initBottomSpuList()
  },

 async initBottomSpuList(){
     const paging = SpuPaging.getLatestPaging()
     this.data.spuPaging = paging
     const data = await paging.getMoreData()
     if (!data) {
         return
     }
     // const paging = await SpuPaging.getLatestPaging()
     wx.lin.renderWaterFlow(data.items)
 },

  async initAllData() {
      const theme = new Theme()
      await theme.getThemes()

      const themeA = await theme.getHomeLocationA()
      const themeE = await theme.getHomeLocationE()
      let themeESpu = []
      if (themeE.online){
          const data = await Theme.getHomeLocationESpu()
          if (data){
              themeESpu = data.spu_list.slice(0,8)
          }
      }
      const themeF = await theme.getHomeLocationF()
      const themeH = await theme.getHomeLocationH()
      const bannerB = await Banner.getHomeLocationB()
      const bannerG = await Banner.getHomeLocationG()
      const grid = await Category.getHomeLocationC()
      const activityD = await Activity.getHomeLocationD()
      this.setData({
          themeA,
          themeE,
          themeF,
          themeH,
          themeESpu,
          bannerB,
          bannerG,
          grid,
          activityD
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
      const data = await this.data.spuPaging.getMoreData()
      if(!data){
          return
      }
      wx.lin.renderWaterFlow(data.items)
      if(!data.moreData){
          this.setData({
              loadingType:'end'
          })
      }
  },


    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
