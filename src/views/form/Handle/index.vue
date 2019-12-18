<template>
  <div>
    <el-table :data="tableData" style="width: 150%">
      <el-table-column label="学号">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === updateShow"
            v-model="studentID"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].studentID }}</div>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === updateShow"
            v-model="upname"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="籍贯">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === updateShow"
            v-model="nativeplace"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else>{{ tableData[scope.$index].nativeplace }}</div>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <div v-if="scope.$index === updateShow" style="display:flex;">
            <el-radio v-model="upsex" label="男">男</el-radio>
            <el-radio v-model="upsex" style="margin-left:-15px;" label="女">女</el-radio>
          </div>
          <div v-else>{{ tableData[scope.$index].sex }}</div>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <div v-if="scope.$index === updateShow">
            <el-input
              v-if="scope.$index === updateShow"
              v-model="upage"
              size="mini"
              placeholder="请输入内容"
            />
          </div>
          <div v-else>{{ tableData[scope.$index].age }}</div>
        </template>
      </el-table-column>
      <el-table-column label="学制">
        <template slot-scope="scope">
          <div>{{ tableData[scope.$index].study }}</div>
        </template>
      </el-table-column>
      <el-table-column label="专业">
        <template slot-scope="scope">
          <div>{{ tableData[scope.$index].major }}</div>
        </template>
      </el-table-column>
      <el-table-column label="班级">
        <template slot-scope="scope">
          <div v-if="scope.$index === updateShow">
            <el-select v-model="upclass" size="mini" placeholder="班级">
              <el-option v-for="item in upclasses" :key="item" size="mini" :value="item" />
            </el-select>
          </div>
          <div v-else>{{ tableData[scope.$index].classes }}</div>
        </template>
      </el-table-column>
      <el-table-column label="市场部">
        <template slot-scope="scope">
          <div v-if="scope.$index === updateShow">
            <el-select v-model="upcityCenter" size="mini" placeholder="市场部">
              <el-option v-for="item in upcityCenters" :key="item" size="mini" :value="item" />
            </el-select>
          </div>
          <div v-else>{{ tableData[scope.$index].citycenter }}</div>
        </template>
      </el-table-column>
      <el-table-column label="当前成绩">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === updateShow"
            v-model="upchengji"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else style="text-align:center">{{ tableData[scope.$index].chengji }}</div>
        </template>
      </el-table-column>
      <el-table-column label="还差成绩">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === updateShow"
            v-model="upgraduation"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else style="text-align:center">{{ tableData[scope.$index].graduation }}</div>
        </template>
      </el-table-column>
      <el-table-column label="挂科次数">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === updateShow"
            v-model="upFail"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else style="text-align:center">{{ tableData[scope.$index].failss }}</div>
        </template>
      </el-table-column>
      <el-table-column label="入学时间">
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === updateShow"
            v-model="intime"
            size="mini"
            placeholder="请输入内容"
          />
          <div v-else style="text-align:center">{{ tableData[scope.$index].entryDate }}</div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button v-if="scope.$index === updateShow" size="mini" type="primary">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- size-change	pageSize 改变时会触发 -->
    <!-- current-change	currentPage 改变时会触发 -->
    <!-- 此例是一个完整的用例，使用了size-change和current-change事件来处理页码大小和当前页变动时候触发的事件。
    page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项，[100, 200, 300, 400]表示四个选项，每页显示 100 个，200 个，
    300 个或者 400 个。-->
    <el-pagination
      @size-change="handleSizeChange"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :page-sizes="[ 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="position:fixed;left:250px;bottom:20px;"
    />
    <!-- 导出excel表 -->
    <el-button
      v-if="power"
      size="mini"
      :loading="exportLodding"
      type="success"
      style="position:fixed;right:5px;bottom:20px;"
      @click="outExcel"
    >导出当页excel</el-button>
  </div>
</template>

<script>
import "./add.css";
import {
  selectAllstud, // 查询学生信息
  getPage, // 分页和学生
  getMajor, // 获取所有专业
  getMarketing, // 获取所有市场部
  getClass
} from "../../../api/api";

