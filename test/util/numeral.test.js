import { thousands } from '../../src/util/numeral';

describe('numeral', () => {
    test('thousands', () => {
        expect(thousands()).toBe(undefined);
        expect(thousands(null)).toBe(null);
        expect(thousands(1)).toBe('1');
        expect(thousands(12)).toBe('12');
        expect(thousands(123)).toBe('123');
        expect(thousands(1234)).toBe('1,234');
        expect(thousands(12345)).toBe('12,345');
        expect(thousands(123456)).toBe('123,456');
        expect(thousands(1234567)).toBe('1,234,567');
        expect(thousands(1.1)).toBe('1.1');
        expect(thousands(1.12)).toBe('1.12');
        expect(thousands(1.123)).toBe('1.123');
        expect(thousands(1.1234)).toBe('1.1234');
        expect(thousands(-1.1234)).toBe('-1.1234');
        expect(thousands(-1234.1234)).toBe('-1,234.1234');
    });
});
