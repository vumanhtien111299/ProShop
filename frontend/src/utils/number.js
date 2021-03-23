// add 2 number after comma
export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
