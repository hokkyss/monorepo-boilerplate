/**
 * @example
 *
 * ```ts
 * const generateRandomNumber = async () => Math.random();
 *
 * type RandomType = AsyncReturnType<typeof generateRandomNumber> // number
 * ```
 */
export type AsyncReturnType<T> = T extends (...args: unknown[]) => Promise<infer U> ? U : T;
