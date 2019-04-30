/**
 * @file 数据处理相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:31
 */
const data = {
    loadMore: () => {

    },
    deepClone: () => {

    },
    randomNum: () => {

    },
    /**
    * 根据元数据（judge）是否存在，确定是否返回指定格式的数据（value）,一般在处理表格数据，兼容空数据时使用
    * @param judge 传入的表格某一列的元数据
    * @param value 目标程序期待的在元数据非空时的正常处理结果
    * @returns {*} type为空值时返回'',其它情况下返回value
    */
    formatReturnValue: (judge, value) => {
        let returnValue;
        if (typeof judge === 'string' || Array.isArray(judge)) {
            returnValue = judge.length > 0 ? value : '';
        }
        if (typeof judge === 'object') {
            returnValue = JSON.stringify(judge) !== '{}' ? value : '';
        }
        if (typeof judge === 'number') {
            returnValue = judge > 0 ? value : '';
        }
        if (typeof judge === 'boolean') {
            returnValue = judge ? value : '';
        }
        return returnValue;
    },

};

export default data;