/**
 * @file data单元测试文件
 * @author gaorui@ke.com
 * @date 2019/6/14 16:00
 */

import data from '../../src/util/data';

const {
    formatReturnValue, deepClone, randomNum,
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

describe('randomNum', () => {
    test('给定两个整数 min max，返回 [min, max] 的整数', () => {
        const min = 1;
        const max = 5;
        const num = randomNum(min, max);
        expect(num >= min && num <= max && num%1 == 0).toBeTruthy();
    });

    test('给定两个数 min max，min 为小数，返回 [min, max] 的小数', () => {
        const min = 1.2;
        const max = 5;
        const num = randomNum(min, max);
        expect(num >= min && num <= max && num%1 != 0).toBeTruthy();
    });

    test('给定两个数 min max，max 为小数，返回 [min, max] 的小数', () => {
        const min = 1;
        const max = 5.2;
        const num = randomNum(min, max);
        expect(num >= min && num <= max && num%1 != 0).toBeTruthy();
    });

    test('给定两个整数 min max，floating = true，返回 [min, max] 的小数', () => {
        const min = 1;
        const max = 5;
        const num = randomNum(min, max, true);
        expect(num >= min && num <= max && num%1 != 0).toBeTruthy();
    });

    test('没有传参数时，返回 0 或 1', () => {
        const num = randomNum();
        expect(num == 0 || num == 1).toBeTruthy();
    });

    test('只传一个整数 number 时，返回 [0, number] 的整数', () => {
        const num = randomNum(5);
        expect(num >= 0 && num <= 5 && num%1 == 0).toBeTruthy();
    });

    test('只传一个整数 number ，第二个参数为 true 时，返回 [0, number] 的小数', () => {
        const num = randomNum(5, true);
        expect(num >= 0 && num <= 5 && num%1 != 0).toBeTruthy();
    });

    test('只传一个整数 number ，第二个参数为 false 时，返回 [0, number] 的整数', () => {
        const num = randomNum(5, false);
        expect(num >= 0 && num <= 5 && num%1 == 0).toBeTruthy();
    });

    test('传参数 min max，且 min > max（参数大小错位），返回 [max, min]', () => {
        const min = 5;
        const max = 1;
        const num = randomNum(min, max);
        expect(num >= max && num <= min).toBeTruthy();
    });

    test('强制类型转换，传参数为数字字符串时，强制转换为数字处理', () => {
        const min = '1';
        const max = '5';
        const num = randomNum(min, max);
        expect(num >= Number(min) && num <= Number(max)).toBeTruthy();
    });

    test('强制类型转换，传参数为非数字字符串（不能简单直接转换为数字）时，返回0', () => {
        const min = '1a';
        const max = '5f';
        const num = randomNum(min, max);
        expect(num).toBe(0);
    });
});
/* eslint-enable */
