/**
 * Take the value type given an array type
 *
 * @example
 * ```ts
 * type N = Member<number[]>; // type N = number;
 * ```
 */
export type Member<T> = T extends (infer U)[] ? U : T extends readonly (infer U)[] ? U : never;

type Iterator<T, N extends number, Iter extends T[] = []> = Iter['length'] extends N
  ? Iter
  : Iterator<T, N, [...Iter, T]>;

/**
 * An array of type `T` with exactly `N` elements
 *
 * @example
 * ```ts
 * type Foo = "foo";
 * type Bar = StaticArray<Foo, 3>; // type Bar = ["foo", "foo", "foo"];
 * ```
 */
export type StaticArray<T, N extends number> = Readonly<Iterator<T, N>>;
