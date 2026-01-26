import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProposals, ProposalInput } from '@/hooks/useProposals';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Send, Plus, X, Loader2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProposalFormProps {
  briefId: string;
  briefTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ProposalForm = ({
  briefId,
  briefTitle,
  isOpen,
  onClose,
  onSuccess,
}: ProposalFormProps) => {
  const { user } = useAuth();
  const { submitProposal, isSaving } = useProposals();

  const [formData, setFormData] = useState<Omit<ProposalInput, 'brief_id'>>({
    cover_letter: '',
    portfolio_samples: [],
    proposed_budget: undefined,
    proposed_timeline: '',
  });

  const [newSample, setNewSample] = useState('');

  const handleAddSample = () => {
    if (newSample.trim() && !formData.portfolio_samples?.includes(newSample.trim())) {
      setFormData(prev => ({
        ...prev,
        portfolio_samples: [...(prev.portfolio_samples || []), newSample.trim()],
      }));
      setNewSample('');
    }
  };

  const handleRemoveSample = (sample: string) => {
    setFormData(prev => ({
      ...prev,
      portfolio_samples: prev.portfolio_samples?.filter(s => s !== sample) || [],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.cover_letter.trim()) {
      return;
    }

    const result = await submitProposal({
      brief_id: briefId,
      ...formData,
    });

    if (result) {
      onClose();
      onSuccess?.();
      setFormData({
        cover_letter: '',
        portfolio_samples: [],
        proposed_budget: undefined,
        proposed_timeline: '',
      });
    }
  };

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in Required</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Please sign in to submit a proposal.
          </p>
          <Button asChild className="mt-4">
            <Link to="/auth">Sign In</Link>
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Proposal</DialogTitle>
          <p className="text-sm text-muted-foreground">
            For: {briefTitle}
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="cover_letter">Cover Letter *</Label>
            <Textarea
              id="cover_letter"
              value={formData.cover_letter}
              onChange={(e) => setFormData(prev => ({ ...prev, cover_letter: e.target.value }))}
              placeholder="Introduce yourself and explain why you're the perfect fit for this project. Highlight relevant experience and your approach..."
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Be specific about your relevant experience and how you would approach this project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposed_budget">Proposed Budget (USD)</Label>
              <Input
                id="proposed_budget"
                type="number"
                value={formData.proposed_budget || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  proposed_budget: e.target.value ? Number(e.target.value) : undefined 
                }))}
                placeholder="e.g., 3000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposed_timeline">Proposed Timeline</Label>
              <Input
                id="proposed_timeline"
                value={formData.proposed_timeline || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, proposed_timeline: e.target.value }))}
                placeholder="e.g., 2-3 weeks"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Portfolio Samples</Label>
            <p className="text-xs text-muted-foreground">
              Add links to relevant work samples that demonstrate your skills for this project.
            </p>
            <div className="flex gap-2">
              <Input
                value={newSample}
                onChange={(e) => setNewSample(e.target.value)}
                placeholder="https://..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSample())}
              />
              <Button type="button" onClick={handleAddSample} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.portfolio_samples && formData.portfolio_samples.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.portfolio_samples.map((sample, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1 max-w-full">
                    <LinkIcon className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[200px]">{sample}</span>
                    <button onClick={() => handleRemoveSample(sample)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSaving || !formData.cover_letter.trim()}
              className="gradient-button"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Submit Proposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalForm;
