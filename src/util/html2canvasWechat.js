/**
 * Copyright © 贝壳找房交易平台
 * User: lihaixu@ke.com
 * Date: 2020/9/27 8:50 下午
 * Desc: html2canvas的方法重新一些，为了使用1.0.0-rc.4版本，因为微信高版本下会有问题
 */
import html2canvas from 'html2canvas';

export const htmlToImg = (domId, options = {}) => {
    const dom = document.getElementById(domId);
    const domHeight = dom.scrollHeight;
    let config = { // 设置一个默认的配置
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
        html2canvas(dom, config).then(res => {
            resolve(res.toDataURL('image/jpg'));
        }).catch(e => {
            reject(e);
        });
    });
};

export default html2canvas;
