<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import Footer from "./components/Footer/index.vue";
import Header from "./components/Header/index.vue";
export default {
  name: "App",
  components: { Header, Footer },
  // 派发一个 action 获取商品分类的三级列表数据
  mounted() {
    this.$store.dispatch("home/CategoryList");
  },
};
</script>

<style>
</style>
