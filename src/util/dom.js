/**
 * @file DOM操作相关
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:29
 */

const dom = {
    /**
     * 兼容 ie 的 DOM 事件绑定函数
     * @param {Node} target
     * @param {String} eventType
     * @param {Function} callback
     * @return {Object} result - 属性方法 remove，直接调用 result.remove() 解除事件绑定
     */
    addEventListener: (target, eventType, callback) => {
        if (target.addEventListener) {
            target.addEventListener(eventType, callback, false);
            return {
                remove() {
                    target.removeEventListener(eventType, callback, false);
                },
            };
        }
        if (target.attachEvent) {
            target.attachEvent(`on${eventType}`, callback);
            return {
                remove() {
                    target.detachEvent(`on${eventType}`, callback);
                },
            };
        }
    },

    /**
     * 判断容器节点是否包含指定节点
     * @param {Node} root - 容器节点
     * @param {Node} n - 指定节点
     * @return {Boolean}
     */
    contains: (root, n) => {
        let node = n;
        while (node) {
            if (node === root) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    },
    on: () => {

    },
    off: () => {

    },
    /**
     * 获取dom元素scrollWidth
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    scrollWidth: (elem) => {
        if (!elem) return false;
        const isWindow = o => o != null && o === o.window;

        if (isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            const bw = document.body ? document.body.scrollWidth : 0;
            const dw = document.documentElement ? document.documentElement.scrollWidth : 0;
            return Math.max(bw, dw);
        }

        return elem.scrollWidth;
    },
    /**
     * 获取dom元素scrollHeight
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    scrollHeight: (elem) => {
        if (!elem) return false;
        const isWindow = o => o != null && o === o.window;

        if (isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            const bh = document.body ? document.body.scrollHeight : 0;
            const dh = document.documentElement ? document.documentElement.scrollHeight : 0;
            return Math.max(bh, dh);
        }

        return elem.scrollHeight;
    },
    /**
     * 获取dom元素clientWidth
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    clientWidth: (elem) => {
        if (!elem) return false;
        const isWindow = o => o != null && o === o.window;

        if (isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            const bw = document.body ? document.body.clientWidth : 0;
            const dw = document.documentElement ? document.documentElement.clientWidth : 0;
            return Math.max(bw, dw);
        }

        return elem.clientWidth;
    },
    /**
     * 获取dom元素clientHeight
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    clientHeight: (elem) => {
        if (!elem) return false;
        const isWindow = o => o != null && o === o.window;

        if (isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            const bh = document.body ? document.body.clientHeight : 0;
            const dh = document.documentElement ? document.documentElement.clientHeight : 0;
            return Math.max(bh, dh);
        }

        return elem.clientHeight;
    },
    offsetWidth: () => {

    },
    offsetHeight: () => {

    },
    /**
     * 获取window元素宽度
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    windowWidth: (elem) => {
        if (!elem) elem = window;
        const isWindow = o => o != null && o === o.window;

        if (isWindow(elem)) { // 如果是window元素
            return elem.document.documentElement.clientWidth;
        }

        if (elem.nodeType === 9) { // 如果是document元素
            const doc = elem.documentElement;
            return Math.max(elem.body.clientWidth, doc.clientWidth);
        }

        return elem.clientWidth;
    },
    /**
     * 获取window元素高
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    windowHeight: (elem) => {
        if (!elem) elem = window;
        const isWindow = o => o != null && o === o.window;

        if (isWindow(elem)) { // 如果是window元素
            return elem.document.documentElement.clientHeight;
        }

        if (elem.nodeType === 9) { // 如果是document元素
            const doc = elem.documentElement;
            return Math.max(elem.body.clientHeight, doc.clientHeight);
        }

        return elem.clientHeight;
    },

};

export default dom;
