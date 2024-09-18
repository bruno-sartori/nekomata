import { FileInfo } from "ffprobe-wasm";
import { DeepOptional } from "./@types/deep-optional";
import { ErrorCode } from "./@types/errors";

export interface ITestChild {
  alsoNotRequired?: string;
}

export interface ITest {
  notRequired?: string;
  notRequiredChild?: ITestChild;
}

// Tipo auxiliar para tornar todas as propriedades obrigatórias e profundas
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object 
    ? T[P] extends (...args: any[]) => any 
      ? T[P] 
      : DeepRequired<Required<T[P]>>
    : T[P];
};

declare type IRequiredTestChild = DeepRequired<ITestChild>;
declare type IRequiriedTest = DeepRequired<ITest>;

// Ajustando a configuração do logger para usar IRequiredContainerStyle para containerStyle
export declare type IRequiredConfig = Omit<DeepRequired<IRequiriedTest>, 'notRequiredChild'> & {
  notRequiredChild: IRequiredTestChild;
};


export type RangeTimings = {
  start: number;
  end: number;
}

export type ChapterRange = {
  title: string,
  range: { start: number, end: number }
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

export type ContentSeries = {
  seriesTitle: string;
  seasonNumber: number;
  episodeNumber: number;
}

export type ContentMetadata = {
  title: string;
  description: string;
  director: string;
  cast: string[];
  keywords: string[];
  genres: string[];
  ageRating: RatingSystemClassInd | RatingSystemMPA;
  uploadDate: Date;
  contentType: 'MOVIE' | 'SERIES';
  series?: ContentSeries;
  fileInfo: DeepOptional<FileInfo>;
};

export type FileContentType = {
  contentType: 'MOVIE' | 'SERIES';
  series?: ContentSeries;
}

export type Content = {
  file: File;
  progress: number;
  status: 'success' | 'error' | 'pending';
  error?: ErrorCode;
  metadata: ContentMetadata;
};

export type RatingSystemClassInd =  'ER' | 'L' | '10' | '12' | '14' | '16' | '18';
export type RatingSystemMPA = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';

declare global {
  interface Window { 
    FFmpegUtil: any;
    FFmpegWASM: any; 
  }
}
