import { Proposal } from '@/hooks/useProposals';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, Clock, Link as LinkIcon, 
  CheckCircle2, XCircle, MessageSquare 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProposalListProps {
  proposals: Proposal[];
  isClient: boolean;
  onAccept?: (proposalId: string) => void;
  onReject?: (proposalId: string) => void;
  onMessage?: (artistId: string) => void;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  accepted: 'bg-green-500/20 text-green-500 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-500 border-red-500/30',
  withdrawn: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
};

const ProposalList = ({
  proposals,
  isClient,
  onAccept,
  onReject,
  onMessage,
}: ProposalListProps) => {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No proposals yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              {proposal.artist && (
                <Avatar className="w-12 h-12">
                  <AvatarImage src={proposal.artist.avatar_url || undefined} />
                  <AvatarFallback>
                    {proposal.artist.display_name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold">
                      {proposal.artist?.display_name || 'Artist'}
                    </h4>
                    {proposal.artist?.title && (
                      <p className="text-sm text-muted-foreground">
                        {proposal.artist.title}
                      </p>
                    )}
                  </div>
                  <Badge className={statusColors[proposal.status] || ''}>
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </Badge>
                </div>

                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{proposal.cover_letter}</p>
                </div>

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
                  {proposal.artist?.hourly_rate && (
                    <span className="flex items-center gap-1 text-primary">
                      ${proposal.artist.hourly_rate}/hr
                    </span>
                  )}
                </div>

                {proposal.portfolio_samples && proposal.portfolio_samples.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-2">Portfolio Samples:</p>
                    <div className="flex flex-wrap gap-2">
                      {proposal.portfolio_samples.map((sample, idx) => (
                        <a
                          key={idx}
                          href={sample}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <LinkIcon className="w-3 h-3" />
                          Sample {idx + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    Submitted {formatDistanceToNow(new Date(proposal.created_at), { addSuffix: true })}
                  </span>

                  {isClient && proposal.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMessage?.(proposal.artist_id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => onReject?.(proposal.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="gradient-button"
                        onClick={() => onAccept?.(proposal.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
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

export default ProposalList;
