import { reqSearchList } from '@/api'
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList(context, params = {}) {
        const result = await reqSearchList(params)
        if (result.status === 200) {
            context.commit('GETSEARCHLIST', result.data.data)
        }
    }
}
// getters 在项目中，为了简化数据而生
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    total(state) {
        return state.searchList.total || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}