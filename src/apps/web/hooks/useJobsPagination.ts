import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllJobs, Job, JobsPaginationResponse, JobQueryParams } from '../services/jobs';

interface UseJobsPaginationOptions {
  initialPage?: number;
  limit?: number;
  autoLoad?: boolean;
  filters?: JobQueryParams;
}

interface UseJobsPaginationReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
  loadNextPage: () => Promise<void>;
  loadPage: (page: number) => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
}

export const useJobsPagination = (options: UseJobsPaginationOptions = {}): UseJobsPaginationReturn => {
  const {
    initialPage = 1,
    limit = 10,
    autoLoad = true,
    filters
  } = options;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Stabilize filters to avoid multiple fetches due to object identity changes
  const filtersKey = useMemo(() => JSON.stringify(filters ?? {}), [filters]);

  const loadJobs = useCallback(async (page: number, append: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const response: JobsPaginationResponse = await getAllJobs(page, limit, filters);
      
      if (response.success && response.data) {
        if (append) {
          setJobs(prevJobs => [...prevJobs, ...response.data!]);
        } else {
          setJobs(response.data);
        }
        
        if (response.pagination) {
          setCurrentPage(response.pagination.page);
          setTotalPages(response.pagination.totalPages);
          setHasNextPage(response.pagination.hasNextPage);
        }
      } else {
        setError(response.message || 'Failed to load jobs');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, filtersKey]);

  const loadNextPage = useCallback(async () => {
    if (!loading && hasNextPage) {
      await loadJobs(currentPage + 1, true);
    }
  }, [loading, hasNextPage, currentPage, loadJobs]);

  const loadPage = useCallback(async (page: number) => {
    if (!loading && page >= 1) {
      await loadJobs(page, false);
    }
  }, [loading, loadJobs]);

  const refresh = useCallback(async () => {
    await loadJobs(1, false);
  }, [loadJobs]);

  const reset = useCallback(() => {
    setJobs([]);
    setCurrentPage(initialPage);
    setTotalPages(0);
    setHasNextPage(false);
    setError(null);
  }, [initialPage]);

  // Auto load initial data and refetch when filters change (via loadJobs dependency)
  useEffect(() => {
    if (autoLoad) {
      loadJobs(initialPage, false);
    }
  }, [autoLoad, initialPage, loadJobs]);

  return {
    jobs,
    loading,
    error,
    hasNextPage,
    currentPage,
    totalPages,
    loadNextPage,
    loadPage,
    refresh,
    reset
  };
};
