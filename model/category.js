import {Http} from "../utils/http";

// export class Category{
//     static async getHomeLocationC() {
//         return await Http.request({
//             url: `http://127.0.0.1:3000/mock/11/category`
//         })
//     }
// }

class Category {
    static async getHomeLocationC() {
        return await Http.request({
            url: `category/grid/all`
        })
    }
}

export {
    Category
}