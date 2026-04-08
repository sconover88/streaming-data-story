import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { EngagementMetric, Platform } from '../types/database';

interface EngagementMetricWithPlatform extends EngagementMetric {
  platform: Platform;
}

interface UseEngagementMetricsResult {
  engagementMetrics: EngagementMetricWithPlatform[];
  loading: boolean;
  error: string | null;
}

export function useEngagementMetrics(): UseEngagementMetricsResult {
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetricWithPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    supabase
      .from('engagement_metrics')
      .select('*, platform:platforms(*)')
      .order('year', { ascending: true })
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setError(error.message);
        } else {
          setEngagementMetrics((data as EngagementMetricWithPlatform[]) || []);
        }
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { engagementMetrics, loading, error };
}
