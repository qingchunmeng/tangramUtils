/**
 * @file 数据、环境检测校验相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:40
 */

const validate = {
    isEmpty: () => {

    },
    isMobile: () => {

    },
    isWeiXin: () => {

    },
    /**
     * 返回android,ios,pc
     */
    deviceType: () => {

    },
    isAndroid: () => {
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    },
    isIOS: () => {
        let u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    },

};

export default validate;
