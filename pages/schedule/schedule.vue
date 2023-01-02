<template>
  <!-- 日程输入框 -->
  <view class="content">
    <input class="input" type="text" placeholder="日程" v-model="title">
  </view>

  <!--  <view v-for="item in list" :key="item._key" class="box">
    {{item.content}}
  </view> -->
  <!-- 日期选择 -->
  <view class="page container" style="margin: 10px;">
    <uni-section title="日期选择" type="line"></uni-section>
    <view class="example-body">
      <uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" />
    </view>
  </view>
  <!-- 事件状态选择 -->
  <view class="" style="margin: 10px;">
    <uni-section title="事件状态选择" type="line"></uni-section>
    <uni-data-checkbox v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
  </view>
  <!-- 日程描述 -->
  <view style="margin: 20px;">
    <uni-easyinput type="textarea" v-model="text" placeholder="日程描述"></uni-easyinput>
  </view>

  <view class="container">
    <button type="primary" @click="publish()" size="mini" style="margin-left:300px;margin-top: 20px;">发布</button>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        params: '',
        username: '',
        uid: '',
        sid: '',
        title: '',
        list: [],
        datetimerange: [],
        value: 0,
        range: [{
          "value": 0,
          "text": "重要紧急"
        }, {
          "value": 1,
          "text": "重要不紧急"
        }, {
          "value": 2,
          "text": "紧急不重要"
        }, {
          "value": 3,
          "text": "不重要不紧急"
        }],
        en: ["importantandurgent", "importantandnurgent", "nimportantandurgent", "free"],
        text: '',
        jointime: '',
        status: 'no',
        update: false,
      }
    },

    watch: {
      datetimerange(newval) {
        console.log('范围选:', this.datetimerange)
      },
      value(newval) {
        console.log('日程状态值: ', this.value, this.range[this.value].text)
      }
    },

    onLoad(options) {
      let d = new Date()
      let year = d.getFullYear()
      let month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)
      let date = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
      let hours = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()
      let minutes = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()
      let seconds = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds()
      let time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds

      console.log('当前时间: ' + time)
      // 判断是否登录
      this.params = uni.getStorageSync('uni-id-pages-userInfo')
      // console.log(this.params.username)
      // if (this.params.username) 
      if (this.params) {
        console.log("user页面")
        console.log("本地有token")
        console.log(this.params)
      } else {
        console.log("本地无token")
        uni.navigateTo({
          "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        })
      }
      // 获取用户数据
      this.username = this.params.username
      this.uid = this.params._id
      this.datetimerange = [time, time]
      this.jointime = time
      console.log(this.uid)
      // 获取页面传递参数
      console.log(options)
      if (JSON.stringify(options) !== "{}") { // 判断非空对象需转换为字符串
        let data = JSON.parse(options.data)
        console.log("传递的options如下")
        console.log(data)
        this.title = data.title
        this.datetimerange = data.datetimerange
        this.value = this.en.indexOf(data.level)
        this.text = data.text
        this.status = data.status
        // 日程id
        this.sid = data._id
        // 判断意图是否为更新日程
        this.update = true
      } else {
        console.log("没有传递options")
      }

    },
    methods: {
      publish() {
        // console.log("日程名称", this.title)
        // console.log("日程日期", this.datetimerange)
        // console.log("日程状态", this.range[this.value].text)
        // console.log("日程标记", this.en[this.value])
        // console.log("日程详情", this.text)
        if (this.update) {
          console.log("更新日程")
          uniCloud.callFunction({
            name: "schedule",
            data: {
              api: 'update',
              title: this.title,
              datetimerange: this.datetimerange,
              level: this.en[this.value],
              text: this.text,
              status: this.status,
              sid: this.sid
            }
          }).then(res => {
            console.log(res)
            console.log("更新数据成功")
            uni.showToast({
              title: "更新成功"
            })

            function fun() {
              // uni.switchTab({ // tabbar页面需要使用swtchTab跳转
              //   url: "/pages/index/index",
              //   success() {
              //     let page = getCurrentPages().pop(); // 页面跳转成功后
              //     if (!page) return;
              //     page.onLoad(); // 如果页面存在，则重新刷新页面
              //   }
              // })
              uni.reLaunch({
                url: "/pages/index/index"
              })
            }
            setTimeout(fun, 2000)
          }).catch(err => {
            console.log(err)
          })
        } else {
          uniCloud.callFunction({
            name: 'schedule',
            data: {
              api: 'publish',
              uid: this.uid,
              title: this.title,
              datetimerange: this.datetimerange,
              level: this.en[this.value],
              text: this.text,
              status: this.status,
              jointime: this.jointime,
            }
          }).then(res => {
            console.log(res)
            console.log("提交成功")
            uni.showToast({
              title: "发布成功"
            })

            function fun() {
              // uni.switchTab({ // tabbar页面需要使用swtchTab跳转
              //   url: "/pages/index/index",
              //   success() {
              //     let page = getCurrentPages().pop(); // 页面跳转成功后
              //     if (!page) return;
              //     page.onLoad(); // 如果页面存在，则重新刷新页面
              //   }
              // })
              uni.reLaunch({
                url: "/pages/index/index"
              })
            }
            setTimeout(fun, 2000)
          }).catch(err => {
            console.log(err)
          })
        }

      }
    }
  }
</script>

<style>
  .input {
    border-bottom: 1px solid #ccc;
    padding: 6rpx;
    flex: 1;
  }

  .content {
    display: flex;
    align-items: center;
    margin: 40rpx;
  }

  .box {
    margin: 40rpx;
    border-bottom: 1px solid #ccc;
    padding: 20rpx 0;
  }

  .example-body {
    background-color: #fff;
    padding: 10px;
  }
</style>
