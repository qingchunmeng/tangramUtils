/**
 * @file cookie操作
 * @author mengqingchun002@ke.com
 * @date 2019/3/29 07:52
 */

const Cookie = {
    /**
   * 设置cookie
   * @param name   cookie的名字
   * @param value  cookie值,可以为string,int,object
   * @param expire 过期时间,默认超时时间是以秒为纬度的
   * 使用方法：
   * setCookie('usrName', 'test', '1s'); //设置userName的cookie值为test,超时时间为1秒
   * setCookie('usrName', 'test', '1h'); //设置userName的cookie值为test,超时时间为1小时
   * setCookie('usrName', 'test', '1d'); //设置userName的cookie值为test,超时时间为1天
   */
    setCookie(name, value, expire) {
        const expDate = new Date();
        const time = this.getSec(expire);
        expDate.setTime(expDate.getTime() + time * 1);
        document.cookie = `${name}=${escape(value)}${expire ? `;expires=${expDate.toGMTString()}` : ''}`;
    },
    /**
    * 获取指定cookie名对应的值
    * @param name 要查找的cookie的名字
    * @returns {string,int} 该cookie对应的cookie值
    * 使用方法：
    * getCookie('usrName'); //获取usrName对应的cookie值
    */
    getCookie(name) {
        let arr; const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        if (arr == document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        return null;
    },
    /**
    * 检查给定名字的cookie是否有值
    * @param name 要检查的cookie的名字
    * @returns {boolen} 该cookie对应的cookie值
    * 使用方法：
    * checkCookie('usrName'); //检查usrName对应的cookie是否有值
    */
    checkCookie(name) {
        const cookie = this.getCookie(name);
        if (cookie) {
            return true;
        }
        return false;
    },
    /**
    * 删除指定cookie名对应的cookie和值
    * @param name 要删除的cookie的名字
    * 使用方法：
    * removeCookie('usrName'); //删除usrName对应的cookie
    */
    removeCookie(name) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const cval = this.getCookie(name);
        if (cval) {
            document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
        }
    },
    /**
    * 获取指定字符串名str对应的毫秒数
    * @param str 要获取的字符串名
    * 使用方法：
    * getSec('10s'); //返回'10s'(10秒)字符串对应的毫秒数
    * getSec('10h'); //返回'10h'(10小时)字符串对应的毫秒数
    * getSec('10d'); //返回'10d'(10天)字符串对应的毫秒数
    */
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
