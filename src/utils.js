import _ from 'lodash';

const isPrimitive = obj => obj !== Object(obj);
const isNotNested = obj => isPrimitive(obj) || _.every(obj, isPrimitive);
const isArray = obj => !_.find(obj, isPrimitive);

export const arraify = obj => {
    if (isNotNested(obj)) return obj;

    const helper = (val, uid) => ({ ...(arraify(val)), uid });

    if (isArray(obj)) return _.map(obj, helper);

    for (const key in obj) {
        if (!isNotNested(obj[key])) {
            obj[key] = arraify(obj[key]);
        }
    }

    return obj;
};
