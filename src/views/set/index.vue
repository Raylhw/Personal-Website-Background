<template>
  <div class="set-container app-container">
    <!-- 网站信息 -->
    <div class="set-block">
      <span class="set-title">网站信息</span>
      <!-- 网站标题 -->
      <div class="set-item">
        <span>网站标题</span>
        <el-input
          v-model="data.siteTitle"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
      <!-- 邮箱 -->
      <div class="set-item">
        <span>邮箱</span>
        <el-input
          v-model="data.mail"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
      <!-- 备案号 -->
      <div class="set-item">
        <span>备案号</span>
        <el-input
          v-model="data.icp"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
    </div>
    <!-- 网站头像信息 -->
    <div class="set-block">
      <span class="set-title">网站头像信息</span>
      <div class="set-item">
        <el-image
          style="width: 150px; height: 150px"
          :src="data.newAvatar"
          fit="contain"
          :preview-src-list="[data.newAvatar]"
        >
        </el-image>
      </div>
    </div>
    <!-- 网站图标信息 -->
    <div class="set-block">
      <span class="set-title">网站图标信息</span>
      <!-- 网站图标地址-->
      <div class="set-item">
        <span>网站图标地址</span>
        <el-input
          v-model="data.newFavicon"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
      <!-- 网站图标预览 -->
      <div class="set-item">
        <span>网站图标预览</span>
        <el-image
          style="width: 80px; height: 80px"
          :src="data.newFavicon"
          fit="contain"
          :preview-src-list="[data.newFavicon]"
        >
        </el-image>
      </div>
    </div>
    <!-- github 信息 -->
    <div class="set-block">
      <span class="set-title">github 信息</span>
      <!-- github 名字 -->
      <div class="set-item">
        <span>github 名字</span>
        <el-input
          v-model="data.githubName"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
      <!-- github 地址 -->
      <div class="set-item">
        <span>github 地址</span>
        <el-input
          v-model="data.github"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
    </div>
    <!-- QQ 信息 -->
    <div class="set-block">
      <span class="set-title">QQ 信息</span>
      <!-- QQ 号码 -->
      <div class="set-item">
        <span>QQ 号码</span>
        <el-input
          v-model="data.qq"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
      <!-- QQ 二维码图片预览 -->
      <div class="set-item">
        <span>QQ 二维码图片预览</span>
        <el-image
          style="width: 150px; height: 150px"
          fit="contain"
          :src="data.newQQQrCode"
          :preview-src-list="[data.newQQQrCode]"
        >
        </el-image>
      </div>
    </div>
    <!-- 微信信息 -->
    <div class="set-block">
      <span class="set-title">微信信息</span>
      <!-- 微信号 -->
      <div class="set-item">
        <span>微信号</span>
        <el-input
          v-model="data.weixin"
          readonly
          placeholder="请输入内容..."
        ></el-input>
      </div>
      <!-- 微信二维码图片预览 -->
      <div class="set-item">
        <span>微信二维码图片预览</span>
        <el-image
          style="width: 150px; height: 150px"
          :src="data.newWeixinQrCode"
          fit="contain"
          :preview-src-list="[data.newWeixinQrCode]"
        >
        </el-image>
      </div>
    </div>
    <!-- 编辑按钮 -->
    <el-button
      style="margin-top: 20px"
      type="primary"
      @click="editSettingHandle"
      >进入编辑模式</el-button
    >

    <!-- 弹出框 -->
    <el-dialog
      title="设置编辑"
      :close-on-click-modal="false"
      destroy-on-close
      top="10vh"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form.siteTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form.icp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站头像">
          <UploadImg v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="网站图标">
          <UploadImg v-model="form.favicon" />
        </el-form-item>
        <el-form-item label="github 信息">
          <el-input v-model="form.githubName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="github 地址">
          <el-input v-model="form.github" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ 信息">
          <el-input v-model="form.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ 二维码图片">
          <UploadImg v-model="form.qqQrCode" />
        </el-form-item>
        <el-form-item label="微信信息">
          <el-input v-model="form.weixin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码图片">
          <UploadImg v-model="form.weixinQrCode" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSettingConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSettings, setSettings } from "@/api/setting.js";
import { server_URL } from "@/urlConfig.js";
import UploadImg from "@/components/UploadImg";
export default {
  data() {
    return {
      data: {},
      form: {
        avatar: "", // 博主照片
        siteTitle: "", // 网站标题
        github: "", // 博主github主页
        qq: "", // 博主 qq
        qqQrCode: "", // 博主qq二维码
        weixin: "", // 博主微信号
        weixinQrCode: "", // 博主微信二维码
        mail: "", // 博主邮箱
        icp: "", // 网站备案号
        githubName: "", // 博主github名称
        favicon: "", // 网站图标
      },
      dialogFormVisible: false,
    };
  },
  components: {
    UploadImg,
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getSettings().then(({ data }) => {
        this.data = data;
        this.data.newAvatar = server_URL + this.data.avatar;
        this.data.newFavicon = server_URL + this.data.favicon;
        this.data.newQQQrCode = server_URL + this.data.qqQrCode;
        this.data.newWeixinQrCode = server_URL + this.data.weixinQrCode;
      });
    },
    editSettingHandle() {
      this.form = { ...this.data };
      console.log(this.form);
      this.dialogFormVisible = true;
    },
    editSettingConfirm() {
      setSettings(this.form).then(() => {
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
        this.fetchData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.set-block {
  padding-bottom: 25px;
  border-bottom: 1px solid #c4c5c7;
  span {
    display: block;
    margin: 15px 0;
    font-weight: 100;
  }
  .set-title {
    font-size: 25px;
  }
}
</style>