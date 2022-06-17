<template>
  <div>
    <Type-nav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Floor v-for="f in floorList" :key="f.id" :floor="f" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/views/Home/ListContainer";
import TodayRecommend from "@/views/Home/TodayRecommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";

import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
  computed: {
    // ...mapState("home", ["floorList"]),
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
  mounted() {
    // 通知Vuex 发起ajax请求获取floor列表数据
    this.$store.dispatch("home/getFloorList");
  },
};
</script>

<style>
</style>