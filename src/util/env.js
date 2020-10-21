const env = {
    isProd: () => !env.isDev() && !env.isTest(),

    isDev: () => {
        return !!window.location.port;
    },

    isTest: () => {
        return !!window.location.origin.includes('test');
    }
};
export default env;
