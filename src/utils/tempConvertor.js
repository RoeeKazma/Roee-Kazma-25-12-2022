export const tempConvertor = (value, unit) => {
  if (unit === "F") {
    return Math.floor(((value - 32) * 5) / 9);
  } else return value;
};
