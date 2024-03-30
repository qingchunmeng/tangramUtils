/**
 * @file 缓存处理相关Util
 */

const cache = {
    /**
     * 获取localStorage中的数据
     * @param key localStorage中的key
     * 使用方法
     * get('test') // 获取localStorage中key为'test'的值
     */
    get: key => {
        const value = window.localStorage.getItem(key);
        return value && JSON.parse(value);
    },

    /**
     * 设置localStorage中的数据
     * @param key localStorage中的key
     * @param value localStorage中的value
     * 使用方法
     * set('test', { key:1, type:2 }) // 设置localStorage中key为'test'的值为{ key:1, type:2 }JSON序列化之后的结果
     */
    set: (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * 移除localStorage中的数据
     * @param key localStorage中的key
     * 使用方法
     * remove('test') // 移除localStorage中key为'test'的值
     */
    remove: key => {
        window.localStorage.removeItem(key);
    },

    /**
     * 获取sessionStorage中的数据
     * @param key sessionStorage中的key
     * 使用方法
     * getFromSession('test') // 获取sessionStorage中key为'test'的值
     */
    getFromSession: key => {
        const value = window.sessionStorage.getItem(key);
        return value && JSON.parse(value);
    },

    /**
     * 设置sessionStorage中的数据
     * @param key sessionStorage中的key
     * @param value sessionStorage中的value
     * 使用方法
     * setToSession('test', { key:1, type:2 }) // 设置sessionStorage中key为'test'的值为{ key:1, type:2 }JSON序列化之后的结果
     */
    setToSession: (key, value) => {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * 移除sessionStorage中的数据
     * @param key sessionStorage中的key
     * 使用方法
     * removeFromSession('test') // 移除sessionStorage中key为'test'的值
     */
    removeFromSession: key => {
        window.sessionStorage.removeItem(key);
    }
};

export default cache;
