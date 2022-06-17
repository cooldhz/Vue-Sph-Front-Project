<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="changeIsChecked(cartInfo.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cartInfo.skuNum"
              @change="handler('change', $event.target.value * 1, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deleteCart(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll && cartInfoList.length > 0"
          @change="changeAllChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCheckedCart">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  methods: {
    getData() {
      this.$store.dispatch("shopCart/getCartList");
    },
    handler: throttle(async function (type, disNum, cartInfo) {
      // disNum形参：+ 变化量(1)  -变化量(1) input最终的个数(并不是变化量)
      switch (type) {
        // 点击的是add
        case "add":
          disNum = 1;
          break;
        // 点击的是minus
        case "minus":
          // 如果出现产品的个数 <=1 传给服务器 0 (原封不动)
          disNum = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }
      console.log(disNum);
      try {
        await this.$store.dispatch("shopCart/AddOrUpdateShopCar", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        // 如果成功
        this.getData();
      } catch (error) {
        // 如果失败
        alert(error);
      }
    }, 1000),

    // 删除购物车商品
    async deleteCart(skuId) {
      if (confirm("确定删除吗?")) {
        try {
          await this.$store.dispatch("shopCart/deleteCart", skuId);
          this.getData();
        } catch (error) {
          alert(error);
        }
      }
    },
    // 修改商品选中状态
    async changeIsChecked(skuId, e) {
      let isChecked = e.target.checked ? "1" : "0";
      // console.log("isChecked", isChecked);
      try {
        await this.$store.dispatch("shopCart/ChangeChecked", {
          skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error);
      }
    },

    // 删除全部已勾选商品
    async deleteCheckedCart() {
      try {
        await this.$store.dispatch("shopCart/deleteCheckedCart");
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    // 全部商品的勾选状态修改
    async changeAllChecked(e) {
      let isChecked = e.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("shopCart/changeAllChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
  },
  computed: {
    ...mapGetters("shopCart", ["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算 总共的价格
    totalPrice() {
      let sum = 0;
      // 先过滤出选中的商品
      let arr = this.cartInfoList.filter((cart) => {
        return cart.isChecked === 1;
      });
      // // 然后计算商品的总和
      arr.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },

    // 判断全选框 是否勾选 (全部商品选中，才选)
    isCheckedAll() {
      //cartInfoList 里的 isChecked 只要有1个不为1 就返回false
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 16%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 11%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>