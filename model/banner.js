/**
 * @作者 minbox
 * @创建时间 2019/12/28 11:19
 */
import {Http} from "../utils/http";

// class Banner {
//     static async getHomeLocationB() {
//         return await Http.request({
//             url: `http://127.0.0.1:3000/mock/11/banner`
//         })
//     }
//
//     static async getHomeLocationG() {
//         return await Http.request({
//             url: `http://127.0.0.1:3000/mock/11/banner2`
//         })
//     }
// }

class Banner {
    static LocationB = 'b-1'
    static LocationG = 'b-2'
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.LocationB}`
        })
    }

    static async getHomeLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.LocationG}`
        })
    }
}

export {
    Banner
}