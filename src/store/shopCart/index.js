import { reqCartList, reqAddOrUpdateShopCar, reqDeleteCart, reqChangeChecked } from "@/api"

let state = {
    cartInfoList: []
}
let mutations = {
    GETCARTLIST(state, cartInfoList) {
        state.cartInfoList = cartInfoList || [{}]
    }
}
let actions = {
    async getCartList(context) {
        const result = await reqCartList()
        if (result.data.code == 200) {
            context.commit('GETCARTLIST', result.data.data[0])
        }
    },
    // 更新购物车商品数量
    async AddOrUpdateShopCar(context, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopCar(skuId, skuNum)
        // 返回的是一个Promise
        // 如果请求结果成功
        if (result.data.code == 200) {
            // Promise返回 成功
            return 'ok'
            // 如果请求结果失败
        } else {
            // Promise返回 失败
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除购物车商品
    async deleteCart(context, skuId) {
        console.log(skuId);
        const result = await reqDeleteCart(skuId)
        if (result.data.code == 200) {
            // Promise返回 成功
            return 'ok'
            // 如果请求结果失败
        } else {
            // Promise返回 失败
            return Promise.reject(new Error('fail'))
        }
    },
    // 切换商品选中状态
    async ChangeChecked(context, { skuId, isChecked }) {
        const result = await reqChangeChecked(skuId, isChecked)
        // console.log(result);
        if (result.data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除全部已勾选商品
    deleteCheckedCart(context) {
        let arr = context.getters.cartList.cartInfoList.filter((item) => {
            return item.isChecked == 1
        })
        let promiseAll = []
        arr.forEach(item => {
            let promise = context.dispatch('deleteCart', item.skuId)
            // 将每一次返回的Promise追加到数组中
            promiseAll.push(promise)
        });
        // 只要全部的 p1,p2... 都成功, 返回结果即为成功
        return Promise.all(promiseAll)
    },
    // 全部商品的勾选状态修改
    changeAllChecked(context, isChecked) {
        let promiseAll = []
        context.getters.cartList.cartInfoList.forEach((item) => {
            let promise = context.dispatch('ChangeChecked', { skuId: item.skuId, isChecked })
            // 将每一次返回的Promise追加到数组中
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
let getters = {
    cartList(state) {
        return state.cartInfoList || {}
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}