export interface FreightInputs {
  km: number;
  fuelPerKm: number;
  driverCost: number;
  insurancePercent: number;
  overhead: number;
  others: number;
  tolls: number;
  ccd: number;
  cc: number;
  icmsPercent: number;
  cbsPercent: number;
  ibsPercent: number;
  profitMarginPercent: number;
}

export interface FreightResults {
  totalCost: number;
  anttFloor: number;
  priceWithoutTolls: number;
  finalPrice: number;
  isCompliant: boolean;
  taxTotal: number;
  profitTotal: number;
}

export function calculateFreight(inputs: FreightInputs): FreightResults {
  const {
    km,
    fuelPerKm,
    driverCost,
    insurancePercent,
    overhead,
    others,
    tolls,
    ccd,
    cc,
    icmsPercent,
    cbsPercent,
    ibsPercent,
    profitMarginPercent,
  } = inputs;

  // 1. Calculate Base Direct Cost
  // Direct Cost = (Km * Fuel) + Driver + Overhead + Others
  const directCost = (km * fuelPerKm) + driverCost + overhead + others;

  // 2. Apply Insurance
  const totalCost = directCost * (1 + insurancePercent / 100);

  // 3. Calculate ANTT Floor
  // Piso ANTT = (Km * CCD) + CC
  const anttFloor = (km * ccd) + cc;

  // 4. Apply Profit Margin
  const priceWithProfit = totalCost * (1 + profitMarginPercent / 100);
  const profitTotal = priceWithProfit - totalCost;

  // 5. Tax Gross-up
  // Price = Base / (1 - TaxRate)
  const totalTaxRate = (icmsPercent + cbsPercent + ibsPercent) / 100;
  const priceWithoutTolls = priceWithProfit / (1 - totalTaxRate);
  const taxTotal = priceWithoutTolls - priceWithProfit;

  // 6. Final Price with Tolls
  // Tolls are added at the end and are not subject to taxes or profit margin
  const finalPrice = priceWithoutTolls + tolls;

  // 7. Compliance Check
  // Alert if Price without tolls < ANTT Floor
  const isCompliant = priceWithoutTolls >= anttFloor;

  return {
    totalCost,
    anttFloor,
    priceWithoutTolls,
    finalPrice,
    isCompliant,
    taxTotal,
    profitTotal,
  };
}
