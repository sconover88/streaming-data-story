// TypeScript interfaces for all database tables

export interface Platform {
  id: number;
  name: string;
  launch_year: number;
  color: string;
}

export interface SubscriberData {
  id: number;
  platform_id: number;
  month: string; // ISO date string (YYYY-MM-DD)
  subscribers_millions: number;
  net_change_millions: number;
}

export interface ContentLibrary {
  id: number;
  platform_id: number;
  year: number;
  content_type: ContentType;
  title_count: number;
}

export interface ChurnData {
  id: number;
  platform_id: number;
  month: string; // ISO date string (YYYY-MM-DD)
  churn_rate_percent: number;
  primary_reason: ChurnReason;
}

export interface EngagementMetric {
  id: number;
  platform_id: number;
  year: number;
  content_type: ContentType;
  avg_completion_rate: number;
  avg_hours_per_viewer: number;
}

export type ContentType =
  | 'Original Series'
  | 'Licensed Series'
  | 'Original Film'
  | 'Licensed Film'
  | 'Documentary'
  | 'Live/Sports';

export type ChurnReason =
  | 'Price'
  | 'Content'
  | 'Competition'
  | 'Seasonal'
  | 'Other';
