<template>
  <div>
    <el-table v-loading="listLoading" :data="marketData" style="width: 150%">
      <el-table-column label="市场部">
        <template slot-scope="scope">
          <el-input v-if="scope.$index===updateShow" v-model="market" size="mini" placeholder="请输入内容" />
          <div v-else>{{ marketData[scope.$index].marketname }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" v-show="isUpdate !== scope.row._id" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="power" type="primary" class="addMarket" @click="open">添加市场部</el-button>
  </div>
</template>
<script>
import { getMarket, delMarket, addMarket } from '@/api/headAll.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      listLoading: false, // 加载状态
      updateShow: 100000,
      isUpdate: '',
      marketData: [], // 所有市场部
      market: '',
      power: true
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (this.roles.includes('3')) {
      this.power = false
    }
  },
  async mounted(){
    this.handlegetMarket()
    
  },
  methods: {
    async handlegetMarket(){
      const {data} = await getMarket()
      console.log(data)
      if(data.code === 200) {
        this.marketData = data.data
      }else if (data.code === 203) {
        this.$message.error(data.message)
      }
    },
    //删除一项
    handleDelete(id){
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(async res => {
        const { data } = await delMarket(id)
        if (data.code === 200) {
          this.handlegetMarket()
          return this.$message.success(data.msg)
        }
        this.$message({
          message: data.msg,
          type: 'error'
        })
      })
      .catch(error => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加市场部
     open() {
      this.$prompt('请输入市场部', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async ({ value }) => {
        if (value.trim() === '') {
          this.$message.error('提交信息中存在空项!')
          return false
        }
        const { data } = await addMarket(value)
        // 判断如果所填项是否为空或为空格，提示用户提交信息中存在空项
        if (data.code === 200) {
          // 判度code码如果为200，提示用户添加成功，并清空信息
          this.$message.success(data.message)
          this.handlegetMarket()
        } else if (data.code === 203) {
          // 判度code码如果为203，提示用户该专业已经存在，并清空信息
          this.$message.error(data.message)
          return false
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
     }
  }
};
</script>
<style>
.addMarket{
  margin-top: 50px;
  float: right;
  margin-right: 50px;
}
</style>
