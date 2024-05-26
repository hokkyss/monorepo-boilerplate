/**
 * Enumerates from `0` to `N - 1`
 *
 * @example
 * ```ts
 * type Foo = Enumerate<5>; // Foo = 0 | 1 | 2 | 3 | 4
 * ```
 */
export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/**
 * An exclusive range data type.
 *
 * For inclusive range,
 * @see {@link InclusiveRange}
 * @example
 * ```ts
 * type Foo = Range<2, 5>; // type Foo = 2 | 3 | 4;
 *
 * // you can manually use inclusive range
 * type Bar = Range<2, 5> | 5; // type Bar = 2 | 3 | 4 | 5;
 * ```
 */
export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

/**
 * An inclusive range data type.
 *
 * For exclusive range,
 * @see {@link Range}
 * @example
 * ```ts
 * type Foo = InclusiveRange<2, 5>; // type Foo = 2 | 3 | 4 | 5;
 * ```
 */
export type InclusiveRange<F extends number, T extends number> = Range<F, T> | T;
