<template>
  <div style="width=:100%;text-align:center;">
    <el-pagination
      style="width=:90%;"
      :current-page="currentPage"
      :page-size="pageSize"
      background
      layout="prev, pager, next" 
      :total="total"
      @current-change="current_change"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    total: Number,
    // eslint-disable-next-line vue/require-default-prop
    pageSize: Number,
    // eslint-disable-next-line vue/require-default-prop
    currentPage: Number,
    // eslint-disable-next-line vue/require-default-prop
    tableData: Array
  },
  data() {
    return {}
  },
  methods: {
    // 分页中拿到当前所在页数的函数
    async current_change(currentPage) {
      // 发送事件给父组件
      this.$emit('getcurrentPage', currentPage)
    }
  }
}
</script>
