import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasNextPage: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  loading,
  hasNextPage,
  className = '',
  children
}) => {
  if (!hasNextPage) {
    return null;
  }

  return (
    <div className={`flex justify-center mt-6 ${className}`}>
      <button
        onClick={onClick}
        disabled={loading}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          loading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        }`}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children || (loading ? 'Loading...' : 'Load More')}
      </button>
    </div>
  );
};

export default LoadMoreButton;
