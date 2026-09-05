/**
 * Client-side EMI helper calculation utility (useful for fallback or instant previews)
 */
export const calculateMonthlyEmi = (
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): number => {
  if (tenureMonths <= 0) return 0;
  if (annualInterestRate === 0) {
    return Math.round(principal / tenureMonths);
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
};
