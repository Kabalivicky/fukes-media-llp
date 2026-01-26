import { useState } from 'react';
import { useEscrow, EscrowMilestone } from '@/hooks/useEscrow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DollarSign, Calendar, Plus, Check, Play,
  Send, AlertTriangle, Lock, Unlock, Loader2
} from 'lucide-react';
import { format } from 'date-fns';

interface EscrowDashboardProps {
  workspaceId: string;
}

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  pending: { 
    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', 
    icon: null, 
    label: 'Pending' 
  },
  in_progress: { 
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', 
    icon: <Play className="w-3 h-3" />, 
    label: 'In Progress' 
  },
  submitted: { 
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', 
    icon: <Send className="w-3 h-3" />, 
    label: 'Submitted' 
  },
  approved: { 
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', 
    icon: <Lock className="w-3 h-3" />, 
    label: 'In Escrow' 
  },
  paid: { 
    color: 'bg-green-500/20 text-green-400 border-green-500/30', 
    icon: <Check className="w-3 h-3" />, 
    label: 'Paid' 
  },
  disputed: { 
    color: 'bg-destructive/20 text-destructive border-destructive/30', 
    icon: <AlertTriangle className="w-3 h-3" />, 
    label: 'Disputed' 
  },
};

const EscrowDashboard = ({ workspaceId }: EscrowDashboardProps) => {
  const {
    milestones,
    isLoading,
    isClient,
    isArtist,
    summary,
    createMilestone,
    updateMilestoneStatus,
    releaseFunds,
  } = useEscrow(workspaceId);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    amount: '',
    due_date: '',
  });

  const handleCreate = async () => {
    if (!newMilestone.title.trim()) return;

    await createMilestone({
      title: newMilestone.title,
      description: newMilestone.description || undefined,
      amount: newMilestone.amount ? Number(newMilestone.amount) : undefined,
      due_date: newMilestone.due_date || undefined,
    });

    setIsCreateOpen(false);
    setNewMilestone({ title: '', description: '', amount: '', due_date: '' });
  };

  const progressPercentage = summary.total > 0 
    ? ((summary.paid / summary.total) * 100) 
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">${summary.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Escrow</p>
              <p className="text-2xl font-bold text-amber-400">${summary.inEscrow.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Released</p>
              <p className="text-2xl font-bold text-green-400">${summary.paid.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-muted-foreground">${summary.pending.toLocaleString()}</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {progressPercentage.toFixed(0)}% of total budget released
          </p>
        </CardContent>
      </Card>

      {/* Milestones */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Milestones</h3>
        {isClient && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Milestone</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Initial Concept Design"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe deliverables..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount (USD)</Label>
                    <Input
                      type="number"
                      value={newMilestone.amount}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={newMilestone.due_date}
                      onChange={(e) => setNewMilestone(prev => ({ ...prev, due_date: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate} disabled={!newMilestone.title.trim()}>
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {milestones.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No milestones created yet.</p>
            {isClient && <p className="text-sm mt-2">Add milestones to break down the project into payable deliverables.</p>}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {milestones.map((milestone, idx) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={idx + 1}
              isClient={isClient}
              isArtist={isArtist}
              onStatusChange={updateMilestoneStatus}
              onReleaseFunds={releaseFunds}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface MilestoneCardProps {
  milestone: EscrowMilestone;
  index: number;
  isClient: boolean;
  isArtist: boolean;
  onStatusChange: (id: string, status: EscrowMilestone['status']) => Promise<boolean>;
  onReleaseFunds: (id: string) => Promise<boolean>;
}

const MilestoneCard = ({
  milestone,
  index,
  isClient,
  isArtist,
  onStatusChange,
  onReleaseFunds,
}: MilestoneCardProps) => {
  const config = statusConfig[milestone.status];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
            {index}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold">{milestone.title}</h4>
                {milestone.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {milestone.description}
                  </p>
                )}
              </div>
              <Badge className={config.color}>
                {config.icon}
                <span className="ml-1">{config.label}</span>
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
              {milestone.amount && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  ${milestone.amount.toLocaleString()}
                </span>
              )}
              {milestone.due_date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due {format(new Date(milestone.due_date), 'MMM d, yyyy')}
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              {/* Artist Actions */}
              {isArtist && milestone.status === 'pending' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(milestone.id, 'in_progress')}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start Work
                </Button>
              )}
              {isArtist && milestone.status === 'in_progress' && (
                <Button
                  size="sm"
                  onClick={() => onStatusChange(milestone.id, 'submitted')}
                >
                  <Send className="w-4 h-4 mr-1" />
                  Submit for Review
                </Button>
              )}

              {/* Client Actions */}
              {isClient && milestone.status === 'submitted' && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStatusChange(milestone.id, 'disputed')}
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Request Changes
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onStatusChange(milestone.id, 'approved')}
                  >
                    <Lock className="w-4 h-4 mr-1" />
                    Approve & Lock Funds
                  </Button>
                </>
              )}
              {isClient && milestone.status === 'approved' && (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => onReleaseFunds(milestone.id)}
                >
                  <Unlock className="w-4 h-4 mr-1" />
                  Release Payment
                </Button>
              )}
              {isClient && milestone.status === 'disputed' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(milestone.id, 'in_progress')}
                >
                  Send Back for Revision
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscrowDashboard;
