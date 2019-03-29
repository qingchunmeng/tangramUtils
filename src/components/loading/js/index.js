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
  constructor (elem, opt) {
      this.init(elem, opt);
  }
  init (elem, opt) {
      // TODO 需要处理没有传入elem的情况
      // TODO 检查elem元素，看该元素上是否已经有loading组件，如果有，不再创建，如果没有则重新创建
      if (typeof elem != 'string') {
        opt = elem;
        this.elem = document.body;
      } else {
        // TODO 需要兼容class 一般的选择器
        this.elem = document.getElementById(elem);
        this.elem = this.elem ? this.elem : document.querySelector(elem) ? document.querySelector(elem): document.getElementsByName(elem);
      }
  
      this.options = Object.assign({}, defaultOptions, opt); //配置参数
      this.spinContainer = this.complie();  
  }
  complie () {

    if (this.elem.className.includes('fetch-spin-loading')) {
      return ;
    }
    this.elem.classList.add('ant-spin-nested-loading');
    this.elem.classList.add('fetch-spin-loading');
    let docContainer = document.createElement('div');
    let defaultText = this.options.text;
    let _innerHTML = `<div class="ant-spin ant-spin-show-text ant-spin-spinning">
                          <span class="ant-spin-dot ant-spin-dot-spin">
                              <i></i>
                              <i></i>
                              <i></i>
                              <i></i>
                          </span>
                          <div class="ant-spin-text">${defaultText}</div>
                      </div>`;
    docContainer.innerHTML = _innerHTML;
    this.elem.appendChild(docContainer);

    return docContainer;

  }
  show (elem, opt) {
    this.spinContainer.style.display = 'block';
  }
  close () {
    this.spinContainer.remove();
    this.elem.classList.remove('ant-spin-nested-loading');
    this.elem.classList.remove('fetch-spin-loading');
    // this.spinContainer.style.display = 'none';
  }
}

let loading = (function () {
  // 保证当前elem只有一个loading实例

  let instance = new M();

  return {
    showLoading: function (elem, opt) {
      instance.show(elem, opt);
    },
    hideLoading: function () {
      instance.close();
    }
  };
  
})();
export default loading;

