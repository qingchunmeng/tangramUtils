/**
 * @file 增加水印的Util
 */
import env from './env.js';

const waterMark = {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    waterDocument: setting => {
        const defaultSettings = {
            container: document.body,
            width: window.screen.width,
            height: window.screen.height,
            colWidth: 200,
            rowHeight: 200,
            textAlign: 'center',
            textBaseline: 'middle',
            font: '14px Microsoft Yahei',
            fillStyle: 'rgba(0, 0, 0, 0.06)',
            content: '保密水印',
            rotate: '-30',
            space: 30, // 同行同列的位置差
            zIndex: 999999,
            // 控制层级 优先级最高
            translateZ: '3px'
        };

        const settings = { ...defaultSettings, ...setting };

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', settings.width);
        canvas.setAttribute('height', settings.height);
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            // eslint-disable-next-line no-console
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
        const col = settings.width / settings.colWidth;
        const row = settings.height / settings.rowHeight;
        // 添加横竖不对齐的水印
        for (let i = col; i >= 0; i--) {
            for (let j = 0; j <= row; j++) {
                ctx.save();
                // eslint-disable-next-line max-len
                ctx.translate(
                    i * settings.space + j * settings.colWidth,
                    (col - i) * settings.rowHeight + j * settings.space
                );
                ctx.rotate((Math.PI / 180) * settings.rotate);
                ctx.fillText(settings.content, 0, 0);
                ctx.restore();
            }
        }
        const base64Url = canvas.toDataURL();
        const wm = document.querySelector('.__wm');
        const watermarkDiv = wm || document.createElement('div');
        let styleStr = 'position:fixed;width:100%;height:100%;pointer-events:none;background-repeat:no-repeat;';
        styleStr = `${styleStr}z-index:${settings.zIndex};`;
        styleStr = `${styleStr}transform:translateZ(${settings.translateZ});`;
        styleStr = `${styleStr}background-image:url(${base64Url})`;
        watermarkDiv.setAttribute('style', styleStr);
        watermarkDiv.classList.add('__wm');
        if (!wm) {
            settings.container.insertBefore(watermarkDiv, settings.container.firstChild);
        }
        // 增加开发环节和线上环境的判断
        if (env.isProd()) {
            const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                let mo = new MutationObserver(() => {
                    const wmDiv = document.querySelector('.__wm');
                    // 只在__wmDiv元素变动才重新调用 __canvasWM
                    if ((wmDiv && wmDiv.getAttribute('style') !== styleStr) || !wmDiv) {
                        // 避免一直触发
                        mo.disconnect();
                        mo = null;
                        waterMark.waterDocument(settings);
                    }
                });
                mo.observe(settings.container, {
                    attributes: true,
                    subtree: true,
                    childList: true
                });
            }
        }
    }
};
export default waterMark;
