/**
 * @file cookie操作
 * @author mengqingchun002@ke.com
 * @date 2019/3/29 07:52
 */

let  Cookie =  {
    setCookie: function (name, value, expire) {
      let expDate  = new Date();
      var time = this.getSec(expire);
      expDate.setTime(expDate.getTime() + time * 1);
      document.cookie = `${name}=${escape(value)}` + (expire ? `;expires=${expDate.toGMTString()}` : '');
    },
    getCookie: function (name) {
        let arr,reg =  new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);  
        } else {
            return null;
        }
    },
    checkCookie: function (name) {
      let cookie = this.getCookie(name);
      if (cookie) {
        return true;
      }
      return false;
    },
    removeCookie: function (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.getCookie(name);
        if (cval) {
            document.cookie= `${name}=${cval};expires=${exp.toGMTString()}`;
        }

    },
    getSec: function (str) {
        str = str ? str : '';
        var str1 = + str.substr(1);
        var str2 = str.substring(0,1);
        switch (str2) {
          case 's' : return str1 * 1000;
          case 'h' : return str1 * 60 * 60 * 1000;
          case 'd' : return str1 * 24 * 60 * 60 * 1000;
          default: return str1 ? str1 * 1000 : 1000;
        }
    }
}

export default Cookie;

