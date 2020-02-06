import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    /**
     * matrix 数组 实例并不是真正的格式
     * 金属灰 七龙珠 小号S
     * 青芒色 灌篮高手 中号M
     * 青芒色 圣斗士 大号L
     * 橘黄色 七龙珠 小号S
     */
    initFences1() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1
        matrix.each((element, i, j) => {
            if (currentJ != j) {
                // 开启一个新列，需要创建一个新的Fence
                currentJ = j
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
    }

    // 使用矩阵转置
    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const AT = matrix.transpose()
        AT.forEach(r=>{
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
        this.fences = fences;
    }

    _createFence(element) {
        const fence = new Fence()
        return fence
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++){
            for (let j = 0; j < this.fences[i].cells.length; j++){
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }

    /**
     * 创建矩阵
     */
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

}

export {
    FenceGroup
}
