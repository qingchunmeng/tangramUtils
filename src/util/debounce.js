/**
 * 防抖/节流函数：
 * 防止事件处理函数频繁触发，来不及响应或带来资源浪费。
 * @param {Function} handle 需要防抖/节流的函数
 * @param {Object} options
 *        {Boolean} options.isFront 是否立即执行。false，时间间隔 timeGap 后执行
 *        {Number} options.timeGap 函数执行的最小时间间隔。
 *        {Boolean} options.isReset 在时间间隔内有发起调用，是否重新计算时间间隔，
 *                                  例如：用户键盘输入后一段时间才进行搜索，
 *                                  如果中间有多次输入，则在最后一次输入计算时间间隔
 *        {Boolean} options.isPromise 如果是 Promise，则在异步结束才能再次执行函数。
 *                                    此时 isFront、timeGap、isReset 无效
 * @return {Function}
 */
export default function debounce(handle, options) {
    let timeoutID = '';
    const {
        isFront = true,
        timeGap = 100,
        isReset = false,
        isPromise = false,
    } = options;

    return function (...args) {
        if (timeoutID) {
            if (isReset && !isPromise) {
                timeoutID && clearTimeout(timeoutID);
                if (isFront) {
                    timeoutID = setTimeout(() => {
                        timeoutID = '';
                    }, timeGap);
                } else {
                    timeoutID = setTimeout(() => handle.apply(this, args), timeGap);
                }
            }
            return;
        }
        timeoutID = true;
        if (isPromise) {
            handle.apply(this, args).then(() => {
                timeoutID = '';
            });
        } else if (isFront) {
            handle.apply(this, args);
            timeoutID = setTimeout(() => {
                timeoutID = '';
            }, timeGap);
        } else {
            timeoutID = setTimeout(() => {
                handle.apply(this, args);
                timeoutID = '';
            }, timeGap);
        }
    };
}
