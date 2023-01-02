"use strict";
const config = {
  "debug": false,
  "isAdmin": true,
  "loginTypes": [
    "weixin",
    "username",
    "smsCode"
  ],
  "agreements": {
    "serviceUrl": "https://xxx",
    "privacyUrl": "https://xxx",
    "scope": [
      "register",
      "login"
    ]
  },
  "appid": {
    "weixin": {
      "h5": "xxxxxx",
      "web": "xxxxxx"
    }
  },
  "passwordStrength": "medium",
  "setPasswordAfterLogin": false
};
exports.config = config;
