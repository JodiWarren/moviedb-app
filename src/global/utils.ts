export const equals = (value1: any) => (value2: any) => value1 === value2;

export const noOp = () => {
  return;
};

export function isInArray<T>(needle: T, haystack: T[]): boolean {
  return haystack.find(equals(needle)) !== undefined;
}

export const truthyOrZero = (expression: any): any => {
  if (expression) {
    return expression;
  }
  return 0;
};
