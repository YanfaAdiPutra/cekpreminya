export type ProductType =
  | "asuransi-jiwa"
  | "asuransi-kesehatan"
  | "asuransi-dana-pensiun"
  | "asuransi-kritis";

export interface EstimatorInput {
  age: number;
  gender: "pria" | "wanita";
  productType: ProductType;
  coverageTier: "dasar" | "menengah" | "premium";
}

export interface EstimatorResult {
  minMonthly: number;
  maxMonthly: number;
}

const PRODUCT_BASE_RATE: Record<ProductType, number> = {
  "asuransi-jiwa": 120000,
  "asuransi-kesehatan": 180000,
  "asuransi-dana-pensiun": 200000,
  "asuransi-kritis": 150000,
};

const TIER_MULTIPLIER: Record<EstimatorInput["coverageTier"], number> = {
  dasar: 1,
  menengah: 1.6,
  premium: 2.4,
};

const getAgeMultiplier = (age: number): number => {
  if (age < 25) return 0.85;
  if (age < 35) return 1;
  if (age < 45) return 1.35;
  if (age < 55) return 1.8;
  return 2.3;
};

export const estimatePremium = (input: EstimatorInput): EstimatorResult => {
  const base = PRODUCT_BASE_RATE[input.productType];
  const ageMultiplier = getAgeMultiplier(input.age);
  const tierMultiplier = TIER_MULTIPLIER[input.coverageTier];

  const midpoint = base * ageMultiplier * tierMultiplier;
  const minMonthly = Math.round((midpoint * 0.8) / 5000) * 5000;
  const maxMonthly = Math.round((midpoint * 1.2) / 5000) * 5000;

  return { minMonthly, maxMonthly };
};

export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};
