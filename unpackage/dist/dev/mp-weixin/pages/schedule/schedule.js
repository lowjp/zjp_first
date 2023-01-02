"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      params: "",
      username: "",
      uid: "",
      sid: "",
      title: "",
      list: [],
      datetimerange: [],
      value: 0,
      range: [{
        "value": 0,
        "text": "\u91CD\u8981\u7D27\u6025"
      }, {
        "value": 1,
        "text": "\u91CD\u8981\u4E0D\u7D27\u6025"
      }, {
        "value": 2,
        "text": "\u7D27\u6025\u4E0D\u91CD\u8981"
      }, {
        "value": 3,
        "text": "\u4E0D\u91CD\u8981\u4E0D\u7D27\u6025"
      }],
      en: ["importantandurgent", "importantandnurgent", "nimportantandurgent", "free"],
      text: "",
      jointime: "",
      status: "no",
      update: false
    };
  },
  watch: {
    datetimerange(newval) {
      console.log("\u8303\u56F4\u9009:", this.datetimerange);
    },
    value(newval) {
      console.log("\u65E5\u7A0B\u72B6\u6001\u503C: ", this.value, this.range[this.value].text);
    }
  },
  onLoad(options) {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
    let date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
    let hours = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
    let minutes = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
    let seconds = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds();
    let time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log("\u5F53\u524D\u65F6\u95F4: " + time);
    this.params = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
    if (this.params) {
      console.log("user\u9875\u9762");
      console.log("\u672C\u5730\u6709token");
      console.log(this.params);
    } else {
      console.log("\u672C\u5730\u65E0token");
      common_vendor.index.navigateTo({
        "url": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    }
    this.username = this.params.username;
    this.uid = this.params._id;
    this.datetimerange = [time, time];
    this.jointime = time;
    console.log(this.uid);
    console.log(options);
    if (JSON.stringify(options) !== "{}") {
      let data = JSON.parse(options.data);
      console.log("\u4F20\u9012\u7684options\u5982\u4E0B");
      console.log(data);
      this.title = data.title;
      this.datetimerange = data.datetimerange;
      this.value = this.en.indexOf(data.level);
      this.text = data.text;
      this.status = data.status;
      this.sid = data._id;
      this.update = true;
    } else {
      console.log("\u6CA1\u6709\u4F20\u9012options");
    }
  },
  methods: {
    publish() {
      if (this.update) {
        console.log("\u66F4\u65B0\u65E5\u7A0B");
        common_vendor.As.callFunction({
          name: "schedule",
          data: {
            api: "update",
            title: this.title,
            datetimerange: this.datetimerange,
            level: this.en[this.value],
            text: this.text,
            status: this.status,
            sid: this.sid
          }
        }).then((res) => {
          console.log(res);
          console.log("\u66F4\u65B0\u6570\u636E\u6210\u529F");
          common_vendor.index.showToast({
            title: "\u66F4\u65B0\u6210\u529F"
          });
          function fun() {
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
          setTimeout(fun, 2e3);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        common_vendor.As.callFunction({
          name: "schedule",
          data: {
            api: "publish",
            uid: this.uid,
            title: this.title,
            datetimerange: this.datetimerange,
            level: this.en[this.value],
            text: this.text,
            status: this.status,
            jointime: this.jointime
          }
        }).then((res) => {
          console.log(res);
          console.log("\u63D0\u4EA4\u6210\u529F");
          common_vendor.index.showToast({
            title: "\u53D1\u5E03\u6210\u529F"
          });
          function fun() {
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
          setTimeout(fun, 2e3);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_section2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_datetime_picker + _easycom_uni_data_checkbox + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.title,
    b: common_vendor.o(($event) => $data.title = $event.detail.value),
    c: common_vendor.p({
      title: "\u65E5\u671F\u9009\u62E9",
      type: "line"
    }),
    d: common_vendor.o(($event) => $data.datetimerange = $event),
    e: common_vendor.p({
      type: "datetimerange",
      rangeSeparator: "\u81F3",
      modelValue: $data.datetimerange
    }),
    f: common_vendor.p({
      title: "\u4E8B\u4EF6\u72B6\u6001\u9009\u62E9",
      type: "line"
    }),
    g: common_vendor.o(_ctx.change),
    h: common_vendor.o(($event) => $data.value = $event),
    i: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.value
    }),
    j: common_vendor.o(($event) => $data.text = $event),
    k: common_vendor.p({
      type: "textarea",
      placeholder: "\u65E5\u7A0B\u63CF\u8FF0",
      modelValue: $data.text
    }),
    l: common_vendor.o(($event) => $options.publish())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderProjects/cloud20221217/pages/schedule/schedule.vue"]]);
wx.createPage(MiniProgramPage);
