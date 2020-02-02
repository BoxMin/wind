import {Http} from "../utils/http";

// export class Activity {
//     static async getHomeLocationD(){
//         return await Http.request({
//             url: `http://127.0.0.1:3000/mock/11/activity`
//         })
//     }
// }
class Activity {
    static locationD = 'a-2'
    static async getHomeLocationD() {
        return await Http.request({
            url: `activity/name/${Activity.locationD}`
        })
    }
}

export {
    Activity
}