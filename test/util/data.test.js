/**
 * @file data单元测试文件
 * @author lijinpeng007@ke.com
 * @date 2019/6/11 21:02
 */

import data from '../../src/util/data';

const {
    deepClone,
} = data;

/* eslint-disable */
describe('deepClone', () => {
    function Foo() {
        this.a = 1;
    }
    Foo.prototype.b = 1;
    Foo.c = function () {};

    const objects = {
        'arrays': ['a', ''],
        'array-like objects': { '0': 'a', 'length': 1 },
        'Foo instances': new Foo(),
        'objects': { 'a': 0, 'b': 1, 'c': 2 },
        'objects with object values': { 'a': 'a', 'b': ['B'], 'c': { 'C': 1 }, 'd': {'e': ['F'] }},
    };

    const keys = Object.keys(objects);

    keys.forEach((key) => {
        test(`${key} 深拷贝`, () => {
            expect(deepClone(objects[key])).toEqual(objects[key]);
        });
    });
});
/* eslint-enable */
