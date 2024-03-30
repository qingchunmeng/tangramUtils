/**
 * @file DOM操作相关
 */

import { kebabCase, isNumber, isObject, flattenDeep, uniq } from 'lodash';
import { stringifyUrl } from './route';
import { isEmptyObject } from './types';
import validate from './validate.js';

// 给元素批量设置属性
const setAttrs = (ele, attrs = {}) => {
    Object.entries(attrs).forEach(([k, v]) => {
        ele.setAttribute(k, v);
    });
};

// 下载 blob
const downloadBlob = (blob, options = {}) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = e => {
        const elmentA = document.createElement('a');
        const href = e.target.result;
        setAttrs(elmentA, { ...options, href });
        document.body.appendChild(elmentA);
        elmentA.click();
        document.body.removeChild(elmentA);
    };
};

// 下载文件
const download = (url = '', params = {}) => {
    const elmentA = document.createElement('a');
    const href = stringifyUrl(url, params);
    setAttrs(elmentA, { href, download: href, target: '_blank' });
    elmentA.click();
};

// 当值为数字时, 加上单位 `px` 的css属性
const DefaultUnitsPxProperties = ['font-size', 'margin', 'padding', 'border'];

// margin, padding, border
['top', 'right', 'bottom', 'left'].forEach(v => {
    DefaultUnitsPxProperties.push(v);
    DefaultUnitsPxProperties.push(['margin', v].join('-'));
    DefaultUnitsPxProperties.push(['margin', v].join('-'));
    DefaultUnitsPxProperties.push(['border', v, 'width'].join('-'));
});

// max min
['width', 'height'].forEach(v => {
    DefaultUnitsPxProperties.push(v);
    DefaultUnitsPxProperties.push(['max', v].join('-'), ['min', v].join('-'));
});

// 给cssom加上单位px
const convertCssom = (cssom = {}) => {
    return Object.entries(cssom).reduce((prev, [k, v]) => {
        const key = kebabCase(k);
        // 对于一些特定属性, 当值为数字时, 加上单位 px
        if (isNumber(v) && DefaultUnitsPxProperties.includes(key)) {
            prev[key] = `${v}px`;
        } else {
            prev[key] = v;
        }
        return prev;
    }, {});
};

// 给元素批量设置样式
const setStyle = (ele, cssom) => {
    const computedCssom = convertCssom(cssom);
    Object.entries(computedCssom).forEach(([k, v]) => {
        ele.style[k] = v;
    });
};

// 获取 cssText
const getCssText = (cssom = {}) => {
    if (isEmptyObject(cssom)) {
        return '';
    }
    const computedCssom = convertCssom(cssom);
    const cssText = Object.entries(computedCssom)
        .reduce((prev, [k, v]) => {
            prev.push([k, v].join(': '));
            return prev;
        }, [])
        .join('; ');
    return [cssText, ';'].join('');
};

// 获取字符串在浏览器中所占的长度
const getWordWidth = (word = '', cssom = {}) => {
    const eleSpan = document.createElement('span');
    const defaultCssom = { visibility: 'hidden', whiteSpace: 'nowrap', fontSize: 14 };
    eleSpan.style.cssText = getCssText({
        ...defaultCssom,
        ...cssom
    });
    document.body.appendChild(eleSpan);
    eleSpan.innerText = word;
    const width = eleSpan.offsetWidth;
    document.body.removeChild(eleSpan);
    return Math.ceil(Number.parseFloat(width));
};

// 复制文本
const copyText = (text = '') => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
};

// 轮子王: https://www.npmjs.com/package/classnames
const classNames = (...args) => {
    const classNameList = [];
    flattenDeep([args]).forEach(v => {
        if (isObject(v)) {
            Object.entries(v).forEach(([k2, v2]) => {
                if (v2) {
                    classNameList.push(k2);
                }
            });
        } else {
            classNameList.push(String(v || '').trim());
        }
    });
    return uniq(classNameList.filter(Boolean)).join(' ');
};

