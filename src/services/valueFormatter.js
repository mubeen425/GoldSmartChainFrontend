export const valueFormatter = (num) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 12,
    useGrouping: false
  });
  return formatter.format(num);
};
