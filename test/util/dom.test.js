/**
 * @file dom单元测试文件
 * @author wuqingfan001@ke.com
 * @date 2019/6/18 16:00
 */
import dom from '../../src/util/dom';

const { scrollWidth, scrollHeight, clientWidth, clientHeight, windowWidth, windowHeight } = dom;

/* eslint-disable */
describe('scrollWidth', () => {
    test('返回document-scrollWidth-value', () => {
        expect(scrollWidth(document)).toEqual(0);
    });
    test('无参数返回false', () => {
        expect(scrollWidth()).toEqual(false);
    });
    test('普通dom元素document-scrollWidth-value', () => {
        document.body.innerHTML =
            '<div id="main" style="width:100px;overflow: auto;">' + '  <div style="width: 200px;"></div>' + '</div>';
        const el = document.getElementById('main');

        // jest是基于jsdom实现的，jsdom不是真正的浏览器环境，
        // 一些浏览器渲染后属性值的计算不好实现如：clientWidth默认是0
        Object.defineProperty(el, 'scrollWidth', {
            get: function () {
                return 100;
            }
        });
        expect(scrollWidth(el)).toEqual(100);
    });
});

describe('scrollHeight', () => {
    test('返回document-scrollHeight-value', () => {
        expect(scrollHeight(document)).toEqual(0);
    });
    test('无参数返回false', () => {
        expect(scrollHeight()).toEqual(false);
    });
    test('普通dom元素document-scrollHeight-value', () => {
        document.body.innerHTML =
            '<div id="main" style="height:100px;overflow: auto;">' + '  <div style="hegiht: 200px;"></div>' + '</div>';
        const el = document.getElementById('main');

        // jest是基于jsdom实现的，jsdom不是真正的浏览器环境，
        // 一些浏览器渲染后属性值的计算不好实现如：clientWidth默认是0
        Object.defineProperty(el, 'scrollHeight', {
            get: function () {
                return 100;
            }
        });
        expect(scrollHeight(el)).toEqual(100);
    });
});

describe('clientWidth', () => {
    test('返回document-clientWidth-value', () => {
        expect(clientWidth(document)).toEqual(0);
    });
    test('无参数返回false', () => {
        expect(clientWidth()).toEqual(false);
    });
    test('普通dom元素document-clientWidth-value', () => {
        document.body.innerHTML = '<div id="main" style="width:100px;overflow: auto;">' + '</div>';
        const el = document.getElementById('main');

        // jest是基于jsdom实现的，jsdom不是真正的浏览器环境，
        // 一些浏览器渲染后属性值的计算不好实现如：clientWidth默认是0
        Object.defineProperty(el, 'clientWidth', {
            get: function () {
                return 100;
            }
        });
        expect(clientWidth(el)).toEqual(100);
    });
});

describe('clientHeight', () => {
    test('返回document-clientHeight-value', () => {
        expect(clientHeight(document)).toEqual(0);
    });
    test('无参数返回false', () => {
        expect(clientHeight()).toEqual(false);
    });
    test('普通dom元素document-clientHeight-value', () => {
        document.body.innerHTML = '<div id="main" style="height:100px;overflow: auto;">' + '</div>';
        const el = document.getElementById('main');

        // jest是基于jsdom实现的，jsdom不是真正的浏览器环境，
        // 一些浏览器渲染后属性值的计算不好实现如：clientHeight默认是0
        Object.defineProperty(el, 'clientHeight', {
            get: function () {
                return 100;
            }
        });
        expect(clientHeight(el)).toEqual(100);
    });
});

describe('windowWidth', () => {
    test('返回window-windowWidth-value', () => {
        expect(windowWidth(window)).toEqual(0);
    });
    test('无参数默认传递window对象', () => {
        expect(windowWidth()).toEqual(0);
    });
    test('如果传递dom元素返回document-clientWidth-value', () => {
        document.body.innerHTML = '<div id="main" style="width:100px;overflow: auto;">' + '</div>';
        const el = document.getElementById('main');

        // jest是基于jsdom实现的，jsdom不是真正的浏览器环境，
        // 一些浏览器渲染后属性值的计算不好实现如：windowWidth默认是0
        Object.defineProperty(el, 'clientWidth', {
            get: function () {
                return 100;
            }
        });
        expect(windowWidth(el)).toEqual(100);
    });
});

describe('windowHeight', () => {
    test('返回window-windowHeight-value', () => {
        expect(windowHeight(window)).toEqual(0);
    });
    test('无参数默认传递window对象', () => {
        expect(windowHeight()).toEqual(0);
    });
    test('如果传递dom元素返回document-clientWidth-value', () => {
        document.body.innerHTML = '<div id="main" style="width:100px;overflow: auto;">' + '</div>';
        const el = document.getElementById('main');

        // jest是基于jsdom实现的，jsdom不是真正的浏览器环境，
        // 一些浏览器渲染后属性值的计算不好实现如：windowHeight默认是0
        Object.defineProperty(el, 'clientHeight', {
            get: function () {
                return 100;
            }
        });
        expect(windowHeight(el)).toEqual(100);
    });
});
/* eslint-enable */
