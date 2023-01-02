"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      uniIdRedirectUrl: "",
      params: {},
      avatar: "",
      username: "",
      query: "username=='princess'",
      img: ""
    };
  },
  onLoad(options) {
    console.log(options);
    this.uniIdRedirectUrl = decodeURIComponent(options.uniIdRedirectUrl);
    let params = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
    this.params = params;
    this.username = params.username;
    this.img = params.avatar_file.url;
    if (JSON.stringify(params) !== "{}" && params) {
      console.log("user\u9875\u9762");
      console.log("\u672C\u5730\u6709token");
      console.log(this.params);
      console.log(params);
    } else {
      console.log("\u672C\u5730\u65E0token");
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    }
  },
  onPullDownRefresh() {
    common_vendor.index.reLaunch({
      url: "/pages/user/user"
    });
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    async login() {
      if (this.uniIdRedirectUrl) {
        common_vendor.index.redirectTo({
          url: this.uniIdRedirectUrl
        });
      }
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    change_avatar() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar"
      });
    },
    change_pwd() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd"
      });
    },
    register() {
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/register/register"
      });
    },
    login() {
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.img,
    b: common_vendor.t("\u6635\u79F0: " + $data.params.nickname),
    c: common_vendor.t("\u7528\u6237\u540D: " + $data.params.username),
    d: common_vendor.o((...args) => $options.change_avatar && $options.change_avatar(...args)),
    e: common_vendor.o((...args) => $options.change_pwd && $options.change_pwd(...args)),
    f: common_vendor.o(($event) => $options.register()),
    g: common_vendor.o(($event) => $options.login())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderProjects/cloud20221217/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
