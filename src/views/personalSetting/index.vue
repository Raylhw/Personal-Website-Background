<template>
  <div class="app-container personal-setting-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <!-- 账号 -->
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="ruleForm.loginId" class="block"></el-input>
      </el-form-item>

      <!-- 原密码 -->
      <el-form-item label="原密码" prop="oldPwd">
        <el-input
          type="password"
          v-model="ruleForm.oldPwd"
          class="block"
        ></el-input>
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item label="新密码" prop="newPwd">
        <el-input
          type="password"
          v-model="ruleForm.newPwd"
          class="block"
        ></el-input>
      </el-form-item>

      <!-- 再次输入密码 -->
      <el-form-item label="再次输入新密码" prop="confirmPwd">
        <el-input
          type="password"
          v-model="ruleForm.confirmPwd"
          class="block"
        ></el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item class="btn-group">
        <el-button ref="confirmBtn" type="primary" @click="confirmHandle"
          >确认</el-button
        >
        <el-button style="margin-left: 50px" @click="resetHandle"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateLogin } from "@/api/user.js";
export default {
  data() {
    return {
      form: {},
      ruleForm: {
        loginId: "",
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      rules: {
        loginId: [{ required: true, message: "请填写账号名", trigger: "blur" }],
        oldPwd: [{ required: true, message: "请填写旧密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请填写新密码", trigger: "blur" }],
        confirmPwd: [
          { required: true, validator: this.checkConfirmPwd, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.form = { ...this.user };
  },
  methods: {
    //确认密码规则校验
    checkConfirmPwd(rule, value, callback) {
      if (!value) {
        return callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.newPwd) {
        return callback(new Error("与新密码不匹配"));
      } else {
        return callback();
      }
    },
    //确认操作
    confirmHandle() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //传入数据格式
          let dataObj = {
            name: this.form.name,
            loginId: this.ruleForm.loginId,
            loginPwd: this.ruleForm.confirmPwd,
            oldLoginPwd: this.ruleForm.oldPwd,
          };
          //更新
          updateLogin(dataObj).then((res) => {
            if (typeof res === "string") {
              //原密码错误
              this.$message.error("原密码不正确");
              this.resetHandle();
            } else {
              this.$message.success("修改成功");
              this.$store.dispatch("user/logout"); //退出登录
              this.$router.push("/login");
            }
          });
        } else {
          this.$message.warning("请正确填写所有信息");
          return;
        }
      });
    },
    //重置操作
    resetHandle() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-setting-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  width: 400px;
}
.btn-group {
  display: flex;
  justify-content: center;
}
</style>