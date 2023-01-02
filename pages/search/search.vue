<template>
  <view class="">
    <uni-easyinput prefixIcon="search" v-model="text" placeholder="请输入内容" @iconClick="onClick"></uni-easyinput>
  </view>
  <view class="">
  </view>
  <view class="" v-for="(item,index) in list" :key="item._id">
    <view class="" v-if="(item.title.indexOf(text) != -1 || item.text.indexOf(text) != -1)&& text">
      <uni-card :title="item.title" mode="style" :is-shadow="true" thumbnail="" :extra="item.jointime" note="Tips"
        @click="test()">
        <!-- <img src="/static/avatar6.jpg" alt=""> -->
        {{ item.text }}
      </uni-card>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
        list: [],
        uid: '',
        params: ''
      }
    },
    onLoad() {
      try {
        this.params = uni.getStorageSync('uni-id-pages-userInfo');
        if (this.params) {
          console.log("本地有token");
        } else {
          console.log("本地无token");
        }
        console.log(this.params);
        let {
          username,
          nickname,
          _id
        } = this.params
        console.log("seaarch页面")
        console.log(username);
        console.log(nickname);
        console.log(_id);
        this.uid = _id;
        // 异步返回的值中this指向已经变了
        let that = this
        uniCloud.callFunction({
          name: "schedule",
          data: {
            api: "getMessage",
            uid: this.uid
          }
        }).then(res => {
          console.log("返回日程如下: ")
          console.log(res)
          // this.list = res.result.data
          that.list = res.result.data
        }).catch(err => {
          console.log(err)
        })
      } catch (e) {
        //TODO handle the exception
        console.log(e)
      }

    },
    onShow() {
      console.log("刷新页面")
      let page = getCurrentPages().pop()
      page.onLoad()
    },
    onPullDownRefresh() {
      uni.reLaunch({
        url: "/pages/search/search"
      })
      uni.stopPullDownRefresh()
    },
    methods: {
      onClick() {
        console.log("点击")
      }
    }
  }
</script>

<style>

</style>
