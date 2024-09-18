export const kilobytes = (value: number): number => value * 1024;
export const megabytes = (value: number): number => kilobytes(value) * 1024;
export const gigabytes = (value: number): number => megabytes(value) * 1024;
export const terabytes = (value: number): number => gigabytes(value) * 1024;
