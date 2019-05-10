/**
 * @file DOM操作相关
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:29
 */
import validate from './validate.js';

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
     * document元素方法兼容
     * @param {String} attr - 方法名称
     * @return {Number}
     */
    getDocumentAttr: (attr) => {
        if (!attr) {
            console.log('请传递attr属性');
            return false;
        }
        const doc = document.documentElement;

        return Math.max(document.body[attr], doc[attr]);
    },
    /**
     * 获取dom元素scrollWidth
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    scrollWidth: (elem) => {
        if (!elem) {
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('scrollWidth');
        }

        return elem.scrollWidth;
    },
    /**
     * 获取dom元素scrollHeight
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    scrollHeight: (elem) => {
        if (!elem) {
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('scrollHeight');
        }

        return elem.scrollHeight;
    },
    /**
     * 获取dom元素clientWidth
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    clientWidth: (elem) => {
        if (!elem) {
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('clientWidth');
        }

        return elem.clientWidth;
    },
    /**
     * 获取dom元素clientHeight
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    clientHeight: (elem) => {
        if (!elem) {
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) { // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('clientHeight');
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

        if (validate.isWindow(elem)) { // 如果是window元素
            return elem.document.documentElement.clientWidth;
        }

        if (elem.nodeType === 9) { // 如果是document元素
            return dom.getDocumentAttr('clientWidth');
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

        if (validate.isWindow(elem)) { // 如果是window元素
            return elem.document.documentElement.clientHeight;
        }

        if (elem.nodeType === 9) { // 如果是document元素
            return dom.getDocumentAttr('clientHeight');
        }

        return elem.clientHeight;
    },
    // 修改document.title的方法,兼容ios下微信浏览器setTitle
    setTitle: (title) => {
        document.title = title;
        try {
            const $iframe = document.createElement('iframe');
            $iframe.src = 'https://mat1.gtimg.com/finance/images/stock/p/app_find/0aeaebc1d193ebf5.png';
            $iframe.onload = function () {
                setTimeout(() => {
                    document.body.removeChild($iframe);
                }, 0);
            };
            document.body.append($iframe);
        } catch (e) {
            console.log(e);
        }
    },
};

export default dom;
