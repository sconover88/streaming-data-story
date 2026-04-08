import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ContentLibrary, Platform } from '../types/database';

interface ContentLibraryWithPlatform extends ContentLibrary {
  platform: Platform;
}

interface UseContentLibraryResult {
  contentLibrary: ContentLibraryWithPlatform[];
  loading: boolean;
  error: string | null;
}

export function useContentLibrary(): UseContentLibraryResult {
  const [contentLibrary, setContentLibrary] = useState<ContentLibraryWithPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    supabase
      .from('content_library')
      .select('*, platform:platforms(*)')
      .order('year', { ascending: true })
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setError(error.message);
        } else {
          setContentLibrary((data as ContentLibraryWithPlatform[]) || []);
        }
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { contentLibrary, loading, error };
}
