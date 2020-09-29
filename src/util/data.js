/**
 * @file 数据处理相关Util
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 16:31
 */
const data = {
    loadMore: () => {},
    /**
     * 深拷贝（注意无法复制原型链上的方法，例如 Array.slice）
     * @param sourceData 源数据
     * @return {object}
     */
    deepClone: sourceData => {
        const result = Array.isArray(sourceData) ? [] : {};
        if (sourceData === null || sourceData === undefined) {
            // 特殊类型的处理
            return sourceData;
        }
        const keys = Object.keys(sourceData); // 无法复制原型链上的方法
        keys.forEach(key => {
            if (typeof sourceData[key] === 'object') {
                result[key] = data.deepClone(sourceData[key]);
            } else {
                result[key] = sourceData[key];
            }
        });
        return result;
    },
    /**
     * 生成 [lower, upper] 的随机数（包含两个边界）
     * 如果只提供了一个数字参数 num，会生成一个 [0, num] 的随机数
     * 如果 lower/upper 中任意参数为小数，或者 floating == true，
     * 会返回一个小数的随机数，其他情况下返回的是整数
     *
     * @param lower 较小值
     * @param upper 较大值
     * @param floating 输出是否是小数
     * @return {number}
     *
     * @example
     *
     * data.randomNum(0, 5);
     * 返回一个 0~5 的整数
     *
     * data.ramdomNum(5);
     * 返回一个 0~5 的整数
     *
     * data.randomNum(5, true);
     * 返回一个 0~5 的小数
     *
     * data.randomNum(1.2, 3.5);
     * 返回一个 1.2~3.5 的小数
     */
    randomNum: (lower, upper, floating) => {
        if (upper === undefined || typeof upper == 'boolean') {
            if (lower === undefined) {
                // 两个值都没有，给一个默认值
                lower = 0;
                upper = 1;
            } else {
                // 只传一个数字参数的情况下，生成 [0, num] 的随机数
                floating = upper; // 对应 randomNum(5, true) 的情况
                upper = lower;
                lower = 0;
            }
        }
        // 强制类型控制
        lower = Number(lower);
        upper = Number(upper);
        if (isNaN(lower) || isNaN(upper)) {
            return 0;
        }
        // 强制大小控制
        if (upper < lower) {
            const temp = lower;
            lower = upper;
            upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
            /*
             小数的情况，假设 lower = 10, upper = 20，目标输出小数
             Math.random() = rand = [0, 1)，假设是0.123
             parseFloat(`1e-${num - 1}`) = 0.0001 // 有这个数字才能保证最后的结果可能超过 upper
             upper - lower = 10
             10 + 0.0001 = 10.0001
             [0, 1) * 10.0001 = [0, 10.0001)
             [0, 10) + 10 = [0, 20.0001)
             如果不计算上面的 0.0001，则最后的结果为 [0, 20)，不符合我们的预期
             又因为最后结果可能会超过 upper，所以需要调用 Math.min
             */
            const rand = Math.random();
            const num = `${rand}`.length; // 生成的随机数的位数
            return Math.min(rand * (upper - lower + parseFloat(`1e-${num - 1}`)) + lower, upper);
        }
        /*
         整数的情况，假设 lower = 10, upper = 20
         upper - lower + 1 = 11
         Math.random() = [0, 1)
         [0, 1) * 11 = [0, 11)
         [0, 11) + 10 = [10, 21)
         parseInt([10, 21)) = [10, 20] // parseInt 只会取整数的部分
         */
        return parseInt(Math.random() * (upper - lower + 1) + lower, 10);
    },
    /**
     * 根据元数据（judge）是否存在，确定是否返回指定格式的数据（value）,一般在处理表格数据，兼容空数据时使用
     * @param judge 传入的表格某一列的元数据
     * @param value 目标程序期待的在元数据非空时的正常处理结果
     * @returns {*} type为空值时返回'',其它情况下返回value
     */
    formatReturnValue: (judge, value) => {
        let returnValue;
        const type = Object.prototype.toString.call(judge).slice(8, -1);
        if (type === 'Array' || type === 'String') {
            returnValue = judge.length > 0 ? value : '';
        }
        if (type === 'Object') {
            returnValue = JSON.stringify(judge) !== '{}' ? value : '';
        }
        if (type === 'Number') {
            returnValue = value;
        }
        if (type === 'Boolean') {
            returnValue = judge ? value : '';
        }
        if (type === 'Null' || type === 'Undefined') {
            returnValue = '';
        }
        return returnValue;
    },
    /**
     * 判断组件是否展示
     * @param fieldsValue  所有的表单元素
     * @param displayCondition 该表单元素的展示配置条件
     * @returns {boolean}  是否展示该组件
     */
    shouldFieldDisplay(fieldsValue, displayCondition) {
        if (displayCondition.indexOf('==') != -1) {
            // 增加复合字段展示控制

            const conditionsArray = displayCondition.replace(/[(\\/() | (\\/))]/g, '').split('&&');
            let flag = true;

            conditionsArray.forEach(item => {
                const [key, value] = item.split('==');
                if (fieldsValue[key] != value) {
                    flag = false;
                }
            });
            return flag;
        }

        return true;
    }
};

export default data;
