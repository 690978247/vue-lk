<template>
  <div class="aid-login">
    <div class="login-info">
      <img src="@/assets/images/login/logo.png" alt="" class="logo1" />
      <div class="welcome-title">
        <div class="fs-56 fw-800 color2">Welcome to</div>
        <div class="fs-56 fw-800 color1 mb-24">USAdrop Ads Agency</div>
        <div class="color2 fw-500 mb-24">USAdrop Facebook Ads Account</div>
        <div class="fs-56 fw-800 color2 mb-48">USAdrop Ads-agency Service</div>
        <div class="btnContent">
          <div class="btnInfo">
            <img src="@/assets/images/login/icon1.png" alt="" />
            <div class="text">
              Up to <span class="color1">5%</span> Cash Back
            </div>
          </div>
          <div class="btnInfo">
            <img src="@/assets/images/login/icon2.png" alt="" />
            <div class="text"><span class="color1">0%</span> Charging Free</div>
          </div>
          <div class="btnInfo">
            <img src="@/assets/images/login/icon3.png" alt="" />
            <div class="text">Stable Ads Account</div>
          </div>
          <div class="btnInfo">
            <img src="@/assets/images/login/icon4.png" alt="" />
            <div class="text">No Spending Limits</div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-content">
      <img src="@/assets/images/login/logo.svg" alt="" class="logo2" />
      <p class="login-head">Welcome to USAdrop Ads-agency</p>
      <el-form
        label-position="top"
        :rules="rules"
        :model="formData"
        ref="formRef"
      >
        <el-form-item label="E-mail" class="option" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="Password" class="option" prop="password">
          <el-input v-model="formData.password" :show-password="true" />
        </el-form-item>
        <div class="login-bottom">
          <div class="btns">
            <el-button @click="signIn(formRef)">Sign In</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { logIn } from '@/api/common'
import router from '@/router/router'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
const formData = reactive({
  username: 'admin',
  password: '123456'
})
const formRef = ref<FormInstance>()
const rules = {
  username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const signIn = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const postData = {
        username: formData.username,
        password: formData.password
      }
      logIn(postData)
      ElMessage.success('登录成功!')
      router.push('/home/index')
    }
  })
}
</script>
<style lang="scss" scoped>
@import './common.scss';
$color1: #bc0c34;
$color2: #15104b;
.aid-login {
  width: 100%;
  height: calc(100vh - 94px);
  padding-top: 94px;
  background: url('@/assets/images/login/loginBg.png') no-repeat;
  background-size: cover;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-info {
    // width: 60%;
    margin-right: 80px;
    text-align: left;
    margin-top: -6%;
    .logo1 {
      width: 215px;
      height: 128px;
      margin-bottom: 40px;
    }
    .welcome-title {
    }
    .btnContent {
      display: flex;
      width: 620px;
      flex-wrap: wrap;
      justify-content: space-between;
      .btnInfo {
        background: #e0e3f2;
        box-shadow: 2px 3px 4px 0px #231d6540;
        width: 260px;
        border-radius: 16px;
        margin-bottom: 40px;
        font-size: 16px;
        color: $color2;
        display: flex;
        align-items: center;
        padding: 8px;
        img {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          padding-left: 8px;
          color: $color2;
          font-weight: 600;
          border-left: 1.5px solid $color2;
        }
      }
    }
  }
  .login-content {
    width: 500px;
    height: 708px;
    margin-top: -6%;
    background: #fff;
    border-radius: 30px;
    padding: 20px 40px;
    position: relative;
    .logo2 {
      width: 90px;
      height: 64px;
      position: absolute;
      left: 40px;
      margin-bottom: 30px;
    }
    .login-head {
      font-size: 26px;
      color: #000000;
      font-weight: 500;
      margin-top: 104px;
      margin-bottom: 40px;
      text-align: center;
    }
    .forget {
      width: 100%;
      text-align: right;
      position: absolute;
      top: 44px;
    }
    .option {
      width: 420px;
      height: 100px;
      margin: 0 auto 10px;
      padding-left: 3px;
      :deep(.el-input__wrapper) {
        // box-shadow: none;
        border-radius: 50px;
        font-family: 'Regular';
        -webkit-font-smoothing: antialiased;
        width: 100%;
        height: 42px;
        border: 1px solid #cccccc;
        // .el-input__inner {
        //   border-radius: 50px;
        //   font-family: 'Regular';
        //   -webkit-font-smoothing: antialiased;
        //   width: 100%;
        //   height: 48px;
        //   border: 1px solid #cccccc;
        // }
      }
    }
    .login-bottom {
      margin-top: 80px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      .el-button {
        width: 226px;
        height: 44px;
        background: $color2;
        font-size: 16px;
        margin-bottom: 8px;
        color: #ffffff;
        border-radius: 30px;
      }
      .small {
        font-size: 14px;
        color: #999999;
      }
    }

    .demo-ruleForm {
      :deep(.el-form-item) {
        margin-bottom: 0 !important;
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }
    }
  }
}
</style>
