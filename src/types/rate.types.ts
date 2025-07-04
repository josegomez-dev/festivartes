export interface RATE {
  judgeIdentifier: string;
  rateAt: string;
  rateValue: number;
  ratingForm?: string | { rateValue: number; [key: string]: any };
}