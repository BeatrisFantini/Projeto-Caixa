export type Substituir<T, R> = Omit<T, keyof R> & R;
