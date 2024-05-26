/**
 * Self explanatory
 *
 * @example
 *
 * ```ts
 * type AnyAndNumber = Equals<any, number>; //false
 * ```
 *
 * @see https://github.com/Microsoft/TypeScript/issues/27024
 * @see https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same
 */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
