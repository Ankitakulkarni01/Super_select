const lang = "en-IN"; // undefined

// Currency Value Formatter
export const currencyValueFormatter = (value: number) => {
  if (!value) return "";

  const fn = new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "INR",
    currencyDisplay: "narrowSymbol",

    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    signDisplay: "never",
  });

  return fn.format(value);
};
//
