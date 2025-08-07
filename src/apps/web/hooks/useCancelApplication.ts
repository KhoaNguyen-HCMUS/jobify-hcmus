import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { cancelApplication } from '../services/applications';	

export const useCancelApplication = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelApplication = async (jobId: string) => {
    setIsLoading(true);
    try {
      const response = await cancelApplication(jobId);
      
      if (response.success) {
        toast.success('Application cancelled successfully');
        return true;
      } else {
        toast.error(response.message || 'Failed to cancel application');
        return false;
      }
    } catch (error) {
      console.error('Error cancelling application:', error);
      toast.error('Failed to cancel application. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCancelApplication,
    isLoading
  };
};
