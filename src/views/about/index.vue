<template>
  <div class="about-container app-container">
    <!-- 关于我 -->
    <div class="about-block">
      <span>关于我</span>
      <el-input
        v-model="data"
        readonly
        placeholder="您还没有输入地址..."
      ></el-input>
    </div>

    <!-- 编辑按钮 -->
    <div class="about-block">
      <el-button type="primary" @click="aboutEditHandle">
        {{ data ? "编辑" : "设置" }}
      </el-button>
    </div>

    <!-- 弹出框 -->
    <el-dialog
      title="请输入地址"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-input v-model="form.url"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="aboutEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAboutUrl, setAboutUrl } from "@/api/about.js";
export default {
  data() {
    return {
      data: "",
      form: {
        url: "",
      },
      dialogFormVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAboutUrl().then(({ data }) => {
        this.data = data;
      });
    },
    // 设置按钮点击事件
    aboutEditHandle() {
      this.form.url = this.data;
      this.dialogFormVisible = true;
    },
    // 确认
    aboutEditConfirm() {
      // 传输格式
      let dataObj = {
        url: this.form.url,
      };

      setAboutUrl(dataObj).then(() => {
        this.$message.success("设置成功");
        this.dialogFormVisible = false;
        this.fetchData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.about-block {
  margin-bottom: 15px;
  span {
    display: block;
    margin: 15px 0;
    font-weight: 100;
  }
}
</style>