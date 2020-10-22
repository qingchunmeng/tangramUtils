/**
 * @desc 日期格式化
 * @author fangt11@ke.com
 * @date 2020-209-24
 */

// 日期格式化
const WeekTextMap = ['日', '一', '二', '三', '四', '五', '六'];

// YYYY-MM-DD
// YYYY-MM-DD HH:mm
// YYYY-MM-DD HH:mm:ss
export const formatTime = (date, format = 'YYYY-MM-DD', invalidText = '--') => {
    if (+date <= 0) {
        return invalidText;
    }
    const dt = new Date(+date || +new Date(date));
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    const hour = dt.getHours();
    const minute = dt.getMinutes();
    const second = dt.getSeconds();
    const week = `星期${WeekTextMap[dt.getDay()]}`;
    const parse = {
        YYYY: year,
        MM: month,
        DD: day,
        HH: hour,
        mm: minute,
        ss: second,
        w: week
    };

    parse.yyyy = parse.YYYY;
    parse.dd = parse.DD;
    parse.hh = parse.HH;

    // 补零
    Object.entries(parse).forEach(([k, v]) => {
        parse[k] = String(v).padStart(2, 0);
    });

    // 上午|下午
    parse.a = hour / 12 >= 1 ? 'pm' : 'am';
    parse.A = parse.a.toUpperCase();

    return Object.entries(parse).reduce((prev, [k, v]) => {
        return prev.replace(k, v);
    }, format);
};

/**
 * 格式化日期
 * @method format
 * @static
 * @param {Date} d 日期对象
 * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
 * @return {string}  返回format后的字符串
 * @example
 var d=new Date();
 alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
 */
export const formatDate = (d, pattern) => {
    pattern = pattern || 'yyyy-MM-dd';
    if (typeof d !== 'object') {
        d = new Date(d);
    }
    const y = d.getFullYear().toString();
    const o = {
        M: d.getMonth() + 1, // month
        d: d.getDate(), // day
        h: d.getHours(), // hour
        m: d.getMinutes(), // minute
        s: d.getSeconds() // second
    };
    pattern = pattern.replace(/(y+)/gi, (a, b) => y.substr(4 - Math.min(4, b.length)));
    for (const i in o) {
        pattern = pattern.replace(new RegExp(`(${i}+)`, 'g'), (a, b) => {
            return o[i] < 10 && b.length > 1 ? `0${o[i]}` : o[i];
        });
    }
    return pattern;
};
