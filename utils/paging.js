import {Http} from "./http";

class Paging {
    //不关心细节
    //嗨， 我需要下一页的数据了，你能给我吗
    // 状态
    // 实例化
    // new Paging

    start
    count
    req
    locker = false
    url
    moreData = true
    accumulator = []


    constructor(req, count = 10, start = 0) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }

    // 获取更多数据
    async getMoreData() {
        // getLocker
        // request
        // releaseLocker
        if(!this.moreData){
            return
        }
        if(!this._getLocker()){
            return
        }
        const data =await this._actualGetData()
        this._releaseLocker()
        return data
    }

    // 实际获得数据
    async _actualGetData() {
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if(!paging){
            return null
        }
        if(paging.total === 0){
            return {
                empty:true,
                //当前请求的数据
                items:[],
                moreData:false,
                //请求的数据累加
                accumulator:[]
            }
        }

        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if(this.moreData){
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            empty:false,
            items: paging.items,
            moreData:this.moreData,
            accumulator:this.accumulator
        }
    }

    _accumulate(items){
        this.accumulator = this.accumulator.concat(items)
    }

    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage-1
    }

    // 自定义获取url函数
    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if(url.includes('?')){
            url += '&' + params
            // contains
        }
        else{
            url += '?' + params
        }
        this.req.url  = url
        return this.req
    }

    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }

}

export {
    Paging
}
