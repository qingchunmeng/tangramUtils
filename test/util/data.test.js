/**
 * @file data单元测试文件
 * @author gaorui@ke.com
 * @date 2019/6/14 16:00
 */

import data from '../../src/util/data';

const {
    formatReturnValue,
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
