Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fence: Object
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 监听器,处理数据
   */
  observers: {
    'fence': function (fence) {
      console.log('cell: ', fence)
    }
  }
})
