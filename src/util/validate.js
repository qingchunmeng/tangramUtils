/**
 * @file 数据、环境检测校验相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:40
 */

const validate = {
    isReturnValue: (judge, value) => {
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

    },
    isAndroid: () => {

    },
    isIOS: () => {

    },

};

export default validate;
