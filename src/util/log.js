/* eslint-disable prettier/prettier */
/**
 * 获取错误信息
 * @param {*} err
 * @returns {String}
 */
function getErrorStack(err) {
    let msg = '';
    try {
        if (err.inspect) {
            msg = err.inspect();
        } else if (err.stack) {
            msg = err.stack;
        } else if (err.error) {
            msg = err.error.stack;
        }
        msg = msg || err.message || JSON.stringify(err);
    } catch (e) {
        msg = `getErrorStack: ${e.message}; ${err}`;
        window.console.error(msg, e, err);
    }
    return msg;
}

/**
 * 判断是否为空：if undefined | null | '' => true
 * @param {*} value
 * @returns {Boolean}
 */
function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

/**
 * 得到指定宽度（长度）的字符串，原字符串宽度不够（不包括前后空白字符），则用指定字符填补齐，eg:
 *      paddingString('   1   ') => 1；
 *      paddingString(1, 3) => 001；
 *      paddingString(1, 3, 'x') => xx1；
 *      paddingString(1, 5, 'abc', true) => 1abca；
 * @param {*} value 要格式化的值，为 undefined | null 转为 '', 为其它值时先转字符串后去除前后空格，eg: 1
 * @param {Number} width 格式化后的最小宽度，默认0，eg: 5
 * @param {String} paddingChars 要填补的字符(为 undefined | null 转为 ''，否则转为字符串)，默认0
 * @param {Boolean} paddingRight true 填补到右边，默认 false 填补到左边
 * @returns {String} eg: 00002
 */
function paddingString(value = '', width = 0, paddingChars = '0', paddingRight = false) {
    // value 为 undefined | null 转为 '', 为其它值时先转字符串后去除前后空白字符
    let str = isEmpty(value) ? '' : String(value).replace(/^(\s*)|(\s*)$/g, '');
    const stringToPadding = isEmpty(paddingChars) ? '' : String(paddingChars);
    const minLength = window.isNaN(width) ? 0 : Math.abs(Number(width));
    let restPaddingLength = minLength - str.length;
    if (restPaddingLength < 1) {
        // 本身长度>=指定长度，返回字符串值
        return str;
    }
    const paddingStrs = [];
    while (restPaddingLength > 0) {
        paddingStrs.push(stringToPadding);
        restPaddingLength -= 1;
    }
    if (paddingRight) {
        str = (str + paddingStrs.join('')).substr(0, minLength);
    } else {
        str = (paddingStrs.join('') + str).substr(-minLength);
    }
    return str;
}

/**
 * tpl 中的 ${key} 会被替换为 args[key]
 * @param {String} tpl 字符串模板，eg: ${0}-${1}-${2} ${3}:${4}:${5}.${6}
 * @param {Array} args 数据源，通过 args[key] 拿到要替换的值，eg: [2020, 12, 11, '09', 36, 30, 168]
 * @returns {String} eg: 2020-12-11 09:36:30.168
 */
function parseKeyTpl(tpl, args) {
    const keyReg = /\$\{([^}]*)\}/g;
    return tpl.replace(keyReg, (match, p1) => (args || {})[p1]);
}

/**
 * tpl 中表示日期的字符会被替换为对应的日期。
 * 表示日期的字符：
 *      y: 年，一个或多个，忽略大小写；
 *      M: 月，一个或多个；
 *      d: 日，一个或多个，忽略大小写；
 *      h: 时，一个或多个，忽略大小写；
 *      mm: 分，精确匹配；
 *      ss: 秒，精确匹配；
 *      ms: 毫秒，精确匹配。
 * @param {String} tpl 日期字符模板，eg: y-M-d h:mm:ss.ms | yYyy-MM-dddd h:mm:ss.ms
 * @param {Array} args 日期数组 [年，月，日，时，分，秒，毫秒], eg: [2020, 12, 11, '09', 36, 30, 168]
 * @returns {String} eg: 2020-12-11 09:36:30.168
 */
function parseDateStringTpl(tpl, args) {
    let dateStr = tpl;
    const strFormatterRegs = [/y+/gi, /M+/g, /d+/gi, /h+/gi, /mm/g, /ss/g, /ms/g];
    strFormatterRegs.forEach((reg, index) => {
        dateStr = dateStr.replace(reg, args[index]);
    });
    return dateStr;
}

/**
 * 获取格式化日期字符串，eg:
 *      getDateString() => 2020-12-11 09:36:30.168；
 *      getDateString('yyyy-MM-dd hh:mm:ss.ms') => 2020-12-11 09:36:30.168；
 *      getDateString('y年M月d日') => 2020年12月11日；
 *      getDateString('${1}月${2}日 ${3}时') => 12月11日 09时；
 *      getDateString(args => `${args[1]}月${args[2]}日 ${parseInt(args[3])}时`) => 12月11日 9时；
 * @param {String | Function} formatter 字符串模板或格式化函数，eg：
 *      1、日期字符模板，表示日期的字符：
 *          y: 年，一个或多个，忽略大小写；
 *          M: 月，一个或多个；
 *          d: 日，一个或多个，忽略大小写；
 *          h: 时，一个或多个，忽略大小写；
 *          mm: 分，精确匹配；
 *          ss: 秒，精确匹配；
 *          ms: 毫秒，精确匹配。
 *      2、字符串索引模板（优先使用，会忽略日期字符，${0~6}分别表示年、月、日、时、分、秒、毫秒）；
 *      3、格式化函数（传入字符串数组参数[year, month, day, hours, minutes, seconds, milliseconds]）
 * @param {*} date 日期对象 | 日期毫秒值 | 其它默认转为当前时间
 * @returns {String} eg: 2020-12-11 09:36:30.168
 */
