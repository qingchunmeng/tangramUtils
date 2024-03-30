/**
 * @file data单元测试文件
 */

import data from '../../src/util/data';

const { formatReturnValue, deepClone, randomNum, shouldFieldDisplay } = data;

describe('formatReturnValue', () => {
    test('格式化返回值', () => {
        expect(formatReturnValue('', '显示文案')).toEqual('');
        expect(formatReturnValue('姓名', '显示文案')).toEqual('显示文案');
        expect(formatReturnValue([], '显示文案')).toEqual('');
        expect(formatReturnValue([1, 2], '显示文案')).toEqual('显示文案');
        expect(formatReturnValue({ a: 1 }, '显示文案')).toEqual('显示文案');
        expect(formatReturnValue({}, '显示文案')).toEqual('');
        expect(formatReturnValue(1, '显示文案')).toEqual('显示文案');
        expect(formatReturnValue(0, '显示文案')).toEqual('显示文案');
        expect(formatReturnValue(true, '显示文案')).toEqual('显示文案');
        expect(formatReturnValue(false, '显示文案')).toEqual('');
        expect(formatReturnValue(null, '显示文案')).toEqual('');
        expect(formatReturnValue(undefined, '显示文案')).toEqual('');
    });
});

describe('deepClone', () => {
    function Foo() {
        this.a = 1;
    }
    Foo.prototype.b = 1;
    Foo.c = function () {};

    const objects = {
        arrays: ['a', ''],
        'array-like objects': { 0: 'a', length: 1 },
        'Foo instances': new Foo(),
        objects: { a: 0, b: 1, c: 2 },
        'objects with object values': { a: 'a', b: ['B'], c: { C: 1 }, d: { e: ['F'] } },
        null: null,
        undefined,
        'objects with null': { a: '123', b: { c: null } },
        'objects with undefined': { a: '123', b: { c: undefined } }
    };

    const keys = Object.keys(objects);

    keys.forEach(key => {
        describe(`${key} 深拷贝`, () => {
            const orginalData = objects[key];
            const result = deepClone(orginalData);
            if (result !== null || result !== undefined) {
                return;
            }
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
        expect(num >= min && num <= max && num % 1 == 0).toBeTruthy();
    });

    test('给定两个数 min max，min 为小数，返回 [min, max] 的小数', () => {
        const min = 1.2;
        const max = 5;
        const num = randomNum(min, max);
        expect(num >= min && num <= max && num % 1 != 0).toBeTruthy();
    });

    test('给定两个数 min max，max 为小数，返回 [min, max] 的小数', () => {
        const min = 1;
        const max = 5.2;
        const num = randomNum(min, max);
        expect(num >= min && num <= max && num % 1 != 0).toBeTruthy();
    });

    test('给定两个整数 min max，floating = true，返回 [min, max] 的小数', () => {
        const min = 1;
        const max = 5;
        const num = randomNum(min, max, true);
        expect(num >= min && num <= max && num % 1 != 0).toBeTruthy();
    });

    test('没有传参数时，返回 0 或 1', () => {
        const num = randomNum();
        expect(num == 0 || num == 1).toBeTruthy();
    });

    test('只传一个整数 number 时，返回 [0, number] 的整数', () => {
        const num = randomNum(5);
        expect(num >= 0 && num <= 5 && num % 1 == 0).toBeTruthy();
    });

    test('只传一个整数 number ，第二个参数为 true 时，返回 [0, number] 的小数', () => {
        const num = randomNum(5, true);
        expect(num >= 0 && num <= 5 && num % 1 != 0).toBeTruthy();
    });

    test('只传一个整数 number ，第二个参数为 false 时，返回 [0, number] 的整数', () => {
        const num = randomNum(5, false);
        expect(num >= 0 && num <= 5 && num % 1 == 0).toBeTruthy();
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

describe('shouldFieldDisplay', () => {
    // 后端给的页面配置
    // eslint-disable-next-line no-unused-vars
    const fields = [
        {
            dataDict: '',
            dataType: 'string',
            defaultValue: '',
            desc: '姓名',
            displayCondition: '',
            id: 241,
            inputType: 'input',
            name: 'BUYER_XING_MING',
            required: true,
            unit: '',
            validator: '',
            value: '张三',
            variableOrder: 1
        },
        {
            dataDict: 'ZHENG_JIAN_LEI_XING',
            dataType: 'string',
            defaultValue: '1',
            desc: '证件类型',
            displayCondition: '',
            id: 242,
            inputType: 'select',
            name: 'BUYER_ZHENG_JIAN_LEI_XING',
            required: true,
            unit: '',
            validator: '',
            value: '1',
            variableOrder: 2
        },
        {
            dataDict: '',
            dataType: 'string',
            defaultValue: '',
            desc: '证件号码',
            displayCondition: 'BUYER_ZHENG_JIAN_LEI_XING==2',
            id: 244,
            inputType: 'input',
            name: 'BUYER_ZHENG_JIAN_HAO_MA',
            required: true,
            unit: '',
            validator: '',
            value: '11111',
            variableOrder: 3
        },
        {
            dataDict: '',
            dataType: 'string',
            defaultValue: '',
            desc: '联系方式',
            displayCondition: '',
            id: 245,
            inputType: 'input',
            name: 'BUYER_LIAN_XI_DIAN_HUA',
            required: true,
            unit: '',
            validator: '',
            value: '13500000004',
            variableOrder: 4
        },
        {
            dataDict: '',
            dataType: 'string',
            defaultValue: '',
            desc: '入金银行卡号',
            displayCondition: 'BUYER_BANK_CARD_TYPE==1',
            id: 243,
            inputType: 'input',
            name: 'BUYER_BANK_CARD',
            required: true,
            unit: '',
            validator: '',
            value: '1',
            variableOrder: 5
        },
        {
            dataDict: 'BANK_CARD_TYPE',
            dataType: 'string',
            defaultValue: '1',
            desc: '银行卡类型',
            displayCondition: '',
            id: 258,
            inputType: 'select',
            name: 'BUYER_BANK_CARD_TYPE',
            required: true,
            unit: '',
            validator: '',
            value: '1',
            variableOrder: 6
        }
    ];
    const fieldsValue = {
        BUYER_XING_MING: '张三',
        ZHENG_JIAN_LEI_XING: 1,
        BUYER_ZHENG_JIAN_HAO_MA: '110120',
        BUYER_BANK_CARD: '6228480482178345120',
        BUYER_BANK_CARD_TYPE: 1,
        BUYER_LIAN_XI_DIAN_HUA: '18583768189'
    };
    test('单一条件测试', () => {
        // 当证件类型不为2时，返回false
        expect(shouldFieldDisplay(fieldsValue, 'ZHENG_JIAN_LEI_XING==2')).toBeFalsy();

        // 展示银行卡类型为1时，返回true
        expect(shouldFieldDisplay(fieldsValue, 'BUYER_BANK_CARD_TYPE==1')).toBeTruthy();
    });
    test('复合条件测试', () => {
        // 当证件类型为1，姓名为张三时，返回tue
        expect(shouldFieldDisplay(fieldsValue, 'ZHENG_JIAN_LEI_XING==1&&BUYER_XING_MING==张三')).toBeTruthy();

        // 当证件类型为2，姓名为张三时，返回false
        expect(shouldFieldDisplay(fieldsValue, 'ZHENG_JIAN_LEI_XING==2&&BUYER_XING_MING==张三')).toBeFalsy();
    });

    test('没有条件时，默认返回true', () => {
        // 当displayCondition为''时，返回tue
        expect(shouldFieldDisplay(fieldsValue, '')).toBeTruthy();
    });
});
/* eslint-enable */
