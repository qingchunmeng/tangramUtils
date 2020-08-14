const env = {
    isProd: () => !env.isDev && !env.isTest,

    isTest: () => {
        const hasPort = !!window.location.port; // 开发环境
        return hasPort;
    },

    isDev: () => {
        const isTest = !!window.location.href.indexOf('test'); // 测试环境
        return isTest;
    },
};
export default env;
