import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { SubscriberData, Platform } from '../types/database';

interface SubscriberDataWithPlatform extends SubscriberData {
  platform: Platform;
}

interface UseSubscriberDataResult {
  subscriberData: SubscriberDataWithPlatform[];
  loading: boolean;
  error: string | null;
}

export function useSubscriberData(): UseSubscriberDataResult {
  const [subscriberData, setSubscriberData] = useState<SubscriberDataWithPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    supabase
      .from('subscriber_data')
      .select('*, platform:platforms(*)')
      .order('month', { ascending: true })
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setError(error.message);
        } else {
          setSubscriberData((data as SubscriberDataWithPlatform[]) || []);
        }
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { subscriberData, loading, error };
}
