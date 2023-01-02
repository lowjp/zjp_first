<template>
  <!--  <view class="container">
    <uni-nav-bar dark :fixed="true" shadow background-color="#007AFF" status-bar left-icon="left" left-text="" title=""
      @clickLeft="back()" />
  </view> -->
  <view class="content">
    <!-- <button @click="login">login</button> -->
    <!-- 用户信息 -->
    <view class="flex1">
      <view class="flex11">
        <image :src="img" alt="" class="avatar"></image>
      </view>
      <view class="flex12">
        <view>{{"昵称: " + params.nickname}}</view>
        <view>{{"用户名: " + params.username}}</view>
      </view>
    </view>

    <!-- 设置区域 -->
    <view class="" style="margin: 10px">
      <view class=""><button @click="change_avatar">点我更换头像</button></view>
      <view class=""><button @click="change_pwd">点我更改密码</button></view>
      <view class=""><button @click="register()">注册用户</button></view>
      <view class=""><button @click="login()">用户登录</button></view>
      <!--      <unicloud-db v-slot:default="{data, loading, error, options}" collection="uni-id-users" field="avatar_file"
        where="username=='zjp'">
        <view v-if="error">{{error.message}}</view>
        <view v-else>
          {{data}}
        </view>
      </unicloud-db> -->

    </view>
  </view>
</template>

<script>
  // const db = uniCloud.database()
  export default {
    data() {
      return {
        uniIdRedirectUrl: '',
        params: {},
        avatar: '',
        username: '',
        query: "username=='princess'",
        img: ''
      }
    },
    onLoad(options) {
      // this.$forceUpdate() // 强制刷新页面
      console.log(options)
      this.uniIdRedirectUrl = decodeURIComponent(options.uniIdRedirectUrl)
      let params = uni.getStorageSync('uni-id-pages-userInfo')
      // this传值有可能太慢了
      this.params = params
      this.username = params.username
      this.img = params.avatar_file.url

      // console.log(this.params.username)
      // if (this.params.username) 
      if (JSON.stringify(params) !== "{}" &&
        params) {
        console.log("user页面")
        console.log("本地有token")
        console.log(this.params)
        console.log(params)
      } else {
        console.log("本地无token")
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        })
      }

      // db.collection('uni-id-users').where('username=="princess"').field('avatar_file').get()
      //   .then((res) => {
      //     console.log(res.result.data[0])
      //     console.log(res.result.data[0].avatar_file.url)
      //     this.img = res.result.data[0].avatar_file.url
      //   }).catch((err) => {
      //     console.log(err)
      //   })

    },
    onPullDownRefresh() {
      uni.reLaunch({
        url: "/pages/user/user"
      })
      uni.stopPullDownRefresh()
    },
    methods: {
      async login() {
        // ...执行登录操作，在成功回调里跳转页面
        if (this.uniIdRedirectUrl) {
          uni.redirectTo({
            url: this.uniIdRedirectUrl
          })
        }
      },
      back() {
        uni.navigateBack({
          delta: 1
        })
      },
      // 修改头像
      change_avatar() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar"
        })
      },
      // 修改密码
      change_pwd() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd"
        })
      },
      // 用户注册
      register() {
        uni.navigateTo({
          "url": "/uni_modules/uni-id-pages/pages/register/register"
        })
      },
      // 用户登录
      login() {
        uni.navigateTo({
          "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        })
      },
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /*  .avatar {
    wisth: 150px;
    height: 150px;
  } */

  image {
    display: inline-block;
    height: 80px;
    overflow: hidden;
    width: 80px;
  }

  .flex {
    display: flex;
  }

  .flex1 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-bottom: 1rpx solid wheat;
  }

  .flex11 {
    padding: 10rpx;
  }

  .flex12 {
    align-self: flex-end;
    padding: 10rpx;
  }
</style>
