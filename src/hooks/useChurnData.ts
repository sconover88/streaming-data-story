import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChurnData, Platform } from '../types/database';

interface ChurnDataWithPlatform extends ChurnData {
  platform: Platform;
}

interface UseChurnDataResult {
  churnData: ChurnDataWithPlatform[];
  loading: boolean;
  error: string | null;
}

export function useChurnData(): UseChurnDataResult {
  const [churnData, setChurnData] = useState<ChurnDataWithPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    supabase
      .from('churn_data')
      .select('*, platform:platforms(*)')
      .order('month', { ascending: true })
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setError(error.message);
        } else {
          setChurnData((data as ChurnDataWithPlatform[]) || []);
        }
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { churnData, loading, error };
}
