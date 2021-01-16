export const NONE = 0;
export const ASC = 1;
export const DESC = 2;

export function getNextOrder(order) {
  return (order + 1) % 3;
}
