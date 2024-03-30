/**
 * @file 获取阶段时间处理相关Util
 */

import moment from 'moment';

const formatDay = 'YYYY-MM-DD';

const Times = {
    /**
     * 获取到当天时间的YYYY-MM-DD格式的数据
     * @returns {string}
     */
    getToday: () => {
        return moment().format(formatDay);
    },
    /**
     * 获取到昨天时间的YYYY-MM-DD格式的数据
     * @returns {string}
     */
    getYesterday: () => {
        const today = moment();
        return today.subtract(1, 'days').format(formatDay);
    },
    /**
     * 获取上一周的周一和周日的日期，其中周一是返回数组的第一个元素，周日是返回数据的第二个元素
     * @returns {Array} 返回的是上周的周一和周日日期
     */
    getLastWeekDays: () => {
        const date = [];
        const weekOfday = parseInt(moment().format('d'), 10); // 计算今天是这周第几天  周日为一周中的第一天
        const start = moment()
            .subtract(weekOfday + 6, 'days')
            .format(formatDay); // 周一日期
        const end = moment()
            .subtract(weekOfday + 0, 'days')
            .format(formatDay); // 周日日期
        date.push(start);
        date.push(end);
        return date;
    },
    /**
     * 获取本周的周一和周日的日期，其中周一是返回数组的第一个元素，周日是返回数据的第二个元素
     * @returns {Array} 返回的是本周的周一和周日日期
     */
    getCurrWeekDays: () => {
        const date = [];
        const weekOfday = parseInt(moment().format('d'), 10); // 计算今天是这周第几天 周日为一周中的第一天
        const start = moment().subtract(weekOfday, 'days').format(formatDay); // 周一日期
        const end = moment()
            .add(7 - weekOfday - 1, 'days')
            .format(formatDay); // 周日日期
        date.push(start);
        date.push(end);
        return date;
    },
    /**
     * 获取上个月的第一天和最后一天的日期，其中第一天是返回数组的第一个元素，最后一天是返回数据的第二个元素
     * @returns {Array} 返回的是上个月的第一天和最后一天日期
     */
    getLastMonthDays: () => {
        const date = [];
        const start = `${moment().subtract('month', 1).format('YYYY-MM')}-01`;
        const end = moment(start).subtract('month', -1).add('days', -1).format(formatDay);
        date.push(start);
        date.push(end);
        return date;
    },
    /**
     * 获取当前月的第一天和最后一天的日期，其中第一天是返回数组的第一个元素，最后一天是返回数据的第二个元素
     * @returns {Array} 返回的是当前月的第一天和最后一天日期
     */
    getCurrMonthDays: () => {
        const date = [];
        const start = `${moment().add('month', 0).format('YYYY-MM')}-01`;
        const end = moment(start).add('month', 1).add('days', -1).format(formatDay);
        date.push(start);
        date.push(end);
        return date;
    },
    /**
     * 获取最近7天日期的第一天和最后一天的日期，其中第一天是返回数组的第一个元素，最后一天是返回数据的第二个元素
     * @returns {Array} 返回的是最近7天日期的第一天和最后一天日期
     */
    getLast7Days: () => {
        const date = [];
        date.push(moment().subtract('days', 7).format(formatDay));
        date.push(moment().subtract('days', 1).format(formatDay));
        return date;
    },
    /**
     * 获取最近30天日期的第一天和最后一天的日期，其中第一天是返回数组的第一个元素，最后一天是返回数据的第二个元素
     * @returns {Array} 返回的是最近30天日期的第一天和最后一天日期
     */
    getLast30Days: () => {
        const date = [];
        date.push(moment().subtract('days', 30).format(formatDay));
        date.push(moment().subtract('days', 1).format(formatDay));
        return date;
    }
};

export default Times;
