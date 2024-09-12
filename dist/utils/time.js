export const secondsToHours = (seconds) => seconds / 3600;
export const secondsToMinutes = (seconds) => seconds / 60;
export const isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
};
export const floatToHHMM = (number) => {
    let sign = (number >= 0) ? 1 : -1;
    number = number * sign;
    const hour = Math.floor(number);
    let decpart = number - hour;
    const min = 1 / 60;
    decpart = min * Math.round(decpart / min);
    let minute = Math.floor(decpart * 60) + '';
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    sign = sign == 1 ? '' : '-';
    const time = sign + hour + ':' + minute;
    return time;
};
export const floatToMMSS = (number) => {
    let sign = (number >= 0) ? 1 : -1;
    number = number * sign;
    let minute = Math.floor(number);
    let decpart = number - minute;
    const sec = 1 / 60;
    decpart = sec * Math.floor(decpart / sec);
    let second = Math.floor(decpart * 60) + '';
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    if (second.length < 2) {
        second = '0' + second;
    }
    sign = sign == 1 ? '' : '-';
    const time = sign + minute + ':' + second;
    return time;
};
export const getTimeString = (timeNumber, metric) => {
    switch (metric) {
        case 'hours':
            return floatToHHMM(timeNumber);
        case 'minutes':
            return floatToMMSS(timeNumber);
        default:
            return floatToMMSS(timeNumber);
    }
};
//# sourceMappingURL=time.js.map