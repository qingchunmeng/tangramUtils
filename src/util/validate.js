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
    isWeiXin: () => {
        const ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) === 'micromessenger';
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
};

export default validate;
