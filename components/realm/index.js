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
    fences: null,
    judger: Object
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
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
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
      const x = event.detail.x
      const y = event.detail.y
      this.data.judger.judge(cell,x,y)
      this.setData({
        fences: this.data.judger.fengceGroup.fences
      })
    }
  }
})
