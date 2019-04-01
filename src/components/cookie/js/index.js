/**
 * @file cookie操作
 * @author mengqingchun002@ke.com
 * @date 2019/3/29 07:52
 */

const Cookie = {
    setCookie(name, value, expire) {
        const expDate = new Date();
        const time = this.getSec(expire);
        expDate.setTime(expDate.getTime() + time * 1);
        document.cookie = `${name}=${escape(value)}${expire ? `;expires=${expDate.toGMTString()}` : ''}`;
    },
    getCookie(name) {
        let arr; const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        if (arr == document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        return null;
    },
    checkCookie(name) {
        const cookie = this.getCookie(name);
        if (cookie) {
            return true;
        }
        return false;
    },
    removeCookie(name) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const cval = this.getCookie(name);
        if (cval) {
            document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
        }
    },
    getSec(str) {
        str = str || '';
        const str1 = +str.substr(1);
        const str2 = str.substring(0, 1);
        switch (str2) {
            case 's': return str1 * 1000;
            case 'h': return str1 * 60 * 60 * 1000;
            case 'd': return str1 * 24 * 60 * 60 * 1000;
            default: return str1 ? str1 * 1000 : 1000;
        }
    },
};

export default Cookie;
