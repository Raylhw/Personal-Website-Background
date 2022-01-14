<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入类名"
      v-model="input"
      class="input-with-select blogAddInput"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择等级">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
        <el-option label="6" value="6"></el-option>
        <el-option label="7" value="7"></el-option>
      </el-select>
    </el-input>

    <!-- 添加按钮 -->
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="addBlogTypeHandle"
      >添加</el-button
    >

    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%">
      <!-- 序号 -->
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <!-- 博客类别-->
      <el-table-column label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <!-- 文章数量 -->
      <el-table-column label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <!-- 编辑按钮 -->
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
              @click="editBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 删除按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top-start"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑--弹出框 -->
    <el-dialog
      title="编辑文章分类"
      :visible.sync="dialogFormVisible"
      top="5vh"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <!-- 分类名称 -->
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBlogTypeConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogTypes,
  addBlogType,
  editBlogType,
  deleteBlogType,
} from "@/api/blogType.js";
export default {
  data() {
    return {
      input: "",
      select: "1",
      data: [],
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 请求文章分类数据
    fetchData() {
      getBlogTypes().then(({ data }) => {
        this.data = data;
      });
    },
    // 添加文章分类
    addBlogTypeHandle() {
      if (this.input) {
        addBlogType({ name: this.input, order: this.select }).then((res) => {
          this.fetchData();
          this.$message({
            message: "添加分类成功",
            type: "success",
          });
        });
      } else {
        this.$message({
          message: "您还未输入类名,请输入类名",
          type: "warning",
        });
      }
    },
    // 编辑文章分类
    editBlogTypeHandle(blogTypeInfo) {
      this.form = { ...blogTypeInfo };
      this.dialogFormVisible = true; //打开对话框
    },
    // 确认编辑
    editBlogTypeConfirm() {
      editBlogType(this.form).then(() => {
        this.dialogFormVisible = false; //关闭对话框
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchData(); //重新从服务器获取数据,渲染页面
      });
    },
    // 删除文章分类
    deleteBlogTypeHandle({ id }) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 提交删除信息到服务器
          deleteBlogType(id).then(() => {
            // 重新获取数据,重新渲染
            this.fetchData();
            // 成功后的提示信息
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          // 取消后的提示信息
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.blogAddInput {
  width: 400px;
  margin-bottom: 20px;
}
</style>