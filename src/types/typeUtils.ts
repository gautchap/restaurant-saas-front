export type PickOne<T, K extends keyof T> = Partial<T> & Pick<T, K>;
