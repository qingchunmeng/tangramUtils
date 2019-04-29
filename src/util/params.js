/**
 * @file URL参数处理相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:33
 */
const params = {
    /**
     * 将查询参数解析成对象
     * @param {String} search eg. "?a=1&b=2"
     * @return {Object} eg. { a: 1, b: 2 }
     */
    getParams: (search) => {
        const _params = {};
        const arr = search ? search.slice(1).split('&') : [];
        arr.forEach((item) => {
            const a = item.split('=');
            _params[decodeURIComponent(a[0])] = a.length > 1 ? decodeURIComponent(a[1]) : '';
        });
        return _params;
    },

    /**
     * 根据对象生产查询字符串
     * @param {Object} _params
     * @return {String}
     */
    getSearch: (_params) => {
        let search = '?';
        Object.keys(_params).forEach((key) => {
            search += `${encodeURIComponent(key)}=${encodeURIComponent(_params[key] ? _params[key].toString() : '')}&`;
        });

        // -1 去掉最后一个 '&'
        return search.length > 1 ? search.slice(0, -1) : '';
    },

    /**
     * 解析 window.location.search 参数为对象
     */
    getQuery: () => params.getParams(window.location.search),
};

export default params;
