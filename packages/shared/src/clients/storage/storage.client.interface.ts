export interface DefaultOptions {
  key: string;
}

export interface GetItem {
  <T>(options: GetOptions<T>): Promise<T | undefined>;
  <T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
}

export type GetOptions<T> = {
  defaultValue?: never;
  deserialize?: (value: any) => T;
} & DefaultOptions;

export type GetOptionsWithDefaultValue<T> = {
  defaultValue: T;
  deserialize?: (value: any) => T;
} & DefaultOptions;

export type SetOptions<T> = {
  serialize?: (value: T) => any;
  value: T;
} & DefaultOptions;

export default interface IStorageClient {
  clear: () => Promise<boolean>;
  deleteItem: (options: DefaultOptions) => Promise<boolean>;
  getItem: GetItem;
  has: (options: DefaultOptions) => Promise<boolean>;
  setItem: <T>(options: SetOptions<T>) => Promise<boolean>;
}
