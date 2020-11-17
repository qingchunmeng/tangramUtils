/* eslint-disable no-underscore-dangle */

/**
 *字典相关方法
 */
const Dict = {
    getDictByType(code) {
        if (!window._GLOBAL_DATA_.CONFIG_DATAV2 || typeof window._GLOBAL_DATA_.CONFIG_DATAV2[code] === 'undefined') {
            return [];
        }
        // 筛掉isValid为1的无效数据
        const rs = window._GLOBAL_DATA_.CONFIG_DATAV2[code] || [];
        return rs.filter(item => !item.isValid);
    },
    getDictValue(code, value) {
        let list = window._GLOBAL_DATA_.CONFIG_DATAV2[code] || [];
        // 通过isValid筛选出有效的
        list = list.filter(item => !item.isValid);
        if (list && list.length) {
            const { length } = list;
            for (let i = 0; i < length; i++) {
                if (list[i].dictCode == value) {
                    return list[i].dictName;
                }
            }
        }
        return '';
    },
    getDictItem(code, value) {
        let list = window._GLOBAL_DATA_.CONFIG_DATAV2[code] || [];
        // 通过isValid筛选出有效的
        list = list.filter(item => !item.isValid);
        if (list && list.length) {
            const { length } = list;
            for (let i = 0; i < length; i++) {
                if (list[i].dictCode == value) {
                    return list[i];
                }
            }
        }
        return '';
    },
    getGlobalDictByType(code) {
        if (!window._GLOBAL_DATA_ || typeof window._GLOBAL_DATA_[code] === 'undefined') {
            return [];
        }
        // 筛掉isValid为1的无效数据
        const rs = window._GLOBAL_DATA_[code] || [];
        rs.forEach(item => {
            item.dictName = item.desc;
            item.dictCode = item.key;
        });
        return rs.filter(item => !item.isValid);
    }
};

export default Dict;
