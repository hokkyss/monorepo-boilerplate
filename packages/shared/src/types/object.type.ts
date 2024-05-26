export type Except<T, K extends keyof T> = Omit<T, K>;

/**
 * Self explanatory
 */
export declare type EmptyObject = Record<string, never>;

/**
 * Self explanatory
 */
export declare type AnyObject = Record<never, never>;

/**
 * Make chosen properties NonNullable.
 */
export type SetNonNullable<T, Keys extends keyof T = keyof T> = {
  [Key in Keys]: NonNullable<T[Key]>;
} & Except<T, Keys>;

/**
 * Make all chosen properties to be required.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x?: number;
 *   y?: number;
 *   z: number;
 * };
 *
 * type RequiredFoo = SetRequired<Foo, "x" | "y">; { x: number; y: number; z: number }
 * type RequiredFoo = SetRequired<Foo, "x">; { x: number; y?: number; z: number }
 * ```
 */
export type SetRequired<T, Keys extends keyof T> = Except<T, Keys> & Required<Pick<T, Keys>>;

/**
 * Make all chosen properties to be optional.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number;
 *   y: number;
 *   z: number;
 * };
 *
 * type Bar = SetOptional<Foo, "x" | "y">; // { x?: number; y?: number; z: number }
 * type FooBar = SetOptional<Foo, "y">; // { x: number; y?: number; z: number }
 * ```
 */
export type SetOptional<T, Keys extends keyof T = keyof T> = {
  [Key in Keys]?: T[Key];
} & Except<T, Keys>;

/**
 * Make chosen properties unassignable.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number;
 *   y: number;
 *   z: number;
 * };
 *
 * const bar: SetNever<Foo, "x"> = { x: 5, y: 1, z: 2 }; // error
 * const bar: SetNever<Foo, "x"> = { y: 1, z: 2 }; // ok
 * ```
 */
export type SetNever<T, Keys extends keyof T> = {
  [Key in Keys]: never;
} & Except<T, Keys>;

/**
 * Take only the methods of an object
 */
export type Methods<T> = {
  [P in keyof T as T[P] extends (...args: unknown[]) => unknown ? P : never]: T[P];
};

/**
 * Take only the properties of an object
 */
export type Properties<T> = Omit<T, keyof Methods<T>>;

/**
 * Check if a Key exists in an object
 * @example
 *
 * ```ts
 * interface WithAny {
 *   first: any;
 *   second: number;
 * }
 *
 * type FirstInWithAny = KeyIn<"first", WithAny> // true
 * type SecondInWithAny = KeyIn<"second", WithAny> // true
 * type ThirdInWithAny = KeyIn<"third", WithAny> // false
 * ```
 */
export type KeyIn<Key, Type extends object> = Key extends keyof Type ? true : false;

/**
 * Recursively set all properties of an object to be optional
 */
export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : T[P] extends (infer U)[]
      ? DeepPartial<U>[]
      : T[P] extends object
        ? DeepPartial<T[P]>
        : T[P] extends null | object
          ? DeepPartial<T[P]> | null
          : T[P] extends null | object | undefined
            ? DeepPartial<T[P]> | null
            : T[P];
};

/**
 * Require all properties. The same as using `Require`
 *
 * @example
 * ```ts
 * type Foo = {
 *   x?: number;
 *   y?: number;
 *   z?: number;
 * };
 *
 * const Bar: RequireAll<Foo> = {
 *   x: 1,
 *   y: 2,
 *   z: 5,
 * }; // ok
 * ```
 */
export type RequireAll<T> = Required<T>;

/**
 * Set chosen property to readonly.
 *
 * ```ts
 * type Foo = {
 *   x?: number;
 *   y?: number;
 *   z?: number;
 * };
 *
 * type Bar = SetReadonly<Foo, 'x'>;
 *
 * const x: Bar = {
 *   x: 5,
 *   y: 2,
 *   z: 1,
 * };
 *
 * x.x = 4; // error: Cannot assign to 'x' because it is a read-only property
 * ```
 */
export type SetReadonly<T, Keys extends keyof T> = T extends readonly (infer U)[]
  ? readonly U[]
  : T extends (infer U)[]
    ? U[]
    : {
        readonly [Key in Keys]: T[Key];
      } & Except<T, Keys>;
