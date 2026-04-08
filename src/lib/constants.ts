// Shared constants for the app

export const SECTION_IDS = {
  hero: 'hero',
  bigPicture: 'big-picture',
  divergence: 'divergence',
  content: 'content',
  engagement: 'engagement',
  churn: 'churn',
  takeaway: 'takeaway',
} as const;

export const CONTENT_TYPES = [
  'Original Series',
  'Licensed Series',
  'Original Film',
  'Licensed Film',
  'Documentary',
  'Live/Sports',
] as const;

export const CHURN_REASONS = [
  'Price',
  'Content',
  'Competition',
  'Seasonal',
  'Other',
] as const;

export const YEARS = [2022, 2023, 2024] as const;
