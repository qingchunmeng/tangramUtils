/**
 * Desc: html2canvas的方法重新一些，为了使用1.0.0-rc.4版本，因为微信高版本下会有问题
 */
import html2canvas from 'html2canvas';
import { isString } from 'lodash';

/**
 * [html2canvas 包装]
 * @param  {[string, element]} domRefer   [元素的id, 或者直接传入dom元素]
 * @param  {Object} options [同 html2canvas 的config]
 * @return {[promise<string>]}         [截图的base64字符串]
 */
export const htmlToImg = (domRefer, options = {}) => {
    let dom;
    if (isString(domRefer)) {
        // 元素的id
        dom = document.getElementById(domRefer);
    } else {
        // 直接传入dom元素
        dom = domRefer;
    }
    const domHeight = dom.scrollHeight;
    let config = {
        // 设置一个默认的配置
        height: domHeight,
        width: dom.scrollWidth,
        useCORS: true,
        logging: true,
        scale: 1,
        allowTaint: false,
        foreignObjectRendering: false,
        async: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY
    };
    config = Object.assign(config, options);
    return new Promise((resolve, reject) => {
        html2canvas(dom, config)
            .then(res => {
                resolve(res.toDataURL('image/jpeg'));
            })
            .catch(e => {
                reject(e);
            });
    });
};

export default html2canvas;
