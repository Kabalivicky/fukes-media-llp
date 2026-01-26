import { useState } from 'react';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Users, Briefcase, Building2, FileText,
  TrendingUp, CreditCard, Search, MoreVertical,
  Shield, ShieldCheck, Trash2, RefreshCw
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    isAdmin,
    isLoading,
    stats,
    users,
    fetchStats,
    fetchUsers,
    updateUserRole,
    deleteUser,
  } = useAdminDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const filteredUsers = users.filter(user =>
    user.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-400' },
    { label: 'Active Jobs', value: stats?.totalJobs || 0, icon: Briefcase, color: 'text-green-400' },
    { label: 'Companies', value: stats?.totalCompanies || 0, icon: Building2, color: 'text-purple-400' },
    { label: 'Project Briefs', value: stats?.totalBriefs || 0, icon: FileText, color: 'text-amber-400' },
    { label: 'Proposals', value: stats?.totalProposals || 0, icon: TrendingUp, color: 'text-cyan-400' },
    { label: 'Paid Subscriptions', value: stats?.activeSubscriptions || 0, icon: CreditCard, color: 'text-pink-400' },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHelmet
        title="Admin Dashboard | Platform Management"
        description="Manage users, jobs, companies, and platform analytics."
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform management and analytics</p>
          </div>
          <Button
            variant="outline"
            onClick={() => { fetchStats(); fetchUsers(); }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold mt-2">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar_url || undefined} />
                              <AvatarFallback>
                                {user.display_name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.display_name || 'Unknown'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.title || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.subscription_tier === 'free' ? 'secondary' : 'default'}>
                            {user.subscription_tier || 'free'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateUserRole(user.user_id, 'admin')}>
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Make Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateUserRole(user.user_id, 'moderator')}>
                                <Shield className="w-4 h-4 mr-2" />
                                Make Moderator
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeleteUserId(user.user_id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Job management features coming soon. For now, manage jobs through the{' '}
                  <Link to="/jobs" className="text-primary hover:underline">Jobs page</Link>.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle>Company Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Company management features coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Activity logs and analytics coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the user's profile. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteUserId) {
                  deleteUser(deleteUserId);
                  setDeleteUserId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
