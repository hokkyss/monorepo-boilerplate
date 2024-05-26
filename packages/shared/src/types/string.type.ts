type CapitalLetters =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

/**
 * Converts a string type in Snake Case to Camel Case
 * @example
 *
 * ```ts
 * type Foo = "HELLO_EVERYBODY";
 * type Bar = SnakeToCamelCase<Foo>; // "helloEverybody"
 * ```
 */
export type SnakeToCamelCase<Key extends string> = Key extends `${infer First}_${infer Second}`
  ? `${Lowercase<First>}${Capitalize<SnakeToCamelCase<Second>>}`
  : Lowercase<Key>;

/**
 * Converts a string type in Camel Case to Snake Case. You will need to apply Uppercase or Lowercase by yourself though.
 * @example
 *
 * ```ts
 * type Foo = "helloEverybody";
 * type Bar = CamelToSnakeCase<Foo>; // "hello_Everybody"
 *
 * type FooBar = "HELLOEVERYBODY";
 * type SnakeFooBar = CamelToSnakeCase<FooBar>; // "_H_E_L_L_O_E_V_E_R_Y_B_O_D_Y"
 * ```
 */
export type CamelToSnakeCase<Key extends string> = Key extends `${infer Head}${infer Tail}`
  ? Head extends CapitalLetters
    ? `_${Head}${CamelToSnakeCase<Tail>}`
    : `${Head}${CamelToSnakeCase<Tail>}`
  : Key;
