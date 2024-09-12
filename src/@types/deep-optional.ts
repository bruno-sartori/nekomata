export type DeepOptional<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends (...args: any[]) => any
      ? T[P]
      : DeepOptional<T[P]>
    : T[P];
};

