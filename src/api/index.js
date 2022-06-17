import requests from "./ajax";
import mockRequests from "./mockAjax";

// 获取首页 三级分类列表数据
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// 获取首页 banner轮播图列表数据
export const reqBannerList = () => mockRequests.get('/banner')
// 获取首页 floor 列表数据
export const reqFloorList = () => mockRequests.get('/floor')


// 获取搜索模块数据
// 请求地址：/api/list  请求方式：post
// 请求参数如下：
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }  
export const reqSearchList = (params) => requests({ url: '/list', method: 'post', data: params })


// 获取商品详情 请求地址：/api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 添加到购物车(对已有物品进行数量改动)
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表
export const reqCartList = () => requests({ url: "/cart/cartList", method: 'get' })

// 删除 购物车商品
// /api/cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqChangeChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码
// /api/user/passport/sendCode/{phone}
export const reqCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 注册用户
// /api/user/passport/register
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })

// 登录
// /api/user/passport/login
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

// 获取用户信息
// /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

// 退出登录
// /api/user/passport/logout
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' })


// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddress = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

// 获取订单交易页信息
// /api/order/auth/trade
export const reqTrade = () => requests({ url: `/order/auth/trade`, method: 'get' })

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取订单支付信息      
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 查询支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取我的订单列表
// /api/order/auth/{page}/{limit}
export const reqMyOrder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })




