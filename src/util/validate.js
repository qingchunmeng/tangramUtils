/**
 * @file 数据、环境检测校验相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:40
 */

const validate = {
    isReturnValue: (judge, value) => {
        // judge为空值时返回'',其它情况下返回value
        let returnValue;
        if (typeof judge === 'string' || Array.isArray(judge)) {
            returnValue = judge.length > 0 ? value : '';
        }
        if (typeof judge === 'object') {
            returnValue = JSON.stringify(judge) !== '{}' ? value : '';
        }
        if (typeof judge === 'number') {
            returnValue = judge > 0 ? value : '';
        }
        if (typeof judge === 'boolean') {
            returnValue = judge ? value : '';
        }
        return returnValue;
    },
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
    isWeiXin: () => {
        const ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) === 'micromessenger';
    },
    /**
     * 返回android,ios,pc
     */
    deviceType: () => {
        let type = 'pc';
        const u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
            type = 'android';
        } else if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            type = 'ios';
        }
        return type;
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

};

export default validate;
