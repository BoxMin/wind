/**
 * @作者 minbox
 * @创建时间 2019/12/28 11:48
 */

// import {promisic} from "./util";
//
// class Http {
//     static async request({
//         url,
//         method = 'GET'
//                          }) {
//         const res = await promisic(wx.request)({
//             url: url,
//             method
//         })
//         return res.data
//     }
// }

import {
    config
} from '../config/config.js'
import {
    promisic
} from './util'

class Http {
    static async request({
                             url,
                             data,
                             method = "GET"
                         }) {
        const res = await promisic(wx.request) ({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                "appkey": config.appkey
            },
        })
        return res.data
    }
}

// 动态语言里（js,python），将一个函数当做参数传入另一个函数里面是常见的

// callback
// promise
// async await
// 使用 await 要有返回的结果

export {
    Http
}



