<template>
  <view class="calendar-content" v-if="showCalendar">
    <!-- <uni-section title="插入模式" type="line"></uni-section> -->
    <view>
      <!-- 插入模式 -->
      <uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
        @monthSwitch="monthSwitch" />
    </view>
    <view class="" v-for="(item,index) in list" :key="item._id">
      <view class="" v-if="item.datetimerange[0].substring(0, 10) == clickdate">
        <uni-card :title="item.title" mode="style" :is-shadow="true" thumbnail="" :extra="item.jointime" note="Tips"
          @click="test()">
          <!-- <img src="/static/avatar6.jpg" alt=""> -->
          {{ item.text }}
        </uni-card>
      </view>
    </view>
  </view>
</template>

<script>
  /**
   * 获取任意时间
   */
  function getDate(date, AddDayCount = 0) {
    if (!date) {
      date = new Date()
    }
    if (typeof date !== 'object') {
      date = date.replace(/-/g, '/')
    }
    const dd = new Date(date)

    dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

    const y = dd.getFullYear()
    const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
    const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return {
      fullDate: y + '-' + m + '-' + d,
      year: y,
      month: m,
      date: d,
      day: dd.getDay()
    }
  }
  export default {
    components: {},
    data() {
      return {
        showCalendar: false,
        info: {
          lunar: true,
          range: true,
          insert: false,
          selected: []
        },
        params: '',
        uid: '',
        list: [],
        clickdate: ''
      }
    },
    onReady() {
      this.$nextTick(() => {
        this.showCalendar = true
      })
      // TODO 模拟请求异步同步数据
      // setTimeout(() => {
      //   this.info.date = getDate(new Date(), -30).fullDate
      //   this.info.startDate = getDate(new Date(), -60).fullDate
      //   this.info.endDate = getDate(new Date(), 30).fullDate
      //   this.info.selected = [{
      //       date: getDate(new Date(), -3).fullDate,
      //       info: '打卡'
      //     },
      //     {
      //       date: getDate(new Date(), -2).fullDate,
      //       info: '签到',
      //       data: {
      //         custom: '自定义信息',
      //         name: '自定义消息头'
      //       }
      //     },
      //     {
      //       date: getDate(new Date(), -1).fullDate,
      //       info: '已打卡'
      //     },
      //     {
      //       date: getDate(new Date(), -4).fullDate
      //     }
      //   ]
      // }, 2000)
    },
    onLoad() {
      // console.log(this.info.date, this.info.startDate, this.info.endDate)
      this.clickdate = getDate(new Date()).fullDate
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
        console.log(username);
        console.log(nickname);
        console.log(_id);
        this.uid = _id;
        // 在回调调用后this的指代已经变了
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
          // 获取日程信息, 并写入到日历信息info
          // let len = this.list.length
          // for (let i = 0; i < len; i++) {  // 使用push有bug每次刷新都会添加一次
          //   // console.log(this.list[i])
          //   let tmp = this.list[i].datetimerange[0].substring(0, 10)
          //   this.info.selected.push({
          //     date: tmp
          //   })
          // }
          // console.log(this.info.selected)
          let tmp = that.list.map(function(item) {
            return {
              date: item.datetimerange[0].substring(0, 10)
            }
          })
          console.log(tmp)
          that.info.selected = tmp
        }).catch(err => {
          console.log(err)
        })
      } catch (e) {
        //TODO handle the exception
        console.log(e)
      }
    },
    onShow() {
      console.log("刷新视图页面")
      let page = getCurrentPages().pop()
      page.onLoad()
    },
    onPullDownRefresh() {
      uni.reLaunch({
        url: "/pages/view/view"
      })
      uni.stopPullDownRefresh()
    },
    methods: {
      open() {
        this.$refs.calendar.open()
      },
      close() {
        console.log('弹窗关闭');
      },
      change(e) {
        console.log('change 返回:', e)
        // 模拟动态打卡
        // if (this.info.selected.length > 5) return
        // this.info.selected.push({
        //   date: e.fulldate,
        //   info: '打卡'
        // })
        this.clickdate = e.fulldate
      },
      confirm(e) {
        console.log('confirm 返回:', e)
      },
      monthSwitch(e) {
        console.log('monthSwitchs 返回:', e)
      }
    }
  }
</script>

<style lang="scss">
  .example-body {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .calendar-button {
    flex: 1;
    font-weight: bold;
    font-size: 32rpx;
  }
</style>
