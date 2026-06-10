export type Category = 'SaaS' | 'Consumer' | 'Hardware' | 'Marketplace' | 'Dev Tools' | 'Other';
export type Tone = 'Bold' | 'Minimal' | 'Emotional' | 'Technical' | 'Playful';
export type Platform = 'Instagram' | 'LinkedIn' | 'Twitter/X' | 'YouTube';
export type VideoSubject = 'Product' | 'Person' | 'Story';

export interface FormData {
  name: string;
  description: string;
  url: string;
  category: Category | '';
  tone: Tone | '';
  videoSubject: VideoSubject | '';
  businessModel: 'B2B' | 'B2C';
  productType: 'Software' | 'Hardware';
  platforms: Platform[];
  videoLength: number;
  inspoUrl: string;
}

export const initialFormData: FormData = {
  name: '',
  description: '',
  url: '',
  category: '',
  tone: '',
  videoSubject: '',
  businessModel: 'B2B',
  productType: 'Software',
  platforms: [],
  videoLength: 30,
  inspoUrl: '',
};

export type ScreenState = 'form' | 'generating' | 'results';
