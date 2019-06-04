/**
 * @file fetch请求
 * @author mengqingchun002@ke.com
 * @date 2019/3/7 21:26
 */
// TODO 需要加上github上的polyfill
// TODO 需要处理cors
// TODO 需要处理其他的数据类型
// TODO 需要在前端做一次提交数据的转换
// 需要进行测试
import Dialog from '../../dialog/js/index';
import Loading from '../../loading/js/index';

class FetchClass {
    constructor(url, opt) {
        this.init(url, opt);
    }

    init(url, opt) {
    // TODO 也有可能是传入了一个对象
        this.url = url;
        this.opt = opt;
        if (Object.prototype.toString.call(url) === '[object Object]') {
            const urlConfig = url.url;
            const options = Object.assign({}, url);
            delete (options.url);
            this.url = urlConfig;
            this.opt = options;
        }

        this.defaultConfig = {
            code: 1,
            method: 'get',
            isShowLoading: true,
            credentials: 'include',
            // TODO 考虑是否需要在头部加入cookie 和 Authorization（用来处理身份认证），可以参考zlFetch库，github
            headers: {
                Accept: 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        };
    }

    checkUrl() {
        if (!this.url) {
            // alert('url不能为空');
            Dialog.error({
                title: '错误',
                content: '请求接口不能为空！',
                btns: {
                    confirm: {
                        text: '关闭',
                        handler() {
                        },
                    },
                },
            });
            return false;
        }
        return true;
    }

    checkStatus(response) {
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

    success() {
    // TODO 处理成功的情况

    }

    handleSuccess() {

    }

    handleWarning(options) {
        Dialog.warning({
            title: options.title || '警告',
            content: options.msg || '请重试',
            btns: {
                confirm: {
                    text: '关闭',
                    handler() {
                    },
                },
            },
        });
    }

    handleError(response) {
        Dialog.error({
            title: response.title || '错误',
            content: response.msg || '出错啦',
            btns: {
                confirm: {
                    text: '关闭',
                    handler() {
                    },
                },
            },
        });
    }

    handleJSONResponse(response) {
    // TODO 处理json数据
        return response.json();
    }

    handleTextResponse(response) {
    // TODO 处理xml数据
        return response.text();
    }

    handleStreamResponse(response) {
    // TODO 处理流式数据
        return response;
    }

    handleFileResponse(response) {
        return response.blob();
    }

    formatParams() {
        const { data } = this.opt;
        if (data) {
            const paramsArray = [];
            const keys = Object.keys(data);
            // 拼接参数,当data为空对象时不进行字符串拼接
            /* eslint-disable */
            keys.length > 0 && keys.forEach(key => paramsArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`));
            if (this.url.search(/\?/) === -1) {
                this.url += `?${paramsArray.join('&')}`;
            } else {
                this.url += `&${paramsArray.join('&')}`;
            }
            if (Object.keys(data).length === 0) {
              this.url = this.url.slice(0, -1);
            }
        }
    }

    get() {
        if (!this.checkUrl()) {
            return new Promise(((resolve) => {
                resolve();
            }));
        }
        const self = this;
        // TODO 处理提交的数据
        // const { data } = this.opt;
        const options = Object.assign({}, this.opt);
        // delete (options.data);
        const config = Object.assign({
            // body: JSON.stringify(data)

        }, this.defaultConfig, options);
        self.formatParams();
        return this.request(config);
    }

    post() {
    // TODO 兼容一半的post请求与formData请求

        // const self = this;
        let config;
        // TODO 处理提交的数据
        const { data } = this.opt;
        const options = Object.assign({
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        }, this.opt);
        delete (options.data);
        if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
            const formData = new FormData();
            // for (let key in Object.keys(data)) {
            //     formData.append(key, data[key]);
            // }
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            config = Object.assign({
                body: formData,
            }, this.defaultConfig, options);
        } else {
            // 默认处理json数据格式的情况
            config = Object.assign({
                body: JSON.stringify(data),
            }, this.defaultConfig, options);
        }

        return this.request(config);
    }

    ajax() {
    // 定制ajax请求，包括跨域，等
        const options = Object.assign({
            method: 'post',
        });
        return this.request(options);
    }

    abort() {

    }

    request(options) {
        if (!this.checkUrl()) {
            return new Promise((resolve) => {
                resolve();
            });
        }
        const self = this;
        // TODO 处理提交的数据
        const config = Object.assign({
        }, this.defaultConfig, options);
        // TODO 将get重的函数实体抄写进来
        // TODO 判断是否已经有一个loading了，如果是，则不再创建新的loading，此部分需要
        if (config.isShowLoading) {
            Loading.showLoading();
        }

        // TODO 什么时候将loading进行关闭呢，如果已经关闭了该怎么处理呢 ，各种各样的关闭loading的情况
        return new Promise(((resolve) => {
            const prevFetch = window.fetch;
            prevFetch(self.url, config)
                .then((res) => {
                    Loading.hideLoading();
                    const contentType = res.headers.get('content-type').toLowerCase();

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
                        } else if (
                            contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        ) {
                            data = self.handleFileResponse(res);
                        } else {
                            // return self.handleStreamResponse(res);
                            // Handle other responses accordingly...
                            data = self.handleStreamResponse(res);
                            throw new Error(`Sorry, content-type ${contentType} not supported`);
                        }
                        resolve(data);
                        return data;
                    }
                    // TODO 处理网络错误
                    // TODO 抛出错误,走默认的错误处理逻辑，如果调用方法传递了errorHandler则走传递的errorHandler

                    if (config.errorHandler) {
                        // 需要处理this指针的问题
                        config.errorHandler.call(self, res, reject);
                    } else {
                        return new Promise((resolve2) => {
                            reject(res);
                            // 此处预留调用了系统的错误处理信息，但是还可以添加特殊的错误处理逻辑
                            if (res.status === 401 || res.status === 403 || res.status === 405) {
                                // do something about 401
                                self.handleWarning({
                                    title: '警告',
                                    msg: '您没有权限执行该操作！',
                                });
                            } else if (res.status === 404) {
                                // do something about 404
                                self.handleError({ msg: '系统找不到该请求！' });
                            } else if (res.status === 408) {
                                self.handleWarning({
                                    title: '警告',
                                    msg: '访问超时，稍后请重试！',
                                });
                            } else if (res.status === 400) {
                                // Bad request
                                self.handleError({ msg: '请求发生错误，稍后请重试！' });
                            } else {
                                self.handleError({ msg: '请求发生异常，稍后请重试！' });
                            }
                            // alert('promise 处理错误信息');
                            resolve2(res);
                        }).catch((error) => {
                            // TODO with 401,404,408
                            console.error(error);
                        });
                    }

                    return res;
                })
            // 以下部分可以抛出留给用户进行调用，用于特殊的容错处理
                .catch((e) => {
                    // 处理错误信息
                    // TODO 如果已经把loading关掉了该怎么办？
                    Loading.hideLoading();
                    throw Error(e);
                    // Loading.hideLoading(self.opt);
                });
        }));
    }
}
const A = (function () {
    return {
        get(url, options) {
            return new FetchClass(url, options).get();
        },
        post(url, options) {
            return new FetchClass(url, options).post();
        },
    };
}());
export default A;
