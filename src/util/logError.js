/*
 * @Date: 2020-09-25 11:34:12
 * @LastEditTime: 2020-10-21 20:44:40
 * @LastEditors: Please set LastEditors
 * @Description: 错误日志上报，优先上报灯塔（report_为前缀的错误），灯塔不存在时会上报至罗盘（事件Id为'20619'）
 */
let win = {};
if (typeof window !== 'undefined') {
    // 兼容服务端渲染window不存在时
    win = window;
}
const { location = {} } = win;

/** 日志上报函数
 * @param {string} error
 * @param {string} errorName 错误名称
 * @param {object} errorInfo 堆栈的 info 对象
 */
export default function (error, errorInfo, errorName = 'report_error') {
    if (!error || typeof error !== 'string') {
        console.warn('params type error: first param(error) mast be a string and not null');
        return;
    }
    const task = setTimeout(() => {
        const { href = '' } = location;
        if (win.dt && win.dt.notify) {
            win.dt.notify(`${errorName}_${error.substr(0, 170)}`, href.substr(0, 199), errorInfo);
        } else {
            console.error(error);
        }
        clearTimeout(task);
    }, 100);
}
