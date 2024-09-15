import { FileInfo } from "ffprobe-wasm";
import { DeepOptional } from "./@types/deep-optional";
export interface ITestChild {
    alsoNotRequired?: string;
}
export interface ITest {
    notRequired?: string;
    notRequiredChild?: ITestChild;
}
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? T[P] extends (...args: any[]) => any ? T[P] : DeepRequired<Required<T[P]>> : T[P];
};
declare type IRequiredTestChild = DeepRequired<ITestChild>;
declare type IRequiriedTest = DeepRequired<ITest>;
export declare type IRequiredConfig = Omit<DeepRequired<IRequiriedTest>, 'notRequiredChild'> & {
    notRequiredChild: IRequiredTestChild;
};
export type RangeTimings = {
    start: number;
    end: number;
};
export type ChapterRange = {
    title: string;
    range: {
        start: number;
        end: number;
    };
};
export type CurrentlyGrabbed = {
    index: number;
    type: string;
};
export type SeekableStyle = {
    backgroundImage?: string;
};
export type Progress = {
    width?: string;
    left?: string;
};
export type ContentMetadata = {
    title: string;
    description: string;
    director: string;
    cast: string[];
    keywords: string[];
    genres: string[];
    uploadDate: Date;
    fileInfo: DeepOptional<FileInfo>;
};
export type Content = {
    file: File;
    progress: number;
    metadata: ContentMetadata;
};
export type RatingSystemClassInd = 'ER' | 'L' | '10' | '12' | '14' | '16' | '18';
export type RatingSystemMPAA = 'G' | '10' | '12' | '18';
declare global {
    interface Window {
        FFmpegUtil: any;
        FFmpegWASM: any;
    }
}
export {};
//# sourceMappingURL=types.d.ts.map