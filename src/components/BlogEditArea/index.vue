<template>
  <div class="blog-edit-area-container app-container">
    <!-- 文章标题 -->
    <div class="blog-title blog-block">
      <span>*文章标题</span>
      <el-input v-model="form.title" placeholder="请输入内容"></el-input>
    </div>

    <!-- 文章编辑 -->
    <div class="blog-edit blog-block">
      <span>*文章编辑</span>
      <Editor
        ref="toastuiEditor"
        :initialValue="form.editorText"
        height="600px"
        :options="editorOptions"
      />
    </div>

    <!-- 文章描述 -->
    <div class="blog-desc blog-block">
      <span>*文章描述</span>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="form.description"
      >
      </el-input>
    </div>

    <!-- 文章头图 -->
    <div class="blog-pic blog-block">
      <span>文章头图</span>
      <UploadImg v-model="form.thumb" />
    </div>

    <!-- 文章分类 -->
    <div class="blog-selectType blog-block">
      <span>*选择分类</span>
      <el-select
        v-model="form.select"
        placeholder="请选择分类"
        @change="changeHandle"
      >
        <el-option
          v-for="item in blogType"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <!-- 发布按钮 -->
    <div class="blog-btn blog-block">
      <el-button type="primary" @click="blogConfirmHandle">
        {{ btnName }}
      </el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
import { Editor } from "@toast-ui/vue-editor";
import UploadImg from "@/components/UploadImg";
import { getBlogTypes } from "@/api/blogType.js";
import { addBlog, getBlog, editBlog } from "@/api/blog.js";

export default {
  props: {
    btnName: {
      type: String,
      default: "发布文章",
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id: null, //文章的id
      form: {
        title: "", //文章标题
        editorText: "", //文章内容编辑
        description: "", //文章描述
        thumb: "", //文章图片
        select: "", //选择分类id
      },
      blogType: [], //存放获取的分类数据
      editorOptions: {
        language: "zh-CN",
      },
    };
  },
  components: {
    Editor,
    UploadImg,
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取文章分类信息
    fetchData() {
      //获取分类
      getBlogTypes().then(({ data }) => {
        this.blogType = data;
      });
      //editBlog需要
      if (this.mode === "edit") {
        //获取该篇文章信息
        this.id = this.$route.params.id;
        getBlog(this.id).then(({ data }) => {
          this.form = data; //数据回填
          this.form.select = data.category === null ? "" : data.category.id;
          this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
        });
      }
    },
    //发布文章事件或者修改文章事件
    blogConfirmHandle() {
      //获取页面内容
      let html = this.$refs.toastuiEditor.invoke("getHTML"); //获取markdown编译器的html结构
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown"); //获取markdown编译器的markdown结构
      // 发送服务器的格式
      let dataObj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [], //传递空数组,在服务器会根据markdown生成toc
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      // 提交服务器
      if (
        dataObj.title &&
        dataObj.description &&
        dataObj.categoryId &&
        dataObj.htmlContent
      ) {
        if (this.mode === "edit") {
          editBlog(this.id, dataObj).then(() => {
            this.$message.success("修改成功");
            this.$router.push({ name: "BlogList" }); //跳转到文章列表
          });
        } else {
          addBlog(dataObj).then((res) => {
            this.$message.success("发布成功");
            this.$router.push({ name: "BlogList" }); //跳转到文章列表
          });
        }
      } else {
        this.$message.error(
          "请查看以下选项是否填写完整: '标题' '文章' '描述' '分类'"
        );
      }
    },
    //分类下拉选项的值改变后触发
    changeHandle() {
      this.$forceUpdate(); //强制渲染,以同步当前ui和数据
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-block {
  margin-bottom: 15px;
  span {
    display: block;
    margin: 15px 0;
    font-weight: 100;
  }
}
</style>