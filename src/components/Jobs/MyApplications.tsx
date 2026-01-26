import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useJobApplications } from '@/hooks/useJobApplications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Briefcase, MapPin, Globe, Clock, Building2,
  CheckCircle, XCircle, Loader2, ArrowRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  pending: { label: 'Pending Review', color: 'bg-amber-500/10 text-amber-600', icon: Clock },
  reviewing: { label: 'Under Review', color: 'bg-blue-500/10 text-blue-600', icon: Loader2 },
  shortlisted: { label: 'Shortlisted', color: 'bg-green-500/10 text-green-600', icon: CheckCircle },
  rejected: { label: 'Not Selected', color: 'bg-red-500/10 text-red-600', icon: XCircle },
  hired: { label: 'Hired!', color: 'bg-emerald-500/10 text-emerald-600', icon: CheckCircle },
};

const MyApplications = () => {
  const { applications, isLoading } = useJobApplications();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start browsing jobs and apply to positions that match your skills.
          </p>
          <Button asChild>
            <Link to="/jobs">
              Browse Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app, index) => {
        const status = statusConfig[app.status] || statusConfig.pending;
        const StatusIcon = status.icon;

        return (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {(app.job as any)?.title || 'Position'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {(app.job as any)?.company?.name || 'Company'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                        {(app.job as any)?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {(app.job as any).location}
                          </span>
                        )}
                        {(app.job as any)?.is_remote && (
                          <Badge variant="secondary" className="text-xs">
                            <Globe className="w-3 h-3 mr-1" />
                            Remote
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${status.color} border-0`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Applied {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                {app.cover_letter && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {app.cover_letter}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MyApplications;
