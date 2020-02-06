import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {

    fengceGroup
    pathDict = [];//所有路径
    skuPending

    constructor(fengceGroup) {
        this.fengceGroup = fengceGroup;
        this._initSkuPending()
        this.initPathDict();
    }

    _initSkuPending() {
        this.skuPending = new SkuPending()
    }

    /**
     * 初始化路径字典
     */
    initPathDict() {
        this.fengceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    judge(cell,x,y) {
        this._changeCurrentCellStatus(cell,x,y)
        this.fengceGroup.eachCell((cell, x, y) => {
            const path = this.findPotentialPath(cell, x, y)
            if (!path){
                return
            }
            const isIn = this._isInDict(path)
            if (isIn) {
                this.fengceGroup.fences[x].cells[y].status = CellStatus.WAITING
            } else {
                this.fengceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
            }
        })
    }

    _isInDict(path) {
        return this.pathDict.includes(path)
    }


    findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fengceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                //当前行
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    // 点击的时候改变cell的状态，这里的cell由cell组件传入
    _changeCurrentCellStatus (cell,x,y) {
        // 可选 -> 选中
        if (cell.status === CellStatus.WAITING){
            // cell.status = CellStatus.SELECTED
            this.fengceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            //
            this.skuPending.insertCell(cell, x)
        }
        // 选中 -> 可选
        if (cell.status === CellStatus.SELECTED){
            // cell.status = CellStatus.WAITING
            this.fengceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.skuPending.removeCell(cell, x)
        }
    }
}

export {
    Judger
}
