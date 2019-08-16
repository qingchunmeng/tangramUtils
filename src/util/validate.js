/**
 * @file 数据、环境检测校验相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:40
 */

const validate = {
    /**
     * arg为空(null, undefined or ‘’)返回true
     * @param {*} arg
     */
    isEmpty(arg) {
        return arg === null || arg === undefined || arg === '';
    },
    /**
     * 简单校验手机号，String(mobile)是1开头的11位数字返回true
     * @param {*} mobile
     */
    isMobile(mobile) {
        return /^1\d{10}$/.test(String(mobile));
    },
    /**
     * 微信中打开返回true
     */
    isWeiXin() {
        return (/MicroMessenger/i).test(navigator.userAgent);
    },
    /**
     * 返回设备的浏览器类型
     */
    deviceType: () => {
        const u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == ' qq', // 是否QQ
        };
    },
    /**
     * 判断是否为android终端
     */
    isAndroid: () => {
        const u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    },
    /**
     * 判断是否为ios终端
     */
    isIOS: () => {
        const u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    /**
   * 判断是否是window对象
   * @param {Node} elem - dom元素
   * @return {Boolean}
   */
    isWindow: el => el != null && el === el.window,
    /**
   * 指定区间的数字
   * @param val
   * @param minValue
   * @param maxValue
   * @returns {*}
   */
    dataRange: (val, [minValue, maxValue]) => {
        // 兼容非必填的情况
        if (!val) {
            return true;
        }

        return this.minValue(val, minValue) && this.maxValue(val, maxValue);
    },
    /**
   * 正整数
   * @param val
   * @returns {boolean}
   */
    positiveInteger: (val) => {
        const reg = /(^[1-9]\d*$)|0/;
        let flag = true;
        // 兼容非必填的情况
        if (!val) {
            return true;
        }
        // 兼容非必填的情况
        if (isNaN(val)) {
            flag = false;
        } else if (!reg.test(val)) {
            flag = false;
        }
        return flag;
    },
    /**
   * > 0 的浮点数
   * @param val
   * @returns {boolean}
   */
    positiveFloat: (val) => {
        const reg = /(^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$)|(^[1-9]\d*$)|0/;
        let flag = true;
        // 兼容非必填的情况
        if (!val) {
            return true;
        }
        // 兼容非必填的情况
        if (isNaN(val)) {
            flag = false;
        } else if (!reg.test(val)) {
            flag = false;
        }
        return flag;
    },
    // 和positiveFloat的功能相似
    // nonNegative: (val) => {
    //
    // },
    /**
   * 最小不能小于多少,或者是大于XXX
   * @param val
   * @param minValue
   * @returns {boolean}
   */
    minValue: (val, minValue) => {
        // 兼容非必填的情况
        if (!val) {
            return true;
        }
        return val > minValue || val == minValue;
    },
    /**
   * 最大不能大于多少，或者是小于XXXX
   * @param val
   * @param maxValue
   * @returns {boolean}
   */
    maxValue: (val, maxValue) => {
        // 兼容非必填的情况
        if (!val) {
            return true;
        }
        return val < maxValue || val == maxValue;
    },
    /**
   * 年份，限制在1800年到3000年
   * @param val
   * @returns {boolean}
   */
    year: (val) => {
        let flag = true;
        if (!val) {
            return true;
        }
        if (isNaN(val)) {
            flag = false;
        } else if (val > 3000 || val < 1800) {
            flag = false;
        }

        return flag;
    },
    /**
   * 大于某个数字
   * @param val
   */
    greaterThan: (val, minValue) => {
        // 兼容非必填的情况
        if (!val) {
            return true;
        }
        return val > minValue;
    },
    /**
   * 小于某个数字
   * @param val
   */
    lessThan: (val, maxValue) => {
        // 兼容非必填的情况
        if (!val) {
            return true;
        }
        return val < maxValue;
    },
    /**
   * 等于某个值
   * @param val
   */
    equal: (val) => {

    },
    /**
   * 是否相同
   * @param val
   */
    same: (val) => {

    },
    /**
   *不允许输入中文
   */
    char: (val) => {
        if (!val) {
            return true;
        }
        return /^(\d|\w)+?$/i.test(val);
    },
    /**
   *至少含有两个汉字
   */
    haveTwoChineseChar: (val) => {

    },
    /**
   * 非法字符校验,，禁止包含 `<`  `>`
   */
    illegalChar: () => {

    },
    /**
   * 晚于某个日期
   * @param date
   */
    afterDate: (date) => {

    },
    /**
   * 早于某个日期
   * @param date
   */
    beforeDate: (date) => {

    },
    /**
   * 早于今天，或者不得晚于今天
   * @param date
   */
    beforeToday: (date) => {

    },
    /**
   * 晚于今天，或者不得早于今天
   * @param date
   */
    afterToday: (date) => {

    },
    /**
   * 合同号
   */
    contractNumber: (date) => {

    },
    /**
   * 身份证号
   * @param val
   * @returns {boolean}
   */
    identityCard: (val) => {
        /* eslint-disable */
        const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
        if (!val) {
            return true;
        }
        if (val.length != 15 && val.length != 18) {
            return false;
        }

        if (!reg.test(val)) {
            return false;
        }
    },
    /**
   * 银行卡号
   * @param val
   * @returns {boolean}
   */
    bankCardNumber: (val) => {
        if (!val) {
            return true;
        }
    },
    /**
   * 手机号
   * @param val
   * @returns {boolean}
   */
    mobile: (val) => {
        if (!val) {
            return true;
        }
        const reg = /^(13[0-9]|14(5|7)|15(0|1|2|3|5|6|7|8|9)|18[0-9]|17[0-9]|19[0-9]|166)\d{8}$/;
        return reg.test(val);
    },
    /**
   * 是否是电话号码或座机
   * @param val
   */
    telOrPhone: (val) => {
      if (!val) {
            return true;
      }
      return this.mobile(val) || this.homeTel(val);
    },
    /**
   * 固话
   * @param val
   */
    homeTel: (val) => {
      if (!val) {
        return true;
      }
      const reg = /^(\d{3,4}(-)?)?[0-9]{7,8}$/;
      return reg.test(val);
    },
    /**
   * 验证中间为****格式的手机号 例如 136****6443
   * @param val
   */
    phoneNum: (val) => {
        if (!val) {
            return true;
        }
        const reg = /^(13[0-9]|14(5|7)|15(0|1|2|3|5|6|7|8|9)|18[0-9]|17[0-9])((\*{4}\d{4})|(\d{8}))$/;
        return reg.test(val);
    },
    /**
   * 验证是否是电话号码（宽松）
   * @param val
   * @returns {*}
   */
    isTelLoose(val) {
        if (!val) {
            return true;
        }
        const reg = /^1\d{10}$/;
        return reg.test(val) || '电话格式不正确';
    },
};

export default validate;
