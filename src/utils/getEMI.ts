const getEMI = (
  valuation: number,
  downPayment = valuation * 0.2,
  rateOfInterest = 10,
  tenureMonths = 60
) => {
  const newLoanAmount = valuation - downPayment;
  const monthlyInterestRatio = rateOfInterest / 100 / 12;
  const top = Math.pow(1 + monthlyInterestRatio, tenureMonths);
  const bottom = top - 1;
  const sp = top / bottom;
  const emi = newLoanAmount * monthlyInterestRatio * sp;
  const full = Math.round(tenureMonths * emi);
  const interest = full - newLoanAmount;

  const data = {
    emi: Math.round(emi),
    principalAmount: newLoanAmount,
    totalInterest: interest,
    totalAmount: full,
    downPayment: Math.round(downPayment),
    rateOfInterest,
    tenureMonths,
  };

  // console.log("Get EMI", data);

  return data;
};

export default getEMI;