// 引入vuex
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      exportLodding: false,
      tableData: [], // 所有学生数据
      searchShow: 1, // 搜索模块是否显示 不为1就是不显示
      //  ·················································· 分页数据
      selectflag: false, // 标识, 用来给查询使用
      total: 1, // 数据总条数，默认给1
      pageSize: 10, // 每页展示条数 用来让total进行切割，算出来一共的页数
      currentPage: 1, // 当前在第几页,默认在第一页
      updateShow: 100000, // 当前展示的修改弹出项，给这么大是为了一开始谁也匹配不到
      intime: "", // 入学时间
      search: {
        // 搜索的v-model绑定值
        serName: "", // 姓名
        serStudy: "", // 学制
        serMajor: "", // 专业
        serClasses: "", // 班级
        sercityCenter: "", // 市场部
        serchengji: {
          $gte: 0, // 当前成绩 (>3,只是比喻,具体多少根据情况定)
          $lte: 40 // 当前成绩 (<15,只是比喻,具体多少根据情况定)
        },
        sergraduation: "", // 还差成绩
        serFailss: "" // 挂科次数
      },
      // 学制选项
      upstudys: [
        {
          value: "1"
        },
        {
          value: "2"
        },
        {
          value: "3"
        },
        {
          value: "4"
        }
      ],
      // 专业选项
      upmajors: [],
      // 班级选项
      upclasses: [],
      // 市场部选项
      upcityCenters: [],
      //  搜索挂科次数选项
      searFail: [
        {
          value: "0次"
        },
        {
          value: "1次"
        },
        {
          value: "2次"
        },
        {
          value: "3次及以上"
        }
      ],
      // 学生的下标
      index: 0,
      // 学生的id值
      id: "",
      // 查询到的对象
      objselect: {},
      // 操作按钮权限
      power: true
    };
  },
  // vuex 权限
  computed: {
    ...mapGetters(["roles"])
  },
  // '3' 代表的普通用户，普通用户登录会将操作按钮隐藏
  created() {
    if (this.roles.includes("3")) {
      this.power = false;
    }
  },
  mounted() {
    // 分页加学生接口调用
    this.getPage(this.currentPage, this.pageSize);
    // 专业接口调用
    this.Majors();
    // 班级接口调用
    this.Classs();
    // 市场部接口调用
    this.CityCenters();
  },
  methods: {
    handleSizeChange: function(size) {
      this.pageSize = size; // 每页下拉显示数据
      this.getPage(this.currentPage, this.pageSize);
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage; // 点击第几页
      this.getPage(this.currentPage, this.pageSize);
    },
    // 切割籍贯函数
    sliceJg(Array) {
      // for循环出来这个数组的长度
      for (let i = 0; i < Array.length; i++) {
        if (
          Array[i].nativeplace === "" ||
          Array[i].nativeplace === null ||
          Array[i].nativeplace === undefined
        ) {
          continue;
        } else if (
          // 否则就用includes获取到这个两个下标
          Array[i].nativeplace.includes("黑龙江") ||
          Array[i].nativeplace.includes("内蒙古")
        ) {
          // 要不然就截取nativeplace的长度,如果是黑龙江和内蒙古，就截取3个
          Array[i].nativeplace = Array[i].nativeplace.slice(0, 3);
        } else {
          // 否则就截取2个
          Array[i].nativeplace = Array[i].nativeplace.slice(0, 2);
        }
      }
      // 返回数组
      return Array;
    },
    async selectallstud(page, obj) {
      const searchSuc = await selectAllstud(page, obj);
      const sliceData = this.sliceJg(searchSuc.data.data); // 调用切割籍贯函数
      this.tableData = sliceData;
      this.currentPage = page;
      this.total = searchSuc.data.total;
    },
    // 调用子组件传过来的事件,用来写分页
    getcurrentPage(currentPage) {
      this.currentPage = currentPage;
      // 如果selectflag为true就调用查询函数
      if (this.selectflag) {
        this.selectallstud(currentPage, this.objselect);
        // 否则就调用获取学生加分页接口
      } else {
        this.getPage(currentPage);
      }
    },
    // 分页加学生接口调用
    async getPage(page, pageSize) {
      const { data } = await getPage(page, pageSize);
      if (data.code === 200) {
        const sliceData = this.sliceJg(data.data); // 调用切割籍贯函数
        this.tableData = sliceData;
        this.total = data.total;
      } else {
        this.$message.error("暂无数据!");
      }
    },
    // 获取专业
    async Majors() {
      const { data } = await getMajor();
      for (let i = 0; i < data.data.length; i++) {
        this.upmajors.push({
          value: data.data[i].majorname
        });
      }
    },
    // 获取班级
    async Classs() {
      const { data } = await getClass();
      for (let i = 0; i < data.data.length; i++) {
        this.upclasses.push({
          value: data.data[i].classname
        });
      }
    },
    // 获取市场部
    async CityCenters() {
      const { data } = await getMarketing();
      for (let i = 0; i < data.data.length; i++) {
        this.upcityCenters.push({
          value: data.data[i].marketname
        });
      }
    }
  }
};
</script>
