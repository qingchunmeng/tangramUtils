const env = {
    isProd: () => !env.isDev() && !env.isTest(),

    isDev: () => {
        const hasPort = !!window.location.port; // 开发环境
        return hasPort;
    },

    isTest: () => {
        const isTest = !!window.location.href.includes('test'); // 测试环境
        return isTest;
    },
};
export default env;
