/**
 * @file fetch请求
 * @author mengqingchun002@ke.com
 * @date 2019/3/7 21:26
 */
// TODO 需要加上github上的polyfill
// TODO 需要处理cors
// TODO 需要处理其他的数据类型
// TODO 需要在前端做一次提交数据的转换
// TODO queryToJson函数封装
// 需要进行测试
import Dialog from '../../dialog/js/index';
// import Loading from './Loading';
class FetchClass {
  constructor (url, opt) {
    this.init(url, opt);
  }

  init (url, opt) {
    // TODO 也有可能是传入了一个对象
    this.url = url;
    this.opt = opt;
    if (Object.prototype.toString.call(url) === '[object Object]') {
      let urlConfig = url.url;
      let options = Object.assign({},url);
      delete (options.url);
      this.url = urlConfig;
      this.opt = options;
    }

    this.defaultConfig = {
      method: 'get',
      credentials: 'include',
      // TODO 考虑是否需要在头部加入cookie 和 Authorization（用来处理身份认证），可以参考zlFetch库，github
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
  }

  checkUrl () {
    if (!this.url) {
      // alert('url不能为空');
      Dialog.error({
        title: '错误',
        content: '请求接口不能为空！',
        btns: {
          confirm: {
            text: '关闭',
            handler: function () {
            }
          }
        }
      });
      return false;
    }
    return true;
  }

  checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  parseJSON(response) {
    return response.json();
  }
  success () {
    // TODO 处理成功的情况

  }
  handleSuccess () {

  }
  handleWarning (options) {
    Dialog.warning({
      title: response.title || '警告',
      content: response.msg || '请重试',
      btns: {
        confirm: {
          text: '关闭',
          handler: function () {
          }
        }
      }
    });
  }
  handleError(response) {
    Dialog.error({
      title: response.title || '错误',
      content: response.msg || '出错啦',
      btns: {
        confirm: {
          text: '关闭',
          handler: function () {
          }
        }
      }
    });
  }
  handleJSONResponse (response) {
    // TODO 处理json数据
    return response.json();
  }

  handleTextResponse (response) {
    // TODO 处理xml数据
    return response.text();
  }

  handleStreamResponse (response) {
    // TODO 处理流式数据
  }

  handleFileResponse (response) {
    return response.blob();
  }

  formatParams () {
    let data = this.opt.data;
    if (data) {
      let paramsArray = [];
      //拼接参数
      Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]));
      if (this.url.search(/\?/) === -1) {
        this.url += '?' + paramsArray.join('&');
      } else {
        this.url += '&' + paramsArray.join('&');
      }
    }
  }

  get () {
    console.log('get method....');
    if (!this.checkUrl()) {
      return new Promise((resolve => {
        resolve();
      }));
    }
    let self = this;
    // TODO 处理提交的数据
    let {data} = this.opt;
    let options = Object.assign({}, this.opt);
    // delete (options.data);
    let config = Object.assign({
      // body: JSON.stringify(data)

    }, this.defaultConfig, options);
    console.log(options);
    self.formatParams();
    return this.request(config);
  }
  post () {
    // TODO 兼容一半的post请求与formData请求

    let self = this;
    let config;
    // TODO 处理提交的数据
    let {data} = this.opt;
    let options = Object.assign({
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }, this.opt);
    delete (options.data);
    if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
      let formData = new FormData();
      for (let key in Object.keys(data)) {
        formData.append(key, data[key]);
      }
      config = Object.assign({
        body: formData
      }, this.defaultConfig, options);
    } else {
      // 默认处理json数据格式的情况
      config = Object.assign({
        body: JSON.stringify(data)
      }, this.defaultConfig, options);
    }

    return this.request(config);
  }
  ajax () {
    // 定制ajax请求，包括跨域，等
    let options = Object.assign({
      method: 'post'
    });
    return this.request(options);
  }
  abort () {

  }
  request (options) {
    if (!this.checkUrl()) {
      return new Promise(resolve => {
        resolve();
      });
    }
    let self = this;
    // TODO 处理提交的数据
    let config = Object.assign({
    }, this.defaultConfig, options);
    // TODO 将get重的函数实体抄写进来
    return new Promise(function (resolve, reject) {

      var prevFetch = window.fetch;
      prevFetch(self.url, config)
          .then(res => {
            console.log(res);
            let contentType = res.headers.get('content-type').toLowerCase();

            let data;
            // = res.json();
            if (res.ok) {
              // TODO 需要将处理成功的所有方法放在一块儿
              // data = self.success(contentType, res);
              // TODO 此处需要区分每一种response.status
              if (contentType.includes('application/json')) {
                // return self.handleJSONResponse(res)
                data = self.handleJSONResponse(res);
              } else if (contentType.includes('text/html')) {
                // return self.handleTextResponse(res);
                data = self.handleTextResponse(res);
              } else if (contentType.includes('application/x-www-form-urlencoded')) {
                data = self.handleJSONResponse(res);
                console.log();
              } else  if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                data = self.handleFileResponse(res);
              }else {
                throw new Error(`Sorry, content-type ${contentType} not supported`);
                // return self.handleStreamResponse(res);
                data = self.handleStreamResponse(res);
                // Handle other responses accordingly...
              }
              resolve(data);
              return data;
            } else {

              console.log(res);
              // TODO 处理网络错误
              // TODO 抛出错误,走默认的错误处理逻辑，如果调用方法传递了errorHandler则走传递的errorHandler

              if (config.errorHandler) {
                // 需要处理this指针的问题
                config.errorHandler.apply(self, res);
              } else {
                return new Promise((resolve, reject) => {
                  // 此处预留调用了系统的错误处理信息，但是还可以添加特殊的错误处理逻辑
                  if (res.status === 401 || res.status === 403 || res.status === 405) {
                    // do something about 401
                    self.handleWarning({
                      title: '警告',
                      msg: '您没有权限执行该操作！',
                    });
                  } else if (res.status === 404) {
                    // do something about 404
                    self.handleError({msg: '系统找不到该请求！'});
                  } else if (res.status === 408) {
                    self.handleWarning({
                      title: '警告',
                      msg: '访问超时，稍后请重试！',
                    });
                  } else if (error.status === 400) {
                    // Bad request
                    self.handleError({msg: '请求发生错误，稍后请重试！'});
                  } else {

                  }
                  // alert('promise 处理错误信息');
                  resolve(res);
                }).catch((error) => {
                  // TODO with 401,404,408
                  console.error(error);
                });
              }

            }

          })
          // 以下部分可以抛出留给用户进行调用，用于特殊的容错处理
          .then((res)=> {
            console.log(res);
            // 此处预留调用了系统的错误处理信息，但是还可以添加特殊的错误处理逻辑
            // TODO 如果请求类型为json，返回的数据为非json，则视为错误
            // TODO 需要处理返回数据为非json的情况
            if (res.code || res.code == 0) {
              if (res.code === 99999) {
                Dialog.warning({
                  title: '警告',
                  content: '您没有权限执行该操作！',
                  btns: {
                    confirm: {
                      text: '关闭',
                      handler: function () {
                      }
                    }
                  }
                });
              } else if (res.code != 1) {
                // TODO 需要兼容调用方法提供的错误处理方法
                self.handleError(res);
              }
            }

            return res;
          })
          // 以下部分可以抛出留给用户进行调用，用于特殊的容错处理
          .catch(e => {
            // 处理错误信息
            console.log(e);
            throw Error(e);
            // Loading.hideLoading(self.opt);
          });
    });

  }

}
const A = (function () {

  return {
    get: function (url, options) {
      return new FetchClass(url, options).get();
    },
    post: function (url, options) {
      return new FetchClass(url, options).post();
    }
  };
})();
export default A;

