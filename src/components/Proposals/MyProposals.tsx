import { useProposals } from '@/hooks/useProposals';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  FileText, DollarSign, Clock, 
  XCircle, ExternalLink, Briefcase 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  accepted: 'bg-green-500/20 text-green-500 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-500 border-red-500/30',
  withdrawn: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
};

const MyProposals = () => {
  const { myProposals, isLoading, withdrawProposal } = useProposals();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (myProposals.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-semibold mb-2">No Proposals Yet</h3>
        <p className="text-muted-foreground mb-4">
          Start applying to project briefs to see your proposals here.
        </p>
        <Button asChild>
          <Link to="/projects">Browse Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {myProposals.map((proposal) => (
        <Card key={proposal.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <h4 className="font-semibold truncate">
                    {proposal.brief?.title || 'Project Brief'}
                  </h4>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {proposal.cover_letter}
                </p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  {proposal.proposed_budget && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${proposal.proposed_budget.toLocaleString()}
                    </span>
                  )}
                  {proposal.proposed_timeline && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {proposal.proposed_timeline}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    Submitted {formatDistanceToNow(new Date(proposal.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge className={statusColors[proposal.status] || ''}>
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </Badge>

                <div className="flex gap-2">
                  {proposal.status === 'accepted' && (
                    <Button size="sm" asChild>
                      <Link to={`/workspace/${proposal.id}`}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open Workspace
                      </Link>
                    </Button>
                  )}
                  {proposal.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500"
                      onClick={() => withdrawProposal(proposal.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Withdraw
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyProposals;