// 给 className 加后缀
const suffixClassNames = (baseClassName = '', suffixConfig = {}, config = {}) => {
    const computedConfig = {
        separator: '-',
        ...config
    };
    const classNameList = [baseClassName];
    Object.entries(suffixConfig).forEach(([k, v]) => {
        if (v) {
            classNameList.push([baseClassName, k].join(computedConfig.separator));
        }
    });
    return classNames(classNameList);
};

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
                }
            };
        }
        if (target.attachEvent) {
            target.attachEvent(`on${eventType}`, callback);
            return {
                remove() {
                    target.detachEvent(`on${eventType}`, callback);
                }
            };
        }
        return {
            remove() {}
        };
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
    on: () => {},
    off: () => {},
    /**
     * document元素方法兼容
     * @param {String} attr - 方法名称
     * @return {Number}
     */
    getDocumentAttr: attr => {
        if (!attr) {
            // eslint-disable-next-line no-console
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
    scrollWidth: elem => {
        if (!elem) {
            // eslint-disable-next-line no-console
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) {
            // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('scrollWidth');
        }

        return elem.scrollWidth;
    },
    /**
     * 获取dom元素scrollHeight
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    scrollHeight: elem => {
        if (!elem) {
            // eslint-disable-next-line no-console
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) {
            // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('scrollHeight');
        }

        return elem.scrollHeight;
    },
    /**
     * 获取dom元素clientWidth
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    clientWidth: elem => {
        if (!elem) {
            // eslint-disable-next-line no-console
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) {
            // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('clientWidth');
        }

        return elem.clientWidth;
    },
    /**
     * 获取dom元素clientHeight
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    clientHeight: elem => {
        if (!elem) {
            // eslint-disable-next-line no-console
            console.log('请传递dom元素');
            return false;
        }

        if (validate.isWindow(elem) || elem.nodeType === 9) {
            // 如果是窗口对象, 或者document对象
            return dom.getDocumentAttr('clientHeight');
        }

        return elem.clientHeight;
    },
    offsetWidth: () => {},
    offsetHeight: () => {},
    /**
     * 获取window元素宽度
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    windowWidth: elem => {
        if (!elem) {
            // eslint-disable-next-line no-param-reassign
            elem = window;
        }

        if (validate.isWindow(elem)) {
            // 如果是window元素
            return elem.document.documentElement.clientWidth;
        }

        if (elem.nodeType === 9) {
            // 如果是document元素
            return dom.getDocumentAttr('clientWidth');
        }

        return elem.clientWidth;
    },
    /**
     * 获取window元素高
     * @param {Node} elem - dom元素
     * @return {Number}
     */
    windowHeight: elem => {
        if (!elem) {
            // eslint-disable-next-line no-param-reassign
            elem = window;
        }

        if (validate.isWindow(elem)) {
            // 如果是window元素
            return elem.document.documentElement.clientHeight;
        }

        if (elem.nodeType === 9) {
            // 如果是document元素
            return dom.getDocumentAttr('clientHeight');
        }

        return elem.clientHeight;
    },
    // 修改document.title的方法,兼容ios下微信浏览器setTitle
    setTitle: title => {
        document.title = title;
        try {
            const $iframe = document.createElement('iframe');
            $iframe.src = 'https://mat1.gtimg.com/finance/images/stock/p/app_find/0aeaebc1d193ebf5.png';
            $iframe.onload = () => {
                setTimeout(() => {
                    document.body.removeChild($iframe);
                }, 0);
            };
            document.body.append($iframe);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    },
    addClass: (target, className) => {
        if (!target || target.length == 0) {
            return;
        }
        if (target.length > 0) {
            target.forEach(node => {
                dom.addClass(node, className);
            });
            return;
        }
        let classNameArray = (target.getAttribute('class') || '').split(/\s+/);
        classNameArray = classNameArray.filter(key => key != className);
        classNameArray.push(className);
        target.setAttribute('class', classNameArray.join(' '));
    },
    removeClass: (target, className) => {
        if (!target || target.length == 0) {
            return;
        }
        if (target.length > 0) {
            target.forEach(node => {
                dom.removeClass(node, className);
            });
            return;
        }
        let classNameArray = (target.getAttribute('class') || '').split(/\s+/);
        classNameArray = classNameArray.filter(key => key != className);
        target.setAttribute('class', classNameArray.join(' '));
    }
};

export default {
    setAttrs,
    downloadBlob,
    download,
    convertCssom,
    setStyle,
    getCssText,
    getWordWidth,
    copyText,
    classNames,
    suffixClassNames,
    ...dom
};
