
/**
 * @file 增加水印的Util
 * @author songbei002@ke.com
 * @date 2020/8/14
 */
import env from './env.js';


const waterMark = {
    waterDocument: (settings) => {
        const defaultSettings = {
            container: document.body,
            width: '2000',
            height: '1000',
            colWidth: '200',
            rowHeight: '200',
            textAlign: 'center',
            textBaseline: 'middle',
            font: '14px Microsoft Yahei',
            fillStyle: 'rgba(0, 0, 0, 0.06)',
            content: '保密水印',
            rotate: '-30',
            // 控制层级 优先级最高
            translateZ: '3px',
        };
        // object.assign兼容性解决
        if (typeof Object.assign != 'function') {
            (function () {
                Object.assign = function (target) {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    const output = Object(target);
                    for (let index = 1; index < arguments.length; index++) {
                        // eslint-disable-next-line prefer-rest-params
                        const source = arguments[index];
                        if (source !== undefined && source !== null) {
                            // eslint-disable-next-line no-restricted-syntax
                            for (const nextKey in source) {
                                // eslint-disable-next-line no-prototype-builtins
                                if (source.hasOwnProperty(nextKey)) {
                                    output[nextKey] = source[nextKey];
                                }
                            }
                        }
                    }
                    return output;
                };
            }());
        }

        settings = Object.assign(defaultSettings, settings);

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', settings.width);
        canvas.setAttribute('height', settings.height);
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            console.error('this browser is not support canvas.');
            return;
        }
        // 如果不支持point-event 可以直接返回不添加水印
        if (!('pointerEvents' in document.documentElement.style)) {
            return;
        }
        ctx.textAlign = settings.textAlign;
        ctx.textBaseline = settings.textBaseline;
        ctx.font = settings.font;
        ctx.fillStyle = settings.fillStyle;
        const row = settings.width / settings.colWidth;
        const col = settings.height / settings.rowHeight;
        for (let i = col; i >= 0; i--) { // 添加横竖不对齐的水印
            for (let j = 0; j <= row; j++) {
                ctx.save();
                ctx.translate(i * 30 + j * settings.colWidth, (col - i) * settings.rowHeight + j * 30);
                ctx.rotate(Math.PI / 180 * settings.rotate);
                ctx.fillText(settings.content, 0, 0);
                ctx.restore();
            }
        }
        const base64Url = canvas.toDataURL();
        const __wm = document.querySelector('.__wm');
        const watermarkDiv = __wm || document.createElement('div');
        let styleStr = 'position:fixed;width:100%;height:100%;pointer-events:none;background-repeat:no-repeat;';
        styleStr = `${styleStr}transform:translateZ(${settings.translateZ});`;
        styleStr = `${styleStr}background-image:url(${base64Url})`;
        watermarkDiv.setAttribute('style', styleStr);
        watermarkDiv.classList.add('__wm');
        if (!__wm) {
            settings.container.insertBefore(watermarkDiv, settings.container.firstChild);
        }
        // 增加开发环节和线上环境的判断
        if (env.isProd()) {
            const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                let mo = new MutationObserver((() => {
                    const __wmDiv = document.querySelector('.__wm');
                    // 只在__wmDiv元素变动才重新调用 __canvasWM
                    if ((__wmDiv && __wmDiv.getAttribute('style') !== styleStr) || !__wmDiv) {
                        // 避免一直触发
                        mo.disconnect();
                        mo = null;
                        waterMark.__waterDocument(settings && JSON.parse(JSON.stringify(settings)));
                    }
                }));
                mo.observe(settings.container, {
                    attributes: true,
                    subtree: true,
                    childList: true,
                });
            }
        }
    },
    __waterDocument: (settings) => {
        const defaultSettings = {
            container: document.body,
            width: '400px',
            height: '250px',
            textAlign: 'center',
            textBaseline: 'middle',
            font: '14px Microsoft Yahei',
            fillStyle: 'rgba(0, 0, 0, 0.06)',
            content: '保密水印',
            rotate: '-30',
            zIndex: 999999,
            // 控制层级 优先级最高
            translateZ: '3px',
        };
        // object.assign兼容性解决
        if (typeof Object.assign != 'function') {
            (function () {
                Object.assign = function (target) {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    const output = Object(target);
                    for (let index = 1; index < arguments.length; index++) {
                        // eslint-disable-next-line prefer-rest-params
                        const source = arguments[index];
                        if (source !== undefined && source !== null) {
                            // eslint-disable-next-line no-restricted-syntax
                            for (const nextKey in source) {
                                // eslint-disable-next-line no-prototype-builtins
                                if (source.hasOwnProperty(nextKey)) {
                                    output[nextKey] = source[nextKey];
                                }
                            }
                        }
                    }
                    return output;
                };
            }());
        }

        settings = Object.assign(defaultSettings, settings);

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', settings.width);
        canvas.setAttribute('height', settings.height);
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            console.error('this browser is not support canvas.');
            return;
        }
        // 如果不支持point-event 可以直接返回不添加水印
        if (!('pointerEvents' in document.documentElement.style)) {
            return;
        }
        ctx.textAlign = settings.textAlign;
        ctx.textBaseline = settings.textBaseline;
        ctx.font = settings.font;
        ctx.fillStyle = settings.fillStyle;
        ctx.translate(parseFloat(settings.width) / 2, parseFloat(settings.height) / 2);
        ctx.rotate(Math.PI / 180 * settings.rotate);
        ctx.fillText(settings.content, 0, 0);
        const base64Url = canvas.toDataURL();
        const __wm = document.querySelector('.__wm');
        const watermarkDiv = __wm || document.createElement('div');
        let styleStr = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;background-repeat:repeat;';
        styleStr = `${styleStr}z-index:${settings.zIndex};`;
        styleStr = `${styleStr}transform:translateZ(${settings.translateZ});`;
        styleStr = `${styleStr}background-image:url(${base64Url})`;
        watermarkDiv.setAttribute('style', styleStr);
        watermarkDiv.classList.add('__wm');
        if (!__wm) {
            settings.container.insertBefore(watermarkDiv, settings.container.firstChild);
        }
        // 增加开发环节和线上环境的判断
        if (env.isProd()) {
            const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                let mo = new MutationObserver((() => {
                    const __wmDiv = document.querySelector('.__wm');
                    // 只在__wmDiv元素变动才重新调用 __canvasWM
                    if ((__wmDiv && __wmDiv.getAttribute('style') !== styleStr) || !__wmDiv) {
                        // 避免一直触发
                        mo.disconnect();
                        mo = null;
                        waterMark.__waterDocument(settings && JSON.parse(JSON.stringify(settings)));
                    }
                }));
                mo.observe(settings.container, {
                    attributes: true,
                    subtree: true,
                    childList: true,
                });
            }
        }
    },
};
export default waterMark;
