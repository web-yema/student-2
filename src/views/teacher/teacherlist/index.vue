<template>
  <div class="top_option">
    <el-table v-loading="listLoading" :data="lecturerData" style="width: 150%">
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.lecturername }}</div>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.lecturersex }}</div>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.lecturerage }}</div>
        </template>
      </el-table-column>
      <el-table-column label="入职时间" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.entryDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{ scope.row.major }}</div>
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
      <el-dialog title="提示" :visible.sync="show" width="30%">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="修改姓名:" prop="lecturername">
            <el-input v-model="ruleForm.lecturername" />
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
  getLecturer, //获取所有讲师
  addLecturer, // 添加讲师
  delLecturer, // 删除讲师
  updateLecturer //修改讲师
} from '../../../api/headAll.js'
export default {
  data() {
    return {
      listLoading: false, // 加载状态
      isUpdate: '',
      lecturerData: [], // 所有讲师
      ruleForm: {
        lecturername: '',
        id: ''
      },
      show: false, // 弹窗
      rules: {
        lecturer: [
          { required: true, message: '请输入讲师', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
    this.handlegetLecturer()
  },
  methods: {
    async handlegetLecturer(){
      let {data} = await getLecturer()
      console.log(data);
      this.lecturerData = data.data;
      if(data.code === 200) {
        this.listLoading = false
      }
    },
    //删除一项
    handleDelete(id){
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(async res => {
        const { data } = await delLecturer(id)
        if (data.code === 200) {
          this.handlegetLecturer()
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
    // 修改
    update(index, row) {
      this.rowlist = row
      this.show = true
      this.ruleForm.lecturername = row.lecturername
      this.ruleForm.id = row._id
    },
    // 确定修改
    async submitForm() {
      const obj = {
        _id: this.ruleForm.id,
        lecturername: this.ruleForm.lecturername
      }
      console.log(obj)
      const { data } = await updateLecturer(obj)
      if (
        obj.lecturername === this.rowlist.lecturername 
      ) {
        this.$message.success(data.msg)
        this.show = false
      } else if (data.code === 200) {
        this.handlegetLecturer()
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