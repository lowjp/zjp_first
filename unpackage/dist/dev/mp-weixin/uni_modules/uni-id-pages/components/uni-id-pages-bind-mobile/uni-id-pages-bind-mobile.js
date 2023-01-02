"use strict";
const common_vendor = require("../../../../common/vendor.js");
const db = common_vendor.As.database();
db.collection("uni-id-users");
const uniIdCo = common_vendor.As.importObject("uni-id-co");
const _sfc_main = {
  emits: ["success"],
  computed: {},
  data() {
    return {};
  },
  methods: {
    async beforeGetphonenumber() {
      return await new Promise((resolve, reject) => {
        common_vendor.index.showLoading({ mask: true });
        wx.checkSession({
          success() {
            resolve();
            common_vendor.index.hideLoading();
          },
          fail() {
            wx.login({
              success({
                code
              }) {
                common_vendor.As.importObject("uni-id-co", {
                  customUI: true
                }).loginByWeixin({ code }).then((e) => {
                  resolve();
                }).catch((e) => {
                  console.log(e);
                  reject();
                }).finally((e) => {
                  common_vendor.index.hideLoading();
                });
              },
              fail: (err) => {
                console.error(err);
                reject();
              }
            });
          }
        });
      });
    },
    async bindMobileByMpWeixin(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        await this.beforeGetphonenumber();
        uniIdCo.bindMobileByMpWeixin(e.detail).then((e2) => {
          this.$emit("success");
        }).finally((e2) => {
          this.closeMe();
        });
      } else {
        this.closeMe();
      }
    },
    async open() {
      this.$refs.popup.open();
    },
    closeMe(e) {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.closeMe && $options.closeMe(...args)),
    b: common_vendor.o((...args) => $options.bindMobileByMpWeixin && $options.bindMobileByMpWeixin(...args)),
    c: common_vendor.sr("popup", "e0127e04-0"),
    d: common_vendor.p({
      type: "bottom"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e0127e04"], ["__file", "D:/HbuilderProjects/cloud20221217/uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.vue"]]);
wx.createComponent(Component);
