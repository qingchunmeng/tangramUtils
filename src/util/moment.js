/**
 * @file 获取阶段时间处理相关Util
 * @author gaorui@ke.com
 * @date 2019/4/26 16:33
 */

import moment from 'moment';

const Times = {
    getToday: () => moment().format('YYYY-MM-DD'),
    getYesterday: () => {
        const _today = moment();
        const yesterday = _today.subtract(1, 'days').format('YYYY-MM-DD');
        return yesterday;
    },
    getLastWeekDays: () => {
        const date = [];
        const weekOfday = parseInt(moment().format('d')); // 计算今天是这周第几天  周日为一周中的第一天
        const start = moment().subtract(weekOfday + 6, 'days').format('YYYY-MM-DD'); // 周一日期
        const end = moment().subtract(weekOfday + 0, 'days').format('YYYY-MM-DD'); // 周日日期
        date.push(start);
        date.push(end);
        return date;
    },
    getCurrWeekDays: () => {
        const date = [];
        const weekOfday = parseInt(moment().format('d')); // 计算今天是这周第几天 周日为一周中的第一天
        const start = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD'); // 周一日期
        const end = moment().add(7 - weekOfday - 1, 'days').format('YYYY-MM-DD'); // 周日日期
        date.push(start);
        date.push(end);
        return date;
    },
    getLastMonthDays: () => {
        const date = [];
        const start = `${moment().subtract('month', 1).format('YYYY-MM')}-01`;
        const end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD');
        date.push(start);
        date.push(end);
        return date;
    },
    getCurrMonthDays: () => {
        const date = [];
        const start = `${moment().add('month', 0).format('YYYY-MM')}-01`;
        const end = moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD');
        date.push(start);
        date.push(end);
        return date;
    },
    getLast7Days: () => {
        const date = [];
        date.push(moment().subtract('days', 7).format('YYYY-MM-DD'));
        date.push(moment().subtract('days', 1).format('YYYY-MM-DD'));
        return date;
    },
    getLast30Days: () => {
        const date = [];
        date.push(moment().subtract('days', 30).format('YYYY-MM-DD'));
        date.push(moment().subtract('days', 1).format('YYYY-MM-DD'));
        return date;
    },
};

export default Times;
