import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    fences: null
  },

  /**
   * 监听器,处理数据
   */
  observers: {
    'spu': function (spu) {
      if(!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      console.log(fenceGroup)
      const judger = new Judger(fenceGroup)
      this.bindInitData(fenceGroup)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData: function(fencesGroup) {
      this.setData({
        fences: fencesGroup.fences,
      })
    },
    onCellTap (event) {
      const cell = event.detail.cell
    }
  }
})
