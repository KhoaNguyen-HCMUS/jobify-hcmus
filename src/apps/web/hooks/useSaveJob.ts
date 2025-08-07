import { useState } from 'react';
import { toggleSaveJob } from '../services/jobs';
import { toast } from 'react-hot-toast';
import { isAuthenticated } from '../utils/auth';

export const useSaveJob = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveJob = async (jobId: string, isCurrentlySaved: boolean) => {
    if (!isAuthenticated()) {
      toast.error('You can only save jobs when logged in');
      return false;
    }

    try {
      setIsSaving(true);
      const response = await toggleSaveJob(jobId, isCurrentlySaved);
      
      if (response.success) {
        const wasSaved = response.message.includes('saved successfully');
        const wasUnsaved = response.message.includes('unsaved successfully');
        
        if (wasSaved) {
          toast.success('Job saved successfully!');
          return true;
        } else if (wasUnsaved) {
          toast.success('Job removed from saved list!');
          return false;
        } else {
          // Fallback
          if (response.data?.saved) {
            toast.success('Job saved successfully!');
            return true;
          } else {
            toast.success('Job removed from saved list!');
            return false;
          }
        }
      } else {
        if (response.message === 'Authentication required') {
          toast.error('You can only save jobs when logged in');
        } else {
          toast.error(response.message || 'Failed to save job');
        }
        return isCurrentlySaved; // Return current state on error
      }
    } catch (error) {
      toast.error('Network error occurred');
      return isCurrentlySaved; // Return current state on error
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSaveJob,
    isSaving,
  };
}; 