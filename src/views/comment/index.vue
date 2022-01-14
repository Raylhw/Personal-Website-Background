<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%">
      <!-- 序号 -->
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <!-- 头像 -->
      <el-table-column label="头像" width="80" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px"
            :src="scope.row.newAvatar"
            fit="contain"
            :preview-src-list="[scope.row.newAvatar]"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 昵称 -->
      <el-table-column label="昵称" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>

      <!-- 评论文章 -->
      <el-table-column label="评论文章" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.blog.title }}</template>
      </el-table-column>

      <!-- 评论内容 -->
      <el-table-column label="评论内容" width="400" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>

      <!-- 评论日期 -->
      <el-table-column label="评论日期" width="230" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 删除 -->
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
              @click="deleteCommentHandle(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="count"
      :current-page.sync="currentPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getComments, deleteComment } from "@/api/comment.js";
import { server_URL } from "@/urlConfig.js";
import { formatTimes } from "@/utils/tools.js";
export default {
  data() {
    return {
      data: [], //存储获取的数据
      currentPage: 1, //当前页码
      eachPage: 10, //每页多少条数据
      totalPage: 0, //总页数
      count: 0, //总数据量
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 分页获取评论数据
    fetchData() {
      getComments(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows; //数据
        for (const item of this.data) {
          // 处理avatar
          item.newAvatar = server_URL + item.avatar;
          // 处理createDate
          item.createDate = formatTimes(item.createDate);
        }

        //分页
        this.count = data.total; //总数据量
        this.totalPage = Math.ceil(this.count / this.eachPage); //总页数
        // 当前页码大于总页数时触发
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 删除按钮点击事件
    deleteCommentHandle(id) {
      this.$confirm("此操作将永久删除该条评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 提交删除信息到服务器
          deleteComment(id).then(() => {
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
    // 分页相关事件
    sizeChangeHandle(pageSize) {
      //pageSize接收的是:当前点击选择的每页页码数是多少
      this.currentPage = 1;
      this.eachPage = parseInt(pageSize);
      this.fetchData();
    },
    currentChangeHandle(pageNumber) {
      //pageNumber接收的是:当前点击选择的页码是第几页
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage--;
    },
    nextClickHandle() {
      this.currentPage++;
    },
  },
};
</script>

<style>
</style>