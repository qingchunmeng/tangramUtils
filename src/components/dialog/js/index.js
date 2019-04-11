/**
 * @file 弹窗组件
 * @author mengqingchun002@ke.com
 * @date 2019/3/11 11:58
 */

import '../css/index.less';

let instance;
// 默认的配置信息
const defaultOptions = {
    show: true,
    title: null,
    body: null,
    btns: {
        cancel: {
            text: '取消',
            handler() {
            },
        },
        confirm: {
            text: '确定',
            handler() {
                // console.info('confirm');
            },
        },
    },
};

class M {
    constructor() {
        // 动画函数数组
        this.animaArr = [['fadeIn', 'fadeOut'], ['slideDown', 'slideUp'], ['scaleIn', 'scaleOut']];
        // 当前动画类型
        this.currAnimation = 0;
        // 是否打开点击遮罩层关闭弹窗
        this.shadeClose = false;
        // 弹窗配置
        this.options = Object.assign({}, defaultOptions);
        // 绑定事件
        this.bindEvent();
    }

    /**
   * 生成按钮模版
   * @param btns 按钮的配置信息
   * @returns {string} 返回生成的按钮模版
   */
    generateBtns(btns) {
        let btnsTpl = '';
        // TODO 这里需要修改为根据数据对象生成按钮
        if (btns.confirm) {
            /* eslint-disable */
            btnsTpl += `<button class="fetch-btn fetch-confirm-btn" data-btn-type="confirm">${btns.confirm.text}</button>`;
        }
        if (btns.cancel) {
            /* eslint-disable */
            btnsTpl += `<button class="fetch-btn fetch-cancel-btn" data-btn-type="cancel">${btns.cancel.text}</button>`;
        }
        Object.keys(btns).forEach((o) => {
            if (o != 'confirm' && o != 'cancel') {
                /* eslint-disable */
                btnsTpl += `<button class="fetch-btn ${btns[o].cls}" data-btn-type="${o}">${btns[o].text || '自定义2'}</button>`;
            }
        });
        return btnsTpl;
    }

    /**
   * 编译生成弹窗的模版信息
   * @param options 弹窗的配置信息
   * @returns {string} 生成弹窗的模版
   */
    complie(options) {
        const btnTpl = this.generateBtns(options.btns);
        const tpl = `<div class="fetch-dialog-wrapper fadeIn">
                          <div class="fetch-dialog ${options.skinClass} ${this.animaArr[this.currAnimation][0]}">
                              <div class="fetch-header">
                                  <div class="fetch-title">${options.title}</div>
                                  <div class="fetch-close-btn">×</div>
                              </div>
                              <div class="fetch-body">
                                  <span class= "${options.cls}"}><i class="fetch-icon fetch-icon-${options.cls}"></i></span>
                                  <div class="fetch-content">
                                    ${options.content}
                                  </div>
                              </div>
                              <div class="fetch-footer">
                                  <div class="fetch-buttons">${btnTpl}</div>
                              </div>
                          </div>
                      </div>`;
        return tpl;
    }

    /**
    * 获取所需的节点信息
    */
    getElement() {
        this.elem = document.querySelector('.fetch-dialog-wrapper');
        this.dialog = document.querySelector('.fetch-dialog');
    }

    /**
   * 显示dialog组件
   * @param options 弹窗的配置信息
   * @returns {*} 当前的dialog节点
   */
    show(options) {
        // 默认参数
        const {
            // title = '',
            // content = '',
            skin = '',
            // cls = '',
            // btns = defaultOptions.btns,
            shadeClose = true,
            animation = 1,
        } = options;

        this.options = Object.assign({}, this.options, options);
        // 皮肤类名
        const skinClass = skin ? ` ${skin}` : '';

        // 给当前动画类型赋值
        this.currAnimation = animation;
        this.shadeClose = shadeClose;
        const config = Object.assign({
            skinClass,
        }, options);

        // 最终生成的HTML
        const html = this.complie(config);

        // 只能添加一个dialog节点到Body
        if (!this.elem) {
            document.body.innerHTML += html;
        }

        // 获取所需要的节点
        this.getElement();

        return this.elem;
    }

    /**
     * 关闭弹窗组件
     */
    hide() {
        // 最外层执行显示动画(固定)
        this.elem.classList.add('fadeOut');
        // 内容层执行关闭动画
        this.dialog.classList.add(`${this.animaArr[this.currAnimation][1]}`);

        // 最终移除
        setTimeout(() => {
            // 移除弹窗组件
            this.elem.remove();
        }, 200);
    }

    /**
   * 显示普通的提示信息
   * @param {Object} options 一系列配置信息
   */
    info(options) {
        this.show(Object.assign({ cls: 'info' }, options));
    }

    /**
    * 显示成功的提示信息
    * @param {Object} options 一系列配置信息
    */
    success(options) {
        this.show(Object.assign({ cls: 'success' }, options));
    }

    /**
    * 显示警告提示信息
    * @param {Object} options 一系列配置信息
    */
    warning(options) {
        this.show(Object.assign({ cls: 'warning' }, options));
    }

    /**
    * 显示错误提示信息
    * @param {Object} options 一系列配置信息
    */
    error(options) {
        this.show(Object.assign({ cls: 'error' }, options));
    }

    /**
    * 绑定事件
    */
    bindEvent() {
        document.body.addEventListener('click', (e) => {
            const target = e.target || e.srcElement;
            // 是否开启点击遮罩关闭
            if (this.shadeClose) {
                if (/dialog-wrapper/.test(target.className)) {
                    this.hide();
                }
            }
            if (/fetch-btn/.test(target.className)) {
                // 按钮回调函数的处理
                this.hide();
                const btnType = target.getAttribute('data-btn-type');
                const btn = this.options.btns[btnType];
                // 处理回调
                btn && btn.handler && btn.handler();
            }
        });
    }
}

const dialog = (function (options) {
    const data = Object.assign({}, defaultOptions, options);
    // 保证当前只有一个弹窗实例
    if (!instance) {
        instance = new M();
    }
    return {
        info(opt) {
            const config = Object.assign({}, data, opt);
            instance.info(config);
        },
        success(opt) {
            const config = Object.assign({}, data, opt);
            instance.success(config);
        },
        error(opt) {
            const config = Object.assign({}, data, opt);
            instance.error(config);
        },
        warning(opt) {
            const config = Object.assign({}, data, opt);
            instance.warning(config);
        },
    };
}());
export default dialog;
