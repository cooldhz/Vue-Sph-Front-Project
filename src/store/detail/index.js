import { reqAddOrUpdateShopCar, reqGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
    goodsInfo: {},
    uuid_token: getUUID()
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 获取商品列表数据
    async getGoodsInfo(context, skuId) {
        const result = await reqGoodsInfo(skuId)
        if (result.data.code == 200) {
            context.commit('GETGOODSINFO', result.data.data)
        }
    },
    // 添加购物车
    async AddOrUpdateShopCar(context, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopCar(skuId, skuNum)
        // 返回的是一个Promise
        // 如果请求结果成功
        if (result.data.code) {
            // Promise返回 成功
            return 'ok'
            // 如果请求结果失败
        } else {
            // Promise返回 失败
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    // 路径导航的数据
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 商品信息的数据
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 产品售卖属性的数据
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}