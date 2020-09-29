/**
 * @file fetch loading
 * @author mengqingchun002@ke.com
 * @date 2019/3/28 07:06
 */

import '../css/index.less';

// 默认参数
const defaultOptions = {
    text: '加载中...'
};

class M {
    constructor(elem, opt) {
        this.init(elem, opt);
    }

    init(elem, opt) {
        // TODO 需要处理没有传入elem的情况
        // TODO 检查elem元素，看该元素上是否已经有loading组件，如果有，不再创建，如果没有则重新创建
        if (typeof elem !== 'string') {
            opt = elem;
            this.elem = document.body;
        } else {
            // TODO 需要兼容class 一般的选择器
            this.elem = document.getElementById(elem);
            /* eslint-disable */
            this.elem = this.elem
                ? this.elem
                : document.querySelector(elem)
                ? document.querySelector(elem)
                : document.getElementsByName(elem);
        }
        // 初始状态时，loading不展示
        this.hasShow = false;
        this.options = Object.assign({}, defaultOptions, opt); // 配置参数
        this.spinContainer = this.complie();
    }

    complie() {
        if (this.elem.className.includes('fetch-spin-loading')) {
            return '';
        }

        this.elem.classList.add('fetch-spin-nested-loading');
        this.elem.classList.add('fetch-spin-loading');
        const docContainer = document.createElement('div');
        const defaultText = this.options.text;
        const _innerHTML = `<div class="fetch-spin fetch-spin-show-text fetch-spin-spinning">
                            <span class="fetch-spin-dot fetch-spin-dot-spin">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </span>
                            <div class="fetch-spin-text">${defaultText}</div>
                        </div>`;
        docContainer.classList.add('fetch-spin-container');
        docContainer.innerHTML = _innerHTML;

        return docContainer;
    }

    show() {
        this.hasShow = true;
        this.elem.appendChild(this.spinContainer);
        this.spinContainer.style.display = 'block';
    }

    close() {
        if (this.hasShow) {
            // this.spinContainer.remove();
            // this.elem.classList.remove('fetch-spin-nested-loading');
            // this.elem.classList.remove('fetch-spin-loading');
            this.spinContainer.style.display = 'none';
        }
    }
}

const loading = (function () {
    // 保证当前elem只有一个loading实例

    const instance = new M();

    return {
        showLoading(elem, opt) {
            instance.show(elem, opt);
        },
        hideLoading() {
            instance.close();
        }
    };
})();
export default loading;
