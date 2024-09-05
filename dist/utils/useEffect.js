export function useEffect(callback, dependencies) {
    let hasRunOnce = false;
    let lastDependencies = [];
    return function () {
        const hasChanged = dependencies.some((dep, i) => dep !== lastDependencies[i]);
        if (!hasRunOnce || hasChanged) {
            callback();
            hasRunOnce = true;
            lastDependencies = [...dependencies];
        }
    };
}
//# sourceMappingURL=useEffect.js.map