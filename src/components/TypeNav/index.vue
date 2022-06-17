<template>
  <div class="type-nav">
    <!-- <h1>{{categoryList}}</h1> -->
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    href="javascript:;"
                    :data-categoryname="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}--{{ index }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryname="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryname="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // changeIndex(index) {
    //   // console.log(index);
    //   this.currentIndex = index;
    // },
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(index);
    }, 20),

    leaveIndex() {
      this.currentIndex = -1;
      // 如果当前路由不是首页home，那么鼠标移出商品分类会隐藏
      if (this.$route.name !== "home") {
        this.show = false;
      }
    },

    goSearch(e) {
      //  我们可以 给 a标签给个自定义属性
      const element = e.target;
      const { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // console.log(categoryname);
      // 只要点击的这个元素身上带有 categoryname 一定是 a 标签
      if (categoryname) {
        // 准备路由跳转的参数对象
        const location = { name: "search" };
        const query = { categoryName: categoryname };
        // 一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          // 一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          // 一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        // 动态给 location对象添加 query属性
        location.query = query;
        // 路由跳转
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
    enterShow() {
      // 鼠标移入商品分类，显示下面列表
      this.show = true;
    },
  },
  computed: {
    // ...mapState("home", ["categoryList"]),
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  mounted() {
    // TypeNav组件一加载，通知Vuex发送请求 把数组存到仓库中
    // this.$store.dispatch("home/CategoryList");

    // 当挂在完毕时，如果当前路由不是home首页，那么就让商品列表分类 隐藏
    if (this.$route.name !== "home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 31px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 动画开始状态(进入)
    .sort-enter {
      height: 0;
    }
    // 动画结束状态(离开)
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画的时间、速率
    .sort-enter-active {
      transition: all 0.3s ease-in-out;
      overflow: hidden;
    }
  }
}
</style>