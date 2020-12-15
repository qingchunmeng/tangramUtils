/* eslint-disable no-useless-concat,sonarjs/no-duplicate-string */

/**
 * @file dom单元测试文件
 * @author wuqingfan001@ke.com
 * @date 2019/6/18 16:00
 */
import dom from '../../src/util/dom';

const {
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
    windowWidth,
    windowHeight,
    addClass,
    removeClass,
    addEventListener,
    contains,
    on,
    off,
    offsetWidth,
    offsetHeight,
    setTitle,
    setAttrs,
    downloadBlob,
    download,
    convertCssom,
    setStyle,
    getCssText,
    getWordWidth,
    copyText,
    classNames,
    suffixClassNames
} = dom;

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
            get() {
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
            get() {
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
            get() {
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
            get() {
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
            get() {
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
            get() {
                return 100;
            }
        });
        expect(windowHeight(el)).toEqual(100);
    });
});

describe('dom', () => {
    // 很多没法测
    test('addEventListener', () => {
        expect(addEventListener({}).remove()).toEqual(undefined);
    });

    test('contains', () => {
        expect(contains()).toEqual(false);
    });

    test('on', () => {
        expect(on()).toEqual(undefined);
    });

    test('off', () => {
        expect(off()).toEqual(undefined);
    });

    test('offsetWidth', () => {
        expect(offsetWidth()).toEqual(undefined);
    });

    test('offsetHeight', () => {
        expect(offsetHeight()).toEqual(undefined);
    });

    test('setTitle', () => {
        expect(setTitle()).toEqual(undefined);
    });

    test('removeClass', () => {
        expect(removeClass()).toEqual(undefined);
    });

    test('addClass', () => {
        expect(addClass()).toEqual(undefined);
    });

    test('removeClass', () => {
        expect(removeClass()).toEqual(undefined);
    });

    test('setAttrs', () => {
        expect(setAttrs()).toEqual(undefined);
    });

    test('downloadBlob', () => {
        expect(downloadBlob(new Blob())).toEqual(undefined);
    });

    test('download', () => {
        expect(download()).toEqual(undefined);
    });

    test('setStyle', () => {
        expect(setStyle()).toEqual(undefined);
    });

    test('getWordWidth', () => {
        expect(getWordWidth()).toEqual(0);
    });

    test('copyText', () => {
        // TypeError: document.execCommand is not a function
        try {
            expect(copyText()).toThrow();
        } catch (e) {}
    });

    test('classNames', () => {
        expect(classNames('')).toEqual('');
        expect(classNames('a', { b: true, c: false })).toEqual('a b');
        expect(classNames(['a', 'b'], { c: true, d: false })).toEqual('a b c');
    });

    test('convertCssom', () => {
        expect(convertCssom({ color: 'red' })).toEqual({ color: 'red' });
    });

    test('getCssText', () => {
        expect(getCssText({})).toBe('');
        expect(getCssText({ color: 'red' })).toBe('color: red;');
        expect(getCssText({ fontSize: 12 })).toBe('font-size: 12px;');
        expect(getCssText({ marginTop: 12 })).toBe('margin-top: 12px;');
        expect(getCssText({ fontSize: 12, marginTop: 12 })).toBe('font-size: 12px; margin-top: 12px;');
    });

    test('suffixClassNames', () => {
        expect(suffixClassNames('abc', { actived: false })).toBe('abc');
        expect(suffixClassNames('abc', { actived: true })).toBe('abc abc-actived');
        expect(suffixClassNames('abc', { actived: true, hover: false })).toBe('abc abc-actived');
        expect(suffixClassNames('abc', { actived: true, hover: true })).toBe('abc abc-actived abc-hover');
        expect(suffixClassNames('abc-de', { actived: true, hover: true }, { separator: '__' })).toBe(
            'abc-de abc-de__actived abc-de__hover'
        );
    });
});
