import {Cell} from "./cell";

class Fence {
    cells = []
    specs
    title
    id

    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init() {
        this._initCells()
    }


    _initCells() {
        // some 与 every 都会循环这个数组
        // some 只要求这个数组下面的某一个元素符合这个表达式就会立即返回true
        // every 要求这个数组下面所有元素全部都符合这个表达式才会返回true 否则返回false
        this.specs.forEach(s => {
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if(existed){
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }


}

export {
    Fence
}
