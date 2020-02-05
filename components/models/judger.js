import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";

class Judger {

    fengceGroup
    pathDict = [];//所有路径

    constructor(fengceGroup) {
        this.fengceGroup = fengceGroup;
        this.initPathDict();
    }

    /**
     * 初始化路径字典
     */
    initPathDict() {
        this.fengceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
        console.log(this.pathDict);
    }

    judge(cell,x,y) {
        this._changeCellStatus(cell,x,y)
    }

    _changeCellStatus (cell,x,y) {
        if (cell.status === CellStatus.WAITING){
            // cell.status = CellStatus.SELECTED
            this.fengceGroup.fences[x].cells[y].status = CellStatus.SELECTED
        }

        if (cell.status === CellStatus.SELECTED){
            // cell.status = CellStatus.WAITING
            this.fengceGroup.fences[x].cells[y].status = CellStatus.WAITING
        }
    }
}

export {
    Judger
}
