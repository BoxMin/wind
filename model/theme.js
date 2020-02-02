
import {Http} from "../utils/http";

export class Theme{
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    themes = []

    // async getThemes() {
    //     this.themes =  await Http.request({
    //         url: `http://127.0.0.1:3000/mock/11/themes`
    //     })
    // }
    async getThemes() { //加不加static 在调用方home.js 里，是用实例化去调用，还是用类去调用，这里是用实例化去调用（下面加了static就是用类去调用，不用实例化---使用类去调用方法，还是实例化去调用方法，取决于你的数据是否需要通过类的对象去保存，还是不要保存，说白了，就是需要保存数据的时候，不使用static,用实例化去调用。不需要保存数据的时候就要去使用static了，使用类直接去调用）
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }


    async getHomeLocationA(){
        return await this.themes.find(t => t.name === Theme.locationA)
    }

    async getHomeLocationE(){
        return await this.themes.find(t => t.name === Theme.locationE)
    }

    async getHomeLocationF(){
        return await this.themes.find(t => t.name === Theme.locationF)
    }

    async getHomeLocationH(){
        return await this.themes.find(t => t.name === Theme.locationH)
    }

    // static getHomeLocationESpu(){
    //     return Theme.getWith_spu()
    // }
    //
    // static getWith_spu(){
    //     return Http.request({
    //         url: `http://127.0.0.1:3000/mock/11/with_spu`
    //     })
    // }

    static async getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.locationE)
    }
    static async getThemeSpuByName(name) {
        return await Http.request({
            url: `theme/name/${name}/with_spu`
        })
    }
}

