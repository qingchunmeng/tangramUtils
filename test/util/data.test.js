/**
 * @file data单元测试文件
 * @author gaorui@ke.com
 * @date 2019/6/14 16:00
 */

import data from '../../src/util/data';

const {
    formatReturnValue, deepClone,
} = data;

/* eslint-disable */
describe('formatReturnValue', () => {
    test('格式化返回值', () => {
        expect(formatReturnValue('', "显示文案")).toEqual('');
        expect(formatReturnValue('姓名', "显示文案")).toEqual("显示文案");
        expect(formatReturnValue([], "显示文案")).toEqual('');
        expect(formatReturnValue([1,2], "显示文案")).toEqual("显示文案");
        expect(formatReturnValue({a:1}, "显示文案")).toEqual("显示文案");
        expect(formatReturnValue({}, "显示文案")).toEqual("");
        expect(formatReturnValue(1, "显示文案")).toEqual("显示文案");
        expect(formatReturnValue(0, "显示文案")).toEqual("显示文案");
        expect(formatReturnValue(true, "显示文案")).toEqual("显示文案");
        expect(formatReturnValue(false, "显示文案")).toEqual("");
        expect(formatReturnValue(null, "显示文案")).toEqual("");
        expect(formatReturnValue(undefined, "显示文案")).toEqual("");
    });
});

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
        describe(`${key} 深拷贝`, () => {
            const orginalData = objects[key];
            const result = deepClone(orginalData);
            test('拷贝结果与源对象不相等', () => {
                expect(result).not.toBe(orginalData);
            });
            test('遍历比较各项字段值是否相等', () => {
                expect(result).toEqual(orginalData);
            });
        });
    });
});
/* eslint-enable */
