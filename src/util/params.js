/**
 * @file URL参数处理相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:33
 */

import { isNull, isUndefined, flatten } from 'lodash';
import { isEmptyString } from './types';

// 将 query 变成对象
export const queryParse = (queryString = '') => {
    let query;
    if (queryString.startsWith('?')) {
        query = queryString.substring(1);
    } else {
        query = queryString;
    }
    if (isEmptyString(query)) {
        return {};
    }
    return query.split('&').reduce((prev, cur) => {
        const [k, v = null] = cur.split('=');
        const val = isNull(v) ? v : decodeURIComponent(v);
        if (isUndefined(prev[k])) {
            prev[k] = val;
        } else {
            prev[k] = flatten([prev[k], val]);
        }
        return prev;
    }, {});
};

// 将 对象 变成 query
export const queryStringify = (args = {}) => {
    return Object.entries(args || {})
        .reduce((prev, cur) => {
            const [k, v] = cur;
            if (isUndefined(v)) {
                return prev;
            }
            if (isNull(v)) {
                prev.push(k);
            } else {
                const list = flatten([v])
                    .filter(v2 => {
                        return !isUndefined(v2);
                    })
                    .map(v2 => {
                        const val = encodeURIComponent(v2);
                        return isNull(v2) ? k : [k, val].join('=');
                    });
                prev.push(...list);
            }
            return prev;
        }, [])
        .join('&');
};

const params = {
    /**
     * 将查询参数解析成对象
     * @param {String} search eg. "?a=1&b=2"
     * @return {Object} eg. { a: 1, b: 2 }
     */
    getParams: search => {
        const result = {};
        const arr = search ? search.slice(1).split('&') : [];
        arr.forEach(item => {
            const a = item.split('=');
            result[decodeURIComponent(a[0])] = a.length > 1 ? decodeURIComponent(a[1]) : '';
        });
        return result;
    },

    /**
     * 根据对象生产查询字符串
     * @param {Object} data
     * @return {String}
     */
    getSearch: data => {
        let search = '?';
        Object.keys(data).forEach(key => {
            search += `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ? data[key].toString() : '')}&`;
        });

        // -1 去掉最后一个 '&'
        return search.length > 1 ? search.slice(0, -1) : '';
    },

    /**
     * 解析 window.location.search 参数为对象
     */
    getQuery: () => {
        return params.getParams(window.location.search);
    }
};

export default {
    queryParse,
    queryStringify,
    ...params
};
