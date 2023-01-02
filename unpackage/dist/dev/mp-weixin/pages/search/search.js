"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      text: "",
      list: [],
      uid: "",
      params: ""
    };
  },
  onLoad() {
    try {
      this.params = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      if (this.params) {
        console.log("\u672C\u5730\u6709token");
      } else {
        console.log("\u672C\u5730\u65E0token");
      }
      console.log(this.params);
      let {
        username,
        nickname,
        _id
      } = this.params;
      console.log("seaarch\u9875\u9762");
      console.log(username);
      console.log(nickname);
      console.log(_id);
      this.uid = _id;
      let that = this;
      common_vendor.As.callFunction({
        name: "schedule",
        data: {
          api: "getMessage",
          uid: this.uid
        }
      }).then((res) => {
        console.log("\u8FD4\u56DE\u65E5\u7A0B\u5982\u4E0B: ");
        console.log(res);
        that.list = res.result.data;
      }).catch((err) => {
        console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  },
  onShow() {
    console.log("\u5237\u65B0\u9875\u9762");
    let page = getCurrentPages().pop();
    page.onLoad();
  },
  onPullDownRefresh() {
    common_vendor.index.reLaunch({
      url: "/pages/search/search"
    });
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    onClick() {
      console.log("\u70B9\u51FB");
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_easyinput2 + _easycom_uni_card2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onClick),
    b: common_vendor.o(($event) => $data.text = $event),
    c: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.text
    }),
    d: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: (item.title.indexOf($data.text) != -1 || item.text.indexOf($data.text) != -1) && $data.text
      }, (item.title.indexOf($data.text) != -1 || item.text.indexOf($data.text) != -1) && $data.text ? {
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => _ctx.test(), item._id),
        d: "3599f8f0-1-" + i0,
        e: common_vendor.p({
          title: item.title,
          mode: "style",
          ["is-shadow"]: true,
          thumbnail: "",
          extra: item.jointime,
          note: "Tips"
        })
      } : {}, {
        f: item._id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderProjects/cloud20221217/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
