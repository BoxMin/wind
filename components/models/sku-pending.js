/*
* 这个类用来储存选中的cell
*/
class SkuPending {

    pending = []

    constructor() {
    }

    insertCell(cell, x) {
        this.pending[x] = cell
    }

    removeCell(cell, x) {
        this.pending[x] = null
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {SkuPending}
