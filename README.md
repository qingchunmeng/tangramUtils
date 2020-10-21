### 交易前端集成解决方案

代码地址：

    http://git.lianjia.com/transaction/Tangram

方案包括以下几个部分：

    1.fetch
    2.dialog
    3.loading
    ……


    其中的样式部分采用less进行编写，使用的是less-loader

代码组织结构：

    --src   代码
      --components               各个功能点
           --dialog              弹窗部分
                --css            弹窗的样式文件夹
                    --index.less 弹窗的样式
                --images         图片静态资源文件夹
                --js             弹窗的js代码文件夹
                    --index.js   弹窗的业务逻辑代码
           --fetch               fetch请求部分
                --js             fetch的js代码文件夹
                    --index.js   fetch的业务逻辑代码
           ……
           ……
           ……
      --index.js  集成解决方案的入口文件

关于新增功能点代码结构组织的说明

    1.首先创建一个代码该功能的文件夹，eg.demo
    2.在该文件（demo）下创建js,css,images文件夹,如果没有相关类型资源，可以不创建该类型的文件夹
    3.js代码需要放在js文件夹下，less代码需要放在css文件夹下，图片资源需要放在images文件夹下

安装方法

    npm install @jiaoyi/tangram

各功能点的使用方法

1、fetch

        import { Fetch } from '@jiaoyi/tangram';

        // get请求

            Fetch.get({
              url: '/test/list',   //请求的地址
              data: {              //请求的参数
                appId: 111
              }
            }).then(function (res) {
                    console.log('请求完成后想进行的其他的操作');
            });


        //post请求

            Fetch.post({
                  url: '/test/list',
                  data: {
                    appId: 111,
                  }
                }).then(function (res) {
                        console.log('请求完成后想进行的其他的操作');
                });


        // 提交表单


            Fetch.post({
                  url: '/test/save',
                  data: {
                       id: 111,
                       name: '张三'
                  },
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                  }
                }).then(function (res) {
                        console.log('请求完成后想进行的其他的操作');
                });

2、 dialog 的使用

    import { Dialog } from '@jiaoyi/tangram';

    1.报错
    Dialog.error({
       title: '错误',                 //错误弹窗的标题
       content: '请求接口不能为空！',    // 错误的提示信息
       btns: {                       // 弹窗中展示按钮，默认不配置会展示取消和确定两个按钮
         confirm: {
           text: '关闭',
           handler: function () {    // 回调想做的一些事情
           }
         }
       }
     });


    2.普通的提示信息
    Dialog.info({
        title: '错误',                 //提示弹窗的标题
        content: '请求接口不能为空！',    // 提示信息
        btns: {                       // 弹窗中展示按钮，默认不配置会展示取消和确定两个按钮
          confirm: {
            text: '关闭',
            handler: function () {    // 回调想做的一些事情
            }
          }
        }
      });


    3.成功提示的弹窗
    Dialog.success({
       title: '错误',                 //成功弹窗的标题
       content: '请求接口不能为空！',    // 提示信息
       btns: {                       // 弹窗中展示按钮，默认不配置会展示取消和确定两个按钮
         confirm: {
           text: '关闭',
           handler: function () {    // 回调想做的一些事情
           }
         }
       }
     });


    4. 警告类型的提示信息
    Dialog.warning({
       title: '错误',                 //警告弹窗的标题
       content: '请求接口不能为空！',    // 警告的提示信息
       btns: {                       // 弹窗中展示按钮，默认不配置会展示取消和确定两个按钮
         confirm: {
           text: '关闭',
           handler: function () {    // 回调想做的一些事情
           }
         }
       }
     });

注意： 目前集成解决方案中的内容并没有 publish，引入的都是原始的组件库代码。因此需要在业务方的项目中对 webpack 做如下的配置：

```js
{
   test: /\.less$/,
   include: path.join(__dirname, '/node_modules/@jiaoyi'),
   use: [{
     loader: 'style-loader', // creates style nodes from JS strings
   }, {
     loader: 'css-loader', // translates CSS into CommonJS
   }, {
     loader: 'less-loader', // compiles Less to CSS
     options: {
       javascriptEnabled: true,
     },
   }],
},
```

###  更新日志

  0.3.13-beta.02 Util新增日志上报函数logError

