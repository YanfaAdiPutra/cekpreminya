import rawRates from "@/data/premium-rates.json";

export type Gender = "pria" | "wanita";

export interface PremiumRateRow {
  minAge: number;
  maxAge: number;
  gender: Gender;
  annual: number;
}

export interface PremiumTier {
  id: string;
  badge: string;
  name: string;
  description: string;
  benefits: string[];
  annualDiscountMonths: number;
  rates: PremiumRateRow[];
}

export interface ProductRates {
  productName: string;
  inputs: {
    ageMin: number;
    ageMax: number;
    genders: Gender[];
  };
  tiers: PremiumTier[];
}

export const PREMIUM_RATES = rawRates as unknown as Record<
  string,
  ProductRates
>;

export interface TierPricing {
  tier: PremiumTier;
  annual: number;
  monthlyInstallment: number;
  effectiveMonthly: number;
}

const findRate = (
  tier: PremiumTier,
  age: number,
  gender: Gender,
): PremiumRateRow | undefined => {
  return tier.rates.find(
    (row) => age >= row.minAge && age <= row.maxAge && row.gender === gender,
  );
};

export const quoteProduct = (
  productSlug: string,
  age: number,
  gender: Gender,
): TierPricing[] => {
  const product = PREMIUM_RATES[productSlug];
  if (!product) {
    return [];
  }

  const quotes: TierPricing[] = [];
  for (const tier of product.tiers) {
    const row = findRate(tier, age, gender);
    if (!row) {
      continue;
    }
    const monthsCharged = 12 - tier.annualDiscountMonths;
    quotes.push({
      tier,
      annual: row.annual,
      monthlyInstallment: row.annual / monthsCharged,
      effectiveMonthly: row.annual / 12,
    });
  }

  return quotes.sort((a, b) => b.monthlyInstallment - a.monthlyInstallment);
};

export const formatRupiah = (value: number): string => {
  return `Rp ${Math.round(value).toLocaleString("id-ID")}`;
};
