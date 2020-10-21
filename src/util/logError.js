/*
 * @Date: 2020-09-25 11:34:12
 * @LastEditTime: 2020-10-21 20:44:40
 * @LastEditors: Please set LastEditors
 * @Description: 错误日志上报，优先上报灯塔（report_为前缀的错误），灯塔不存在时会上报至罗盘（事件Id为'20619'）
 */
let win = {};
if (typeof window !== 'undefined') { // 兼容服务端渲染window不存在时
    win = window;
}
const { location = {} } = win;

/** 日志上报函数
 * @param {string} error
 * @param {string} errorName 错误名称
 * @param {object} errorInfo 堆栈的 info 对象
 */
export default function (error, errorName = 'report_error', errorInfo) {
    if (!error) {
        return;
    }
    setTimeout(() => {
        const { href = '' } = location;
        if (win.dt && win.dt.notify) {
            win.dt.notify(
                `${errorName}_${String(error).substr(0, 170)}`,
                href.substr(0, 199),
                errorInfo
            );
        } else if (win.$ULOG) {
            const ulogConfig = (win.$ULOG.getConfig && win.$ULOG.getConfig()) || {};
            try {
                win.$ULOG.send('37166', {
                    pid: 'nts_pc_errorcatch',
                    uicode: 'error_catch',
                    action: {
                        pid: ulogConfig.pid || '',
                        source_url: href.substr(0, 199),
                        error_message: error,
                        error_name: errorName,
                        error_info: JSON.stringify(errorInfo) // 对应罗盘维度‘错误信息’
                    }
                });
            } catch (e) {
                win.$ULOG.send('37166', {
                    pid: 'nts_pc_errorcatch',
                    uicode: 'error_catch',
                    action: {
                        pid: ulogConfig.pid || '',
                        source_url: href.substr(0, 199),
                        error_name: errorName,
                        error_message: `上报错误时报错：${e.message}` // 对应罗盘维度‘错误信息’
                    }
                });
            }
        }
    }, 100);
}
