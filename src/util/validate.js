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
