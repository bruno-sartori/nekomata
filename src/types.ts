
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
