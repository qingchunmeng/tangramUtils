import { plus, minus, mul, div } from '../../src/util/decimal';

describe('decimal', () => {
    test('plus', () => {
        expect(plus(0.1, 0.2)).toBe(0.3);
        expect(plus(0.1, 0.2)).not.toBe(0.1 + 0.2);
    });

    test('minus', () => {
        expect(minus(1.5, 1.2)).toBe(0.3);
        expect(minus(1.5, 1.2)).not.toBe(1.5 - 1.2);
    });

    test('mul', () => {
        expect(mul(19.9, 100)).toBe(1990);
        expect(mul(19.9, 100)).not.toBe(19.9 * 100);
    });

    test('div', () => {
        expect(div(0.3, 0.1)).toBe(3);
        expect(div(0.3, 0.1)).not.toBe(2.9999999999999996);
    });
});
