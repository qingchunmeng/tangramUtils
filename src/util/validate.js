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
        let u = navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
            type = 'android';
        }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            type = 'ios';
        }
        return type;
    },
    /**
     * 判断是否为android终端
     */
    isAndroid: () => {
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    },
    /**
     * 判断是否为ios终端
     */
    isIOS: () => {
        let u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },

};

export default validate;
