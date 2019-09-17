/**
 * @file 获取阶段时间处理相关Util
 * @author lihaixu@ke.com
 * @date 2019/9/17 15:38
 */

const Compute = {
    /**
     * 浮点数转整数，加法运算
     * @param {array} nums 数字数组 eg:[0.1, 0.2, 0.3]
     * @param {number} precision 精度 默认保留两位小数 eg:2
     * @returns {number} 返回加法的最终结果
     */
    add: (nums, precision = 2) => {
        const times = 10 ** precision;
        let count = 0;
        nums.forEach((item) => {
            count += Math.round(Number(item || 0) * times);
        });
        const result = count / times;
        if (result.toString().split('.')[1].length > precision) {
            console.warn(`计算结果与实际精度不符，已经保留了${precision}位小数`);
        }
        return Number(result.toFixed(precision));
    },
    /**
     * @param {array} nums 数字数组 eg:[0.1, 0.2, 0.3]
     * @param {number} precision 精度 默认保留两位小数 eg:2
     * @returns {number} 返回减法的最终结果
     */
    subtract: (nums, precision = 2) => {
        const times = 10 ** precision;
        let count = nums[0] * times;
        for (let i = 0; i < nums.length; i++) {
            count -= Math.round(Number(nums[i + 1] || 0) * times);
        }
        const result = count / times;
        if (result.toString().split('.')[1].length > precision) {
            console.warn(`计算结果与实际精度不符，已经保留了${precision}位小数`);
        }
        return Number(result.toFixed(precision));
    },
};

export default Compute;
