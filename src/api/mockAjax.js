import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
})
// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 进度条开始动
    nprogress.start()
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