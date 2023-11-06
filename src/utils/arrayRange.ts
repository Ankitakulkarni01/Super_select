export const arrayRange = <T extends "number" | "string">(
  start: number,
  stop: number,
  step = 1,
  returnType?: T
) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, index) => {
    const v = start + index * step;

    if (returnType === "string") return v.toString();
    return v;
  }) as T extends "string" ? string[] : number[];
};
