/**
 * Checks if two values are strictly equal, regardless of their distribution within conditional types
 */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T> () => T extends Y ? 1 : 2 ? true : false;