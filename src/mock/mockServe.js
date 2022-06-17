import Mock from "mockjs";
// 把json数据格式引入进来
import banner from './banner.json'
import floor from './floor.json'

// mock 数据: 第一个参数是请求地址，第二个参数是返回的数据
Mock.mock('/mock/banner', { code: 200, data: banner }) // 模拟 首页轮播图banner数据
Mock.mock('/mock/floor', { code: 200, data: floor }) // 模拟 首页floor数据
// 模拟生成支付信息的接口
// Mock.mock('/mock/payment/weixin/createNative', {
//     code: 200,
//     data: {
//         "code": 200,
//         "message": "成功",
//         "data": {
//             "codeUrl": "weixin://wxpay/bizpayurl?pr=P0aPBJK",
//             "orderId": 71,
//             "totalFee": 23996,
//             "resultCode": "SUCCESS"
//         },
//         "ok": true
//     }
// })
// 模拟 订单支付成功
Mock.mock('/mock/payment/weixin/queryPayStatus', {
    code: 200,
    data: {
        "code": 200,
        "message": "支付成功",
        "data": null,
        "ok": true
    }
}) // 模拟