"use strict";
const common_vendor = require("../../common/vendor.js");
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);
  dd.setDate(dd.getDate() + AddDayCount);
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}
const _sfc_main = {
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
      params: "",
      uid: "",
      list: [],
      clickdate: ""
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.showCalendar = true;
    });
  },
  onLoad() {
    this.clickdate = getDate(new Date()).fullDate;
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
        let tmp = that.list.map(function(item) {
          return {
            date: item.datetimerange[0].substring(0, 10)
          };
        });
        console.log(tmp);
        that.info.selected = tmp;
      }).catch((err) => {
        console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  },
  onShow() {
    console.log("\u5237\u65B0\u89C6\u56FE\u9875\u9762");
    let page = getCurrentPages().pop();
    page.onLoad();
  },
  onPullDownRefresh() {
    common_vendor.index.reLaunch({
      url: "/pages/view/view"
    });
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    open() {
      this.$refs.calendar.open();
    },
    close() {
      console.log("\u5F39\u7A97\u5173\u95ED");
    },
    change(e) {
      console.log("change \u8FD4\u56DE:", e);
      this.clickdate = e.fulldate;
    },
    confirm(e) {
      console.log("confirm \u8FD4\u56DE:", e);
    },
    monthSwitch(e) {
      console.log("monthSwitchs \u8FD4\u56DE:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_calendar2 + _easycom_uni_card2)();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_calendar + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showCalendar
  }, $data.showCalendar ? {
    b: common_vendor.o($options.change),
    c: common_vendor.o($options.monthSwitch),
    d: common_vendor.p({
      selected: $data.info.selected,
      showMonth: false
    }),
    e: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.datetimerange[0].substring(0, 10) == $data.clickdate
      }, item.datetimerange[0].substring(0, 10) == $data.clickdate ? {
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => _ctx.test(), item._id),
        d: "e19c1030-1-" + i0,
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
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderProjects/cloud20221217/pages/view/view.vue"]]);
wx.createPage(MiniProgramPage);
