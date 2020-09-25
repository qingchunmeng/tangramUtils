/*
 * @Date: 2020-09-25 11:34:12
 * @LastEditTime: 2020-09-25 17:02:17
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
 * @param {object} errorInfo 堆栈的 info 对象
 */
export default function (error, errorInfo) {
    if (!error) {
        return;
    }
    setTimeout(() => {
        if (win.dt && win.dt.notify) {
            const { href = '' } = location;
            win.dt.notify(
                `report_error_${String(error).substr(0, 170)}`,
                href.substr(0, 199),
                errorInfo,
            );
        } else if (win.$ULOG) {
            try {
                win.$ULOG.send('20619', {
                    pid: 'nts_pc_errorcatch',
                    action: {
                        error_message: error,
                        error_info: JSON.stringify(errorInfo) // 对应罗盘维度‘错误信息’
                    }
                });
            } catch (e) {
                win.$ULOG.send('20619', {
                    pid: 'nts_pc_errorcatch',
                    action: {
                        error_message: `上报错误时报错：${e.message}` // 对应罗盘维度‘错误信息’
                    }
                });
            }
        }
    }, 100);
}
