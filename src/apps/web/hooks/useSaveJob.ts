import { useState } from 'react';
import { saveJob, unsaveJob } from '../services/jobs';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../utils/auth';

export const useSaveJob = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveJob = async (jobId: string) => {
    if (!isAuthenticated()) {
      toast.error('You can only save jobs when logged in');
      return false;
    }

    try {
      setIsSaving(true);
      const response = await saveJob(jobId);
      
      if (response.success) {
        toast.success('Job saved successfully!');
        return true;
      } else {
        toast.error(response.message || 'Failed to save job');
        return false;
      }
    } catch (error) {
      toast.error('Network error occurred');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnsaveJob = async (jobId: string) => {
    if (!isAuthenticated()) {
      toast.error('You can only save jobs when logged in');
      return true; 
    }

    try {
      setIsSaving(true);
      const response = await unsaveJob(jobId);
      
      if (response.success) {
        toast.success('Job removed from saved jobs');
        return false;
      } else {
        toast.error(response.message || 'Failed to remove job');
        return true; 
      }
    } catch (error) {
      toast.error('Network error occurred');
      return true; 
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSaveJob,
    handleUnsaveJob,
    isSaving,
  };
}; 