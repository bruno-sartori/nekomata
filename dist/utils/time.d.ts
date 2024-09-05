export declare const logger: {
    info: (label: string, message: string) => void;
    success: (label: string, message: string) => void;
    warn: (label: string, message: string) => void;
    error: (label: string, message: string) => void;
};
export declare const secondsToHours: (seconds: number) => number;
export declare const secondsToMinutes: (seconds: number) => number;
export declare const isFloat: (n: number) => boolean;
export declare const floatToHHMM: (number: number) => string;
export declare const floatToMMSS: (number: number) => string;
export declare const getTimeString: (timeNumber: number, metric: "hours" | "minutes") => string;
//# sourceMappingURL=time.d.ts.map