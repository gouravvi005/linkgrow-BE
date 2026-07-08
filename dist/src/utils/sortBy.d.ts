type Primitive = string | number | boolean;
export type Primer = (value: Primitive) => Primitive;
declare const sortBy: <T extends Record<string, any>>(field: keyof T, reverse: boolean, primer?: (value: Primitive) => Primitive) => (a: T, b: T) => number;
export default sortBy;