function getDateString(formatter, date) {
    let d = date;
    if (!(date instanceof Date)) {
        d = window.isNaN(date) ? new Date() : new Date(+date);
    }
    const year = paddingString(d.getFullYear(), 4);
    const month = paddingString(d.getMonth() + 1, 2);
    const day = paddingString(d.getDate(), 2);
    const hours = paddingString(d.getHours(), 2);
    const minutes = paddingString(d.getMinutes(), 2);
    const seconds = paddingString(d.getSeconds(), 2);
    const milliseconds = paddingString(d.getMilliseconds(), 3);

    const args = [year, month, day, hours, minutes, seconds, milliseconds];

    // 格式化日期字符串
    let dateStr = '';
    if (typeof formatter === 'function') {
        // 把年、月、日...数组参数给传入的 formatter 函数处理，返回自定义格式
        dateStr = formatter(args);
    } else if (typeof formatter === 'string') {
        const testNumFormatterReg = /\$\{[0-6]\}/g;
        if (testNumFormatterReg.test(formatter)) {
            // 优先使用字符串索引模板格式化
            dateStr = parseKeyTpl(formatter, args);
        } else {
            // 使用特殊日期字符替换格式化
            dateStr = parseDateStringTpl(formatter, args);
        }
    } else {
        // 其它类型的 formatter 默认返回 yyyy-MM-dd hh:mm:ss.ms
        dateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    return dateStr;
}

/**
 * 自定义日志，用法同 window.console，基于 console 实现。
 * 实现: log, info, warn, error, myLog(可调用window.console的其它方法)；
 * 其它功能：notify，利用灯塔上报自定义内容
 * eg:
 * Log.env = ENV; // 设置全局环境，为 production 只输出 error 级别的日志
 * const console = new Log({ preText: 'hades', preStyle: { color: 'red' }});
 * console.log(123) 输入 `hades <log> 09:36:30.168 => 123`
 */
class Log {
    constructor({
        console,
        preText, // 自定义日志前缀，方便定位自己的log，比如文件名
        preStyle, // 自定义输出样式，类似 css 样式
        env // 为 production 只输出 error 级别的日志
    }) {
        this.console = console || window.console;
        this.preText = preText;
        this.preStyle = preStyle;
        this.env = env;

        this.myLog('log', 'new log instance with env', this.getEnv());
    }

    /**
     * 静态属性 env，全局配置，默认 production，当没有实例属性时使用
     */
    static env = 'production';

    /**
     * 静态属性 dt，全局配置，灯塔实例用于上报自定义的内容，结合灯塔报警机制，方便记录业务数据和发现前端问题
     */
    static dt = null;

    getNewInstance(...args) {
        return new Log(...args);
    }

    getEnv() {
        return this.env || Log.env;
    }

    getPreStyleString() {
        const preStyle = { color: '#3072F6', 'font-size': '16px;', ...this.preStyle };
        const styles = [];
        Object.keys(preStyle).forEach(key => {
            styles.push(`${key}:${preStyle[key]}`);
        });
        return styles.join(';');
    }

    myLog(type, ...args) {
        try {
            // env 为 production 只输出不使用样式信息 error 级别的日志。
            if (this.getEnv() === 'production') {
                if (type === 'error') {
                    const msgs = args.map(e => getErrorStack(e));
                    // 线上配合灯塔上报可读的错误信息
                    return this.console.error(msgs.join('; '));
                }
                return;
            }
            // 非生产环境打样有样式和自定义前缀的 log
            return this.console[type](
                `%c${this.preText || ''} <${type}> ${getDateString('hh:mm:ss.ms')} => `,
                this.getPreStyleString(),
                ...args
            );
        } catch (e) {
            // just in case unsupported type
            return this.console.error(`Log Exception: unsupported type [${type}] ${args}`);
        }
    }

    log(...args) {
        return this.myLog('log', ...args);
    }

    info(...args) {
        return this.myLog('info', ...args);
    }

    warn(...args) {
        return this.myLog('warn', ...args);
    }

    error(...args) {
        return this.myLog('error', ...args);
    }

    /**
     * JS错误主动上报灯塔接口
     * @param {String} errorName 错误类型, 推荐格式 => "错误类型(中文)_${具体错误名}", 最长200字
     * @param {String} url       错误对应的url,  location.host + location.pathname,
     *  不包括get参数(get参数可以转成json后放在detail中), 最长200个字
     * @param {Object} extraInfo 附属信息, 可以填写任意字段,例如：
     *                 => extraInfo 中以下字段填写后可以在后台错误日志列表中直接展示
     *                 =>        trace_url         // [String]请求对应的trace系统查看地址, 例如: trace系统url + trace_id
     *                 =>        http_code         // [Number]接口响应的Http状态码，
     *                 =>        during_ms         // [Number]接口响应时长(毫秒)
     *                 =>        request_size_b    // [Number]post参数体积, 单位b
     *                 =>        response_size_b   // [Number]响应值体积, 单位b
     *                 => 其余字段会作为补充信息进行展示
     */
    notify(errorName, url, extraInfo) {
        const dt = Log.dt || window.dt;
        try {
            if (!dt || !dt.notify) {
                throw new Error('dt notify 不可用');
            }
            return dt.notify(
                String(errorName).substr(0, 199),
                String(url || window.location.href).substr(0, 199),
                extraInfo
            );
        } catch (e) {
            e.message += `${errorName} ${url} ${JSON.stringify(extraInfo)}`;
            return this.error(e);
        }
    }
}

export default Log;

export {
    Log,

    // 附带导出一些工具方法
    getErrorStack,
    isEmpty,
    getDateString,
    paddingString,
    parseKeyTpl,
    parseDateStringTpl
};
