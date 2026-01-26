import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useJobApplications } from '@/hooks/useJobApplications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Loader2, Send, FileText, Link as LinkIcon, CheckCircle } from 'lucide-react';

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
}

const JobApplicationForm = ({
  jobId,
  jobTitle,
  companyName,
  isOpen,
  onClose,
}: JobApplicationFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { applyToJob, isSubmitting, hasApplied } = useJobApplications();

  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate('/auth?redirect=/jobs');
      return;
    }

    const result = await applyToJob({
      job_id: jobId,
      cover_letter: coverLetter.trim() || undefined,
      resume_url: resumeUrl.trim() || undefined,
      portfolio_url: portfolioUrl.trim() || undefined,
    });

    if (result) {
      setSuccess(true);
    }
  };

  const handleClose = () => {
    setCoverLetter('');
    setResumeUrl('');
    setPortfolioUrl('');
    setSuccess(false);
    onClose();
  };

  const alreadyApplied = hasApplied(jobId);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Your application for {jobTitle} at {companyName} has been sent.
              You'll be notified when there's an update.
            </p>
            <Button onClick={handleClose}>Close</Button>
          </motion.div>
        ) : alreadyApplied ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Already Applied</h3>
            <p className="text-muted-foreground mb-6">
              You've already submitted an application for this position.
            </p>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Apply for {jobTitle}</DialogTitle>
              <DialogDescription>
                at {companyName}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Cover Letter */}
              <div className="space-y-2">
                <Label htmlFor="coverLetter">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Cover Letter
                </Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell them why you're a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  maxLength={2000}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {coverLetter.length}/2000
                </p>
              </div>

              {/* Resume URL */}
              <div className="space-y-2">
                <Label htmlFor="resumeUrl">
                  <LinkIcon className="w-4 h-4 inline mr-2" />
                  Resume/CV Link (optional)
                </Label>
                <Input
                  id="resumeUrl"
                  type="url"
                  placeholder="https://drive.google.com/your-resume"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Google Drive, Dropbox, or other file hosting link
                </p>
              </div>

              {/* Portfolio URL */}
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">
                  <LinkIcon className="w-4 h-4 inline mr-2" />
                  Portfolio Link (optional)
                </Label>
                <Input
                  id="portfolioUrl"
                  type="url"
                  placeholder="https://your-portfolio.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gradient-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
