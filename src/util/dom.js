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
   * 返回android,ios,pc
   */
    scrollWidth: () => {

    },
    scrollHeight: () => {

    },
    clientWidth: () => {

    },
    clientHeight: () => {

    },
    offsetWidth: () => {

    },
    offsetHeight: () => {

    },
    windowWidth: () => {

    },
    windowHeight: () => {

    },

};

export default dom;
