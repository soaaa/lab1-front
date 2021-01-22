export const NONE = 0;
export const ASC = 1;
export const DESC = 2;

export function getNextOrder(order) {
  return (order + 1) % 3;
}

export function getOrderValue(order) {
  if (order === ASC) return "asc";
  if (order === DESC) return "desc";
}

export function getOrderSymbol(order) {
  switch (order) {
    case ASC: return String.fromCharCode(8595);
    case DESC: return String.fromCharCode(8593);
    case NONE: return "-";
  }
}
