import moment from 'moment';
import { formatTime, formatDate } from '../../src/util/time';

describe('time', () => {
    test('formatTime', () => {
        expect(formatTime(Date.now(), 'yyyy')).toBe(moment().format('YYYY'));
        expect(formatTime(Date.now(), 'YYYY')).toBe(moment().format('YYYY'));
        expect(formatTime(Date.now(), 'a')).toBe(moment().format('a'));
        expect(formatTime(Date.now(), 'A')).toBe(moment().format('A'));
        expect(formatTime(Date.now(), 'Aa')).toBe(moment().format('Aa'));
    });

    test('formatDate', () => {
        expect(formatDate(Date.now(), 'yyyy')).toBe(moment().format('YYYY'));
        expect(formatDate(Date.now(), 'YYYY')).toBe(moment().format('YYYY'));
    });
});
