import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入 detail 仓库 需要拿到 uuid
import store_detail from '@/store/detail'
import store_user from '@/store/user'
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})
// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 进度条开始动
    nprogress.start()
    // 请求前给请求头添加一个字段(userTempId)：和后台商量好的，不可乱写
    if (store_detail.state.uuid_token) {
        config.headers.userTempId = store_detail.state.uuid_token
    }
    // 判断是否需要携带token带给服务器
    if (store_user.state.token) {
        config.headers.token = store_user.state.token
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 进度条结束
    nprogress.done()
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default requests