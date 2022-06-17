<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-show="startNoAndEndNo.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button v-show="startNoAndEndNo.start > 2">···</button>

    <button
      v-for="(page, index) in startNoAndEndNo.end"
      :key="index"
      v-show="page >= startNoAndEndNo.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-show="startNoAndEndNo.end < pageTotal - 1">···</button>
    <button
      v-show="startNoAndEndNo.end < pageTotal"
      @click="$emit('getPageNo', pageTotal)"
    >
      {{ pageTotal }}
    </button>
    <button
      :disabled="pageNo == pageTotal"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <h1>{{ startNoAndEndNo }}--当前页码{{ pageNo }}</h1>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算出总共多少页数据
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNoAndEndNo() {
      let start = 0;
      let end = 0;
      let { continues, pageNo, pageTotal } = this;
      if (continues > pageTotal) {
        start = 1;
        end = pageTotal;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          (start = 1), (end = continues);
        }
        if (end > pageTotal) {
          start = pageTotal - continues + 1;
          end = pageTotal;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>