import moment from 'moment';
import debounce from './debounce.js';
import cache from './cache.js';
import data from './data';
import dom from './dom.js';
import file from './file.js';
import params from './params.js';
import validate from './validate.js';
import dict from './dict.js';

export default {
    debounce,
    dict,
    cache,
    dataProcess: data,
    dom,
    file,
    validate,
    paramsProcess: params,
    moment,
};
