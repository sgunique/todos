
export const wrapSetter = (setter, methods, prefix = '') => {
    const allMethods = Object.keys(methods);

    return allMethods.reduce((acc, funName) => {
        acc[`${prefix}${funName}`] = methods[funName](setter);
        return acc;
    }, {});
}