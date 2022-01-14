<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%">
      <!-- 序号 -->
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <!-- 描述 -->
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <!-- 中图预览 -->
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg2"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 大图预览 -->
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.bigImg2"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top-start"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出的表单 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      top="5vh"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-row>
          <!-- 中图 -->
          <el-col :span="12">
            <el-form-item label="首页中图">
              <UploadImg v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <!-- 大图 -->
          <el-col :span="12">
            <el-form-item label="首页大图">
              <UploadImg v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner.js";
import { server_URL } from "@/urlConfig.js";
import UploadImg from "@/components/UploadImg";
export default {
  components: {
    UploadImg,
  },
  data() {
    return {
      data: [], //存储getBanner从服务器请求过来的数据
      dialogFormVisible: false, //是否显示对话框
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchData(); //在创建阶段请求数据
  },
  methods: {
    //获取banner数据
    fetchData() {
      getBanner().then((res) => {
        this.data = res.data;
        this.data.map((item) => {
          item.midImg2 = server_URL + item.midImg;
          item.bigImg2 = server_URL + item.bigImg;
        });
      });
    },
    //编辑事件
    editBannerHandle(bannerInfo) {
      this.form = { ...bannerInfo }; //数据回填,不影响原有对象
      this.dialogFormVisible = true; //打开对话框
    },
    // 提交编辑信息到服务器
    editBannerConfirm() {
      //获取当前的所有行的数据
      let arr = [...this.data];
      //将更改后的数据赋值给当前的数据
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form;
        }
      }
      //把更改后的数据,发送到服务器
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false; //关闭对话框
        this.$message({
          message: "编辑成功",
          type: "success",
        });
        this.fetchData(); //重新从服务器获取数据,渲染页面
      });
    },
  },
};
</script>

<style>
</style>