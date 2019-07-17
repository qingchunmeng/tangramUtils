/**
 * @file debounce 单元测试文件
 * @author zhangwenjie009@ke.com
 * @date 2019/6/27 08:00
 */

import debounce from '../../src/util/debounce';

describe('debounce', () => {
    test('默认配置', () => {
        let count = 1;
        const add = () => count += 1;
        const debouncedAdd = debounce(add, {});
        debouncedAdd();
        debouncedAdd();
        expect(2).toEqual(count);
    });
    test('{ isFront: false }', async () => {
        let count = 1;
        const add = n => count += n;
        const debouncedAdd = debounce(add, { isFront: false });
        debouncedAdd(2);
        debouncedAdd(5);
        await new Promise((resolve) => {
            setTimeout(() => {
                debouncedAdd(10); // 将再过 100ms 后，执行 debouncedAdd(10)
                expect(count).toEqual(3); // 100ms 后 debouncedAdd(2) 执行成功
                resolve();
            }, 110);
        });
        await new Promise((resolve) => {
            setTimeout(() => {
                expect(count).toEqual(13); // 200ms 后 debouncedAdd(10) 执行成功
                resolve();
            }, 110);
        });
    });
    test('{ isReset: true, timeGap: 1000, isFront: false }', async () => {
        let count = 1;
        const add = n => count += n;
        const debouncedAdd = debounce(add, { isReset: true, timeGap: 1000, isFront: false });
        debouncedAdd(2);
        debouncedAdd(4);
        await new Promise((resolve) => {
            setTimeout(() => {
                debouncedAdd(8);
                resolve();
            }, 100);
        });
        debouncedAdd(16);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1001);
        });
        expect(count).toEqual(17); // 时间间隔大于 1001ms，上一次执行 debouncedAdd(16) 执行成功
    });
    test('{ isReset: true, timeGap: 1000 }', async () => {
        let count = 1;
        const add = n => count += n;
        const debouncedAdd = debounce(add, { isReset: true, timeGap: 1000 });
        debouncedAdd(2); // 第一次执行成功
        debouncedAdd(4);
        await new Promise((resolve) => {
            setTimeout(() => {
                debouncedAdd(8);
                resolve();
            }, 100);
        });
        await new Promise((resolve) => { // 时间间隔大于 1000 执行成功
            setTimeout(() => {
                debouncedAdd(16);
                resolve();
            }, 1001);
        });
        expect(count).toEqual(19);
    });
    test('{ isPromise: true }', async () => {
        let count = 1;
        const add = n => new Promise((resolve) => { // 模拟异步请求
            setTimeout(() => {
                count += n;
                resolve();
            }, 1000);
        });
        const debouncedAdd = debounce(add, { isPromise: true });
        debouncedAdd(2); // 发起异步请求
        debouncedAdd(4); // 异步请求执行中，该调用不会执行
        expect(count).toEqual(1);
        await new Promise((resolve) => {
            setTimeout(() => {
                expect(count).toEqual(3); // 异步请求执行完成，debouncedAdd(2) 执行成功
                resolve();
            }, 1010);
        });
    });
    test('{ isPromise: true } 但函数未返回 promise', async () => {
        let count = 1;
        const add = n => count += n;
        const debouncedAdd = debounce(add, { isPromise: true });
        debouncedAdd(2); // 执行成功
        debouncedAdd(4); // 执行成功
        expect(count).toEqual(7);
    });
    test('第一个参数不是函数会报错', () => {
        const add = 'abc';
        try {
            debounce(add, {});
        } catch (error) {
            expect(error.message).toEqual('The debounce\'s first argument is not a function!');
        }
    });
});
