<template>
  <div class="project-container app-container">
    <!-- 项目列表 -->
    <el-table :data="data" border style="width: 100%">
      <!-- 序号 -->
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column label="项目名称" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column label="项目描述" width="600" align="center">
        <template slot-scope="scope">
          <div class="descContent" v-html="scope.row.newDescription"></div>
        </template>
      </el-table-column>

      <!-- 预览图 -->
      <el-table-column label="预览图" width="200" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 150px; height: 150px"
            :src="scope.row.newThumb"
            fit="contain"
            :preview-src-list="[scope.row.newThumb]"
          >
          </el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- github -->
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top-start"
            :hide-after="2000"
          >
            <el-button
              type="info"
              size="mini"
              circle
              @click="githubHandle(scope.row.github)"
            >
              <svg-icon icon-class="github" />
            </el-button>
          </el-tooltip>

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
              @click="editHandle(scope.row)"
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
              @click="deleteHandle(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog
      title="请编辑项目信息"
      fullscreen
      destroy-on-close
      :visible.sync="dialogTableVisible"
    >
      <ProjectEditArea
        :form="form"
        mode="edit"
        btnName="保存"
        @editSuccess="editSuccessHandle"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getProjects, deleteProject } from "@/api/project.js";
import { server_URL } from "@/urlConfig.js";
import ProjectEditArea from "@/components/ProjectEditArea";

export default {
  data() {
    return {
      data: [], // 用于存储获取的数据
      form: {},
      dialogTableVisible: false,
    };
  },
  components: {
    ProjectEditArea,
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取数据
    fetchData() {
      // 将description数组转换成span结构
      function descHtmlContent(descArr) {
        let str = "";
        for (const i of descArr) {
          const spanContent = `<span>${i}</span>`;
          str += spanContent;
        }
        return str;
      }

      getProjects().then(({ data }) => {
        this.data = data; //获取数据
        // 需要处理一些数据
        for (const item of this.data) {
          // 处理数据中的 description
          item.newDescription = descHtmlContent(item.description);
          // 处理数据中的 thumb
          item.newThumb = server_URL + item.thumb;
        }
      });
    },
    // github按钮点击事件
    githubHandle(url) {
      window.open(url);
    },
    // edit按钮点击事件
    editHandle(projectInfo) {
      this.form = {
        ...projectInfo,
        description: projectInfo.description.join(";"),
      };
      this.dialogTableVisible = true;
    },
    // edit完成后执行事件
    editSuccessHandle() {
      this.dialogTableVisible = false;
      this.fetchData();
    },
    // delete按钮点击事件
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(id).then(() => {
            this.$message.success("删除成功");
            this.fetchData();
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

<style lang="scss">
.descContent {
  span {
    display: block;
    margin-top: 5px;
  }
}
</style>