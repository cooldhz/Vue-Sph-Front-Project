import { reqCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { getToken, removeToken, setToken } from "@/utils/token"

let state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
let mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETTOKNE(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除用户user相关数据
    CLEAR(state) {
        state.code = ''
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
let actions = {
    // 获取验证码
    async getCode(context, phone) {
        let result = await reqCode(phone)
        if (result.data.code == 200) {
            context.commit('GETCODE', result.data.data)
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    // 注册
    async userRegister(context, data) {
        let result = await reqUserRegister(data)
        if (result.data.code == 200) {
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    // 登录
    async userLogin(context, data) {
        const result = await reqUserLogin(data)
        // console.log(result);
        if (result.data.code == 200) {
            // 获取到Token存储到仓库中
            context.commit('GETTOKNE', result.data.data.token)
            // 持久化存储 Token
            setToken(result.data.data.token)
        }
    },
    // 获取用户信息
    async userInfo(context) {
        const result = await reqUserInfo()
        if (result.data.code == 200) {
            context.commit('GETUSERINFO', result.data.data)
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout(context) {
        const result = await reqLogout()
        if (result.data.code == 200) {
            context.commit('CLEAR')
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    }
}
let getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}