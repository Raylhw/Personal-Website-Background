<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%">
      <!-- 序号 -->
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>

      <!-- 标题 -->
      <el-table-column label="标题" width="180" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="文章预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              slot="reference"
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <!-- 描述 -->
      <el-table-column label="描述" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <!-- 浏览量 -->
      <el-table-column label="浏览量" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <!-- 评论 -->
      <el-table-column label="评论量" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <!-- 所属分类 -->
      <el-table-column label="所属分类" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.category === null ? "未分类" : scope.row.category.name }}
        </template>
      </el-table-column>

      <!-- 创建日期 -->
      <el-table-column label="创建日期" width="230" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑 -->
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
              @click="editBlogHandle(scope.row.id)"
            ></el-button>
          </el-tooltip>

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
              @click="deleteBlogHandle(scope.row.id)"
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
import { getBlogs, deleteBlog } from "@/api/blog.js";
import { formatTimes } from "@/utils/tools.js";
import { server_URL, frontEnd_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [], //存储从文章列表请求过来的数据
      srcList: [], //预览图链接数组
      eachPage: 5, //每页显示条数
      currentPage: 1, //当前页码,默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 从服务器请求数据
    fetchData() {
      getBlogs(this.currentPage, this.eachPage).then(({ data }) => {
        //数据表格
        this.data = data.rows;
        this.data.map((i) => {
          i.createDate = formatTimes(i.createDate);
          i.thumb = server_URL + i.thumb;
          this.srcList.push(i.thumb);
        });

        //分页
        this.count = data.total; //数据总条数
        this.totalPage = Math.ceil(this.count / this.eachPage); //总页数
        // 当前页码大于总页数时触发
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 跳转到指定文章
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/blog/${blogInfo.id}`);
    },
    // 编辑按钮点击事件
    editBlogHandle(id) {
      this.$router.push({
        name: "EditBlog",
        params: {
          id,
        },
      });
    },
    // 删除按钮点击事件
    deleteBlogHandle(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 提交删除信息到服务器
          deleteBlog(id).then(() => {
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