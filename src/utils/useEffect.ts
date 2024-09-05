export function useEffect(callback: () => void, dependencies: any[]) {
  let hasRunOnce = false;
  let lastDependencies: any[] = [];

  return function () {
    const hasChanged = dependencies.some((dep, i) => dep !== lastDependencies[i]);

    if (!hasRunOnce || hasChanged) {
      callback();
      hasRunOnce = true;
      lastDependencies = [...dependencies];
    }
  };
}

