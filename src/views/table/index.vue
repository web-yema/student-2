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
          <el-button
              type="primary" size="mini" @click="Modify(scope.$index, scope.row)">修 改</el-button>
          <el-button size="mini" type="danger" v-show="isUpdate !== scope.row._id" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
      <el-dialog title="修改操作" :visible.sync="show" width="30%">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="adminName">
            <el-input v-model="ruleForm.adminName" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item label="权限" prop="power">
            <el-select v-model="value" class="why_select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="secede('ruleForm')">取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="submitForm()"
          >修 改</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getAllAdmin,delAdmin,updateAdminPass } from '@/api/user'

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
      password:'', // 密码 
      show: false, // 弹窗
      ruleForm: {
        power: '',//权限
        password: '',//密码
        adminName:'',//用户名
        id: ''//当前用户的id值
      },
      rules: {
        lecturer: [
          { required: true, message: '请输入用户', trigger: 'blur' }
        ],
        headteacher: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 5, message: '密码以字母+数字，长度不能小于6位且不能大于16位', trigger: 'blur' }
        ]
      },
      options: [{
          value: '2',
          label: '管理员'
        }, {
          value: '3',
          label: '普通用户'
        }],
        value:''
    }
  },
  mounted(){
    this.handlegetHeadTeacher()
  },
  methods:{
    async handlegetHeadTeacher(){
      let {data} = await getAllAdmin()
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
    },
    Modify(index, row) {
      this.rowlist = row
      this.show = true
      this.value = row.power
      this.ruleForm.password = row.password
      this.ruleForm.adminName = row.adminName
      this.ruleForm.id = row._id
    },
    // 确定修改
    async submitForm() {
      const obj = {
        _id: this.ruleForm.id,
        adminName: this.ruleForm.adminName,
        password: this.ruleForm.password,
        power: this.value
      }
      console.log(obj)
      const { data } = await updateAdminPass(obj)
      console.log(data)
      if (
        obj.adminName === this.rowlist.adminName &&
        obj.password === this.rowlist.password&&
        obj.power === this.rowlist.power
      ) {
        this.$message.error('没有任何修改')
        this.show = false
      } else if (data.code === 2002) {
        this.handlegetHeadTeacher()
        this.$message.success(data.msg)
        this.show = false
      } else {
        this.$message.error(data.msg)
        return false
      }
    },
    // 取消修改
    secede(formName) {
      this.$refs[formName].resetFields()
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.show = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
  }
}
</script>
