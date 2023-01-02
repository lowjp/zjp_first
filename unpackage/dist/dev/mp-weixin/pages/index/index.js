"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.As.importObject("uni-id-co");
const _sfc_main = {
  data() {
    return {
      title: "",
      username: "",
      password: "",
      horizontal: "right",
      vertical: "buttom",
      direction: "horizontal",
      uid: "",
      username: "",
      nickname: "",
      params: "",
      list: [],
      optionsRight: [{
        text: "\u5220\u9664",
        style: {
          backgroundColor: "#ff133e"
        }
      }, {
        text: "\u5B8C\u6210",
        style: {
          backgroundColor: "#4ac0ff"
        }
      }],
      optionsLeft: [{
        text: "\u5B8C\u6210",
        style: {
          backgroundColor: "#4ac0ff"
        }
      }],
      collapse: ["done", "ndone"]
    };
  },
  onLoad() {
    let params = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
    this.params = params;
    if (params) {
      console.log("\u672C\u5730\u6709token");
    } else {
      console.log("\u672C\u5730\u65E0token");
    }
    console.log(this.params);
    let {
      username,
      nickname,
      _id
    } = params;
    console.log(username);
    console.log(nickname);
    console.log(_id);
    this.uid = _id;
    let that = this;
    common_vendor.As.callFunction({
      name: "schedule",
      data: {
        api: "getMessage",
        uid: _id
      }
    }).then((res) => {
      console.log("\u8FD4\u56DE\u65E5\u7A0B\u5982\u4E0B: ");
      console.log(res);
      that.list = res.result.data;
    }).catch((err) => {
      console.log(err);
    });
  },
  onPullDownRefresh() {
    common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    register() {
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/register/register"
      });
    },
    login() {
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    },
    user() {
      common_vendor.index.navigateTo({
        "url": "/pages/user/user"
      });
    },
    test() {
      common_vendor.index.showToast({
        title: "\u70B9\u51FB\u5361\u7247"
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    schedule() {
      common_vendor.index.navigateTo({
        "url": "/pages/schedule/schedule"
      });
    },
    swipeChange(e, index) {
      console.log("\u8FD4\u56DE: ", e);
    },
    swipeClick(e, index, _id) {
      console.log("e: ", e);
      console.log(e.index);
      console.log(_id);
      if (e.index == 0) {
        console.log("\u7528\u6237\u70B9\u51FB\u5220\u9664");
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          content: "\u662F\u5426\u5220\u9664",
          success: (res) => {
            if (res.confirm) {
              console.log("\u7528\u6237\u70B9\u51FB\u786E\u8BA4");
              common_vendor.As.callFunction({
                name: "schedule",
                data: {
                  api: "delMessage",
                  id: _id
                }
              }).then((res2) => {
                console.log(res2);
                console.log("\u6210\u529F\u5220\u9664");
                common_vendor.index.reLaunch({
                  url: "/pages/index/index"
                });
              }).catch((err) => {
                console.log(err);
              });
            } else if (res.cancel) {
              console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
            }
          }
        });
      } else if (e.index == 1) {
        console.log("\u7528\u6237\u70B9\u51FB\u5B8C\u6210");
        common_vendor.As.callFunction({
          name: "schedule",
          data: {
            api: "done",
            id: _id,
            status: "yes"
          }
        }).then((res) => {
          console.log(res);
          console.log("\u65E5\u7A0B\u6807\u8BB0\u4E3A\u5B8C\u6210");
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    del(_id) {
      common_vendor.As.callFunction({
        name: "schedule",
        data: {
          api: "delMessage",
          id: _id
        }
      }).then((res) => {
        console.log(res);
        console.log("\u70B9\u51FB\u5220\u9664");
        console.log(_id);
      }).catch((err) => {
        console.log(err);
      });
      console.log("\u70B9\u51FB");
    },
    detail(item) {
      console.log("\u70B9\u51FB\u8BE6\u60C5\u9875");
      let data = JSON.stringify(item);
      common_vendor.index.navigateTo({
        url: "/pages/schedule/schedule?data=" + data
      });
    },
    refresh() {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_nav_bar2 + _easycom_uni_card2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_card + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.user()),
    b: common_vendor.p({
      dark: true,
      fixed: true,
      shadow: true,
      ["background-color"]: "#f4ffe2",
      color: "#000000",
      ["status-bar"]: true,
      ["left-icon"]: "",
      ["left-text"]: "\u4E09",
      title: $data.title
    }),
    c: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.status == "yes"
      }, item.status == "yes" ? {
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => $options.detail(item), item._id),
        d: "9171eba4-5-" + i0 + "," + ("9171eba4-4-" + i0),
        e: common_vendor.p({
          title: item.title,
          mode: "style",
          ["is-shadow"]: true,
          thumbnail: "",
          extra: item.jointime,
          note: "Tips"
        }),
        f: common_vendor.o(($event) => $options.swipeClick($event, index, item._id), item._id),
        g: common_vendor.o(($event) => $options.swipeChange($event, index), item._id),
        h: "9171eba4-4-" + i0 + "," + ("9171eba4-3-" + i0),
        i: common_vendor.p({
          ["right-options"]: $data.optionsRight
        }),
        j: "9171eba4-3-" + i0 + ",9171eba4-2",
        k: common_vendor.n(item.level)
      } : {}, {
        l: item._id
      });
    }),
    d: common_vendor.p({
      title: "\u5DF2\u5B8C\u6210"
    }),
    e: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.status == "no"
      }, item.status == "no" ? {
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => $options.detail(item), item._id),
        d: "9171eba4-10-" + i0 + "," + ("9171eba4-9-" + i0),
        e: common_vendor.p({
          title: item.title,
          mode: "style",
          ["is-shadow"]: true,
          thumbnail: "",
          extra: item.jointime,
          note: "Tips"
        }),
        f: common_vendor.o(($event) => $options.swipeClick($event, index, item._id), item._id),
        g: common_vendor.o(($event) => $options.swipeChange($event, index), item._id),
        h: "9171eba4-9-" + i0 + "," + ("9171eba4-8-" + i0),
        i: common_vendor.p({
          ["right-options"]: $data.optionsRight
        }),
        j: "9171eba4-8-" + i0 + ",9171eba4-7",
        k: common_vendor.n(item.level)
      } : {}, {
        l: item._id
      });
    }),
    f: common_vendor.p({
      title: "\u5F85\u5B8C\u6210",
      name: "ndone"
    }),
    g: common_vendor.o(($event) => $data.collapse = $event),
    h: common_vendor.p({
      modelValue: $data.collapse
    }),
    i: common_vendor.o(($event) => $options.refresh()),
    j: common_vendor.o(($event) => $options.schedule())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderProjects/cloud20221217/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
