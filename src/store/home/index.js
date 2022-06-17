import { reqBannerList, reqCategoryList, reqFloorList } from "@/api/index"
const state = {
    // home首页 三级分类列表数据
    categoryList: [],
    // home首页 banner轮播图列表数据
    bannerList: [],
    // home首页 floor列表数据
    floorList: []
}
const mutations = {
    // 修改三级列表数据
    GETCATEGORYLIST(state, CategoryList) {
        state.categoryList = CategoryList
    },
    // 修改banner轮播图列表数据
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    // 修改 floor列表数据
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    // 获取三级列表数据
    async CategoryList(context) {
        let result = await reqCategoryList()
        if (result.status === 200) {
            result = result.data.data.slice(0, 15)
            context.commit('GETCATEGORYLIST', result)
        }
    },
    // 获取banner列表数据
    async getBannerList(context) {
        const result = await reqBannerList()
        if (result.status === 200) {
            context.commit('GETBANNERLIST', result.data.data)
        }
    },
    // 获取 floor列表数据
    async getFloorList(context) {
        const result = await reqFloorList()
        if (result.status === 200) {
            context.commit('GETFLOORLIST', result.data.data)
        }
    }
}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}