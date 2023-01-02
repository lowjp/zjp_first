<template>
  <!-- 导航栏 -->
  <view class="container">
    <uni-nav-bar dark :fixed="true" shadow background-color="#f4ffe2" color="#000000" status-bar left-icon=""
      left-text="三" :title="title" @clickLeft="user()" />
  </view>
  <!--  <view class="">
    <uni-icons type="weixin" size="30"></uni-icons>
  </view> -->
  <!-- 已完成的日程 -->
  <view class="">
    <uni-collapse>
      <uni-collapse-item title="已完成">
        <view class="" v-for="(item,index) in list" :key="item._id">
          <view class="" v-if="item.status == 'yes'">
            <view :class="item.level">
              <uni-swipe-action>
                <uni-swipe-action-item :right-options="optionsRight" @click="swipeClick($event, index, item._id)"
                  @change="swipeChange($event, index)">
                  <uni-card :title="item.title" mode="style" :is-shadow="true" thumbnail="" :extra="item.jointime"
                    note="Tips" @click="detail(item)">
                    <!-- <img src="/static/avatar6.jpg" alt=""> -->
                    {{ item.text }}
                  </uni-card>
                </uni-swipe-action-item>
              </uni-swipe-action>
            </view>

          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
  <!-- 待完成的日程 -->
  <view class="">
    <uni-collapse v-model="collapse">
      <uni-collapse-item title="待完成" name="ndone">
        <view class="" v-for="(item,index) in list" :key="item._id">
          <view class="" v-if="item.status == 'no'">
            <view :class="item.level">
              <uni-swipe-action>
                <uni-swipe-action-item :right-options="optionsRight" @click="swipeClick($event, index, item._id)"
                  @change="swipeChange($event, index)">
                  <uni-card :title="item.title" mode="style" :is-shadow="true" thumbnail="" :extra="item.jointime"
                    note="Tips" @click="detail(item)">
                    <!-- <img src="/static/avatar6.jpg" alt=""> -->
                    {{ item.text }}
                  </uni-card>
                </uni-swipe-action-item>
              </uni-swipe-action>
            </view>

          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
  <!-- 悬浮按钮 -->
  <!--  <view class="" style="margin-left: 300px;">
    <uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
      @trigger="trigger" @fabClick="schedule()"></uni-fab>
  </view> -->
  <view class="">
    <image src="/static/egoist2.png" alt="" @click="refresh()" class="hover_button" style="margin-left: 200px;"></image>
    <image src="/static/egoist1.png" alt="" @click="schedule()" class="hover_button"></image>
  </view>

</template>

<script>
  const uniIdCo = uniCloud.importObject('uni-id-co');
  export default {
    data() {
      return {
        title: '',
        username: '',
        password: '',
        horizontal: 'right',
        vertical: 'buttom',
        direction: 'horizontal',
        uid: '',
        username: '',
        nickname: '',
        params: '',
        list: [],
        optionsRight: [{
          text: '删除',
          style: {
            backgroundColor: "#ff133e"
          }
        }, {
          text: '完成',
          style: {
            backgroundColor: "#4ac0ff"
          }
        }],
        optionsLeft: [{
          text: '完成',
          style: {
            backgroundColor: "#4ac0ff"
          }
        }],
        collapse: ['done', 'ndone']
      }
    },
    onLoad() {
      let params = uni.getStorageSync('uni-id-pages-userInfo');
      this.params = params
      if (params) {
        console.log("本地有token");
      } else {
        console.log("本地无token");
      }
      console.log(this.params);
      let {
        username,
        nickname,
        _id
      } = params
      console.log(username);
      console.log(nickname);
      console.log(_id);
      this.uid = _id;
      // 异步时this指向不同了 // 其实this是可行的在 res=> 这种情况下还是可以指向，作者只是有点怀疑
      let that = this
      // this的值有可能传得太慢了
      uniCloud.callFunction({
        name: "schedule",
        data: {
          api: "getMessage",
          uid: _id,
        }
      }).then(res => {
        console.log("返回日程如下: ")
        console.log(res)
        // this.list = res.result.data
        that.list = res.result.data
      }).catch(err => {
        console.log(err)
      })
    },
    onPullDownRefresh() {
      uni.reLaunch({
        url: "/pages/index/index"
      })
      uni.stopPullDownRefresh()
    },
    // onShow() {
    //   console.log("刷新index页面")
    //   let page = getCurrentPages().pop()
    //   page.onLoad()
    // },
    methods: {
      register() {
        uni.navigateTo({
          "url": "/uni_modules/uni-id-pages/pages/register/register"
        })
      },
      login() {
        uni.navigateTo({
          "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        })
      },
      // 侧边栏用户设置页面
      user() {
        uni.navigateTo({
          "url": "/pages/user/user"
        })
      },
      test() {
        uni.showToast({
          title: '点击卡片'
        });
      },
      back() {
        uni.navigateBack({
          delta: 1
        })
      },
      schedule() {
        uni.navigateTo({
          "url": "/pages/schedule/schedule"
        })
      },
      swipeChange(e, index) {
        console.log('返回: ', e)
        // console.log('当前索引: ', index)
      },
      swipeClick(e, index, _id) {
        let {
          content
        } = e
        console.log('e: ', e)
        console.log(e.index)
        console.log(_id)
        let that = this // 保存this
        if (e.index == 0) {
          console.log("用户点击删除")
          uni.showModal({
            title: '提示',
            content: '是否删除',
            success: res => {
              if (res.confirm) {
                // this.swipeList.splice(index, 1);
                console.log('用户点击确认')
                uniCloud.callFunction({
                  name: "schedule",
                  data: {
                    api: "delMessage",
                    id: _id
                  }
                }).then(res => {
                  console.log(res)
                  console.log("成功删除")
                  // that.$forceUpdate()
                  // let page = getCurrentPages().pop()
                  // page.onLoad()
                  uni.reLaunch({
                    url: "/pages/index/index"
                  })
                  // console.log(_id)
                }).catch(err => {
                  console.log(err)
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })
        } else if (e.index == 1) {
          console.log("用户点击完成")
          uniCloud.callFunction({
            name: "schedule",
            data: {
              api: "done",
              id: _id,
              status: "yes"
            }
          }).then(res => {
            console.log(res)
            console.log("日程标记为完成")
            // that.$forceUpdate()
            // let page = getCurrentPages().pop()
            // page.onLoad()
            uni.reLaunch({
              url: "/pages/index/index"
            })
          }).catch(err => {
            console.log(err)
          })
        }
      },
      del(_id) { // 已弃用
        uniCloud.callFunction({
          name: "schedule",
          data: {
            api: "delMessage",
            id: _id
          }
        }).then(res => {
          console.log(res)
          console.log("点击删除")
          console.log(_id)
        }).catch(err => {
          console.log(err)
        })
        console.log('点击')
      },
      detail(item) {
        console.log("点击详情页")
        let data = JSON.stringify(item)
        uni.navigateTo({
          url: "/pages/schedule/schedule?data=" + data
        })
      },
      refresh() {
        // uni.switchTab({
        //   url: "/pages/index/index"
        // })
        uni.reLaunch({
          url: "/pages/index/index"
        })
        // let page = getCurrentPages().pop()
        // page.onLoad()
      }
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

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }

  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }

  .hover_button {
    width: 70px;
    height: 70px;
  }

  .importantandurgent {
    background: #e43d33;
  }

  .importantandnurgent {
    background: #f3a73f;
  }

  .nimportantandurgent {
    background: #2979ff;
  }

  .free {
    background: #8f939c;
  }
</style>
