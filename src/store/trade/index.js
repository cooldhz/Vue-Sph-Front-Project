import { reqAddress, reqTrade } from "@/api"

let state = {
    tradeInfo: {},
    addressInfo: []
}
let mutations = {
    GETADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETTRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    },
}
let actions = {
    // 获取地址信息
    async getAddress(context) {
        const result = await reqAddress()
        if (result.data.code == 200) {
            context.commit('GETADDRESS', result.data.data)
        }
    },
    // 获取订单交易页信息
    async getTradeInfo(context) {
        const result = await reqTrade()
        if (result.data.code == 200) {
            context.commit('GETTRADEINFO', result.data.data)
        }
    }
}
let getters = {
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}