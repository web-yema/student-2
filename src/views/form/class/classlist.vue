<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="classData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="班级名称" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.classname }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.createDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.major }}</div>
        </template>
      </el-table-column>
      <el-table-column label="讲师" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.lecturer }}</div>
        </template>
      </el-table-column>
      <el-table-column label="班主任" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.headteacher }}</div>
        </template>
      </el-table-column>
      <el-table-column label="班级成员" align="center">
        <template>
          <div>详情</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
              type="primary"
              size="mini"
              @click="update(scope.$index, scope.row)"
            >修 改</el-button>
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
          <el-form-item label="讲师" prop="lecturer">
            <el-input v-model="ruleForm.lecturer" />
          </el-form-item>
          <el-form-item label="班主任" prop="headteacher">
            <el-input v-model="ruleForm.headteacher" />
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
import {
  getClass, //所有班级
  delClass, // 删除班级
  classPage, // 班级分页
  updateClass // 修改班级信息
} from '../../../api/api.js'
export default {
  data() {
    return {
      listLoading: true, // 加载状态
      isUpdate: '',
      classData: [], // 所有班级
      show: false, // 弹窗
      ruleForm: {
        lecturer: '',
        headteacher: '',
        id: ''
      },
      rules: {
        lecturer: [
          { required: true, message: '请输入讲师', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        headteacher: [
          { required: true, message: '请输入班主任', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  mounted(){
    this.handlegetHeadClass()
  },
  methods:{
    async handlegetHeadClass(){
      let {data} = await getClass()
      console.log(data);
      this.classData = data.data;
      if(data.code === 200) {
        this.listLoading = false
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
        const { data } = await delClass(id)
        if (data.code === 200) {
          this.handlegetHeadClass()
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
    async op_click(vel) {
      this.xzmajor = vel
      this.currentPage = 1
      // eslint-disable-next-line no-undef
      // this.classPage(this.currentPage)
    },
    // 修改
    update(index, row) {
      this.rowlist = row
      this.show = true
      this.ruleForm.lecturer = row.lecturer
      this.ruleForm.headteacher = row.headteacher
      this.ruleForm.id = row._id
    },
    // 确定修改
    async submitForm() {
      const obj = {
        _id: this.ruleForm.id,
        lecturer: this.ruleForm.lecturer,
        headteacher: this.ruleForm.headteacher
      }
      console.log(obj)
      const { data } = await updateClass(obj)
      if (
        obj.lecturer === this.rowlist.lecturer &&
        obj.headteacher === this.rowlist.headteacher
      ) {
        this.$message.success(data.msg)
        this.show = false
      } else if (data.code === 200) {
        this.handlegetHeadClass()
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
};
</script>