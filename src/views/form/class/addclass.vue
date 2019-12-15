<template>
  <div>
    <div class="add_class_s">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="ruleForm.classname" />
        </el-form-item>
        <el-form-item label="选择专业" prop="major">
          <el-select v-model="ruleForm.major" placeholder="选择专业">
            <el-option v-for="site in getMajor" :key="site.value" :label="site.majorname" :value="site.majorname" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" required>
          <el-col :span="11">
            <el-form-item prop="createDate">
              <el-date-picker v-model="ruleForm.createDate" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="讲师" prop="lecturer">
          <el-input v-model="ruleForm.lecturer" />
        </el-form-item>
        <el-form-item label="班主任" prop="headteacher">
          <el-input v-model="ruleForm.headteacher" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')">
            立即创建
          </el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { createClass, getMajor } from '../../../api/api.js'
export default {
  data(){
    return {
      createClass: [], // 创建班级数据
      getMajor: [],//选择专业
      ruleForm: {
        classname: '',//班级名称
        major: '',//专业
        lecturer: '',
        headteacher: '',
        createDate: ''
      },
      rules: {
        classname: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
          { min: 5, max: 7, message: '班级名称不规范', trigger: 'blur' }
        ],
        createDate: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        major: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ]
      },
      path: 'index'
    }
  },
  async mounted() {
    const {data} = await getMajor();
    this.getMajor = data.data
  },
  methods: {
    //创建班级
    submitForm(formName){
      this.$refs[formName].validate(async valid => {
        if(valid) {
          const { data } = await createClass(this.ruleForm);
          if(data === 203){
            return this.$message.error(data.message);
          }
          this.$message.success(data.message)
          this.$confirm('创建成功', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            size: 'mini'
          })
          .then(()=>{
            this.$router.push({
              path: this.path // 跳转路由
            })
          })
          .catch(() => {});
        }else{
          this.$message({
            type: 'info',
            message: '输入存在空项！'
          })
          return false
        }
      })
    },
    // 重置 input框
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>