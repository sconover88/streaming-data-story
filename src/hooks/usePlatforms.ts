import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Platform } from '../types/database';

interface UsePlatformsResult {
  platforms: Platform[];
  loading: boolean;
  error: string | null;
}

export function usePlatforms(): UsePlatformsResult {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    supabase
      .from('platforms')
      .select('*')
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setError(error.message);
        } else {
          setPlatforms(data || []);
        }
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { platforms, loading, error };
}
