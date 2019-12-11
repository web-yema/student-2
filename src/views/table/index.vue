<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.adminName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate !== scope.row._id">{{ scope.row.password }}</div>
        </template>
      </el-table-column>
      <el-table-column label="权限" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate !== scope.row._id">{{ scope.row.power }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" v-show="isUpdate !== scope.row._id" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllAdmin,delAdmin } from '@/api/user'

export default {
  data() {
    return {
      listLoading: true, // 加载状态
      isUpdate: '',
      tableData: [], // 所有用户
      update: {
        power: ''
      },
      value: '', // 权限
      adminName:'', // 名称
      password:'' // 密码 
    }
  },
  mounted(){
    this.handlegetHeadTeacher()
  },
  methods:{
    async handlegetHeadTeacher(){
      let {data} = await getAllAdmin()
      console.log(data.data);
      this.tableData = data.data;
      if(data.code === 200) {
        this.listLoading = false
      }
      for(var i=0;i<this.tableData.length;i++) {
        let tableDatas = this.tableData[i].power
        if(tableDatas === '2'){
          tableDatas = '管理员'
        }else if(tableDatas === '3'){
          tableDatas = '普通用户'
        }
        this.tableData[i].power = tableDatas
      }
    },
    //删除一项
    handleDelete(id) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async res => {
        const { data } = await delAdmin(id)
        if (data.code === 200) {
          this.handlegetHeadTeacher()
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
    }
  }
}
</script>
