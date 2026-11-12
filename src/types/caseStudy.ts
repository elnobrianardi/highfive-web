export type CaseStudyMetric = {
  label: string;
  value: string;
};

// "lg" untuk logo yang rasionya hampir persegi (butuh ruang lebih besar),
// "sm" untuk wordmark lebar seperti kredivo yang sudah terbaca di ukuran kecil
export type LogoSize = "sm" | "lg";

export type CaseStudy = {
  title: string;
  description?: string;
  image: string;
  logo: string;
  logoSize?: LogoSize;
  metrics: CaseStudyMetric[];
};
