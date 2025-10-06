import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Users, Activity, FileVideo, FileImage, FileAudio, TrendingUp, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ToolUsage {
  id: string;
  tool_name: string;
  input_format: string;
  output_format: string;
  file_size: number;
  processing_time: number;
  success: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [toolUsage, setToolUsage] = useState<ToolUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [stats, setStats] = useState({
    totalConversions: 0,
    successRate: 0,
    avgProcessingTime: 0,
    popularTool: '',
    totalDataProcessed: 0
  });

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        // Admin status check failed
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(!!data);
      
      if (data) {
        fetchToolUsage();
      } else {
        setLoading(false);
      }
    } catch (error) {
      // Admin check failed
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const fetchToolUsage = async () => {
    try {
      const { data, error } = await supabase
        .from('tool_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setToolUsage(data || []);
      calculateStats(data || []);
    } catch (error) {
      // Error fetching tool usage data
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: ToolUsage[]) => {
    if (data.length === 0) {
      setStats({
        totalConversions: 0,
        successRate: 0,
        avgProcessingTime: 0,
        popularTool: 'None',
        totalDataProcessed: 0
      });
      return;
    }

    const totalConversions = data.length;
    const successfulConversions = data.filter(item => item.success).length;
    const successRate = (successfulConversions / totalConversions) * 100;
    
    const avgProcessingTime = data.reduce((sum, item) => sum + (item.processing_time || 0), 0) / data.length;
    
    const toolCounts = data.reduce((acc, item) => {
      acc[item.tool_name] = (acc[item.tool_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const popularTool = Object.entries(toolCounts).reduce((a, b) => 
      toolCounts[a[0]] > toolCounts[b[0]] ? a : b
    )[0];
    
    const totalDataProcessed = data.reduce((sum, item) => sum + (item.file_size || 0), 0);

    setStats({
      totalConversions,
      successRate,
      avgProcessingTime: avgProcessingTime / 1000, // Convert to seconds
      popularTool,
      totalDataProcessed
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getToolIcon = (toolName: string) => {
    const iconMap = {
      'video-converter': FileVideo,
      'image-converter': FileImage,
      'audio-converter': FileAudio
    };
    const Icon = iconMap[toolName as keyof typeof iconMap] || Activity;
    return <Icon className="w-4 h-4" />;
  };

  if (loading || isAdmin === null) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Verifying admin access...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You must be an administrator to access this dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tool Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor tool usage and performance metrics</p>
        </div>
        <Button onClick={fetchToolUsage} disabled={loading}>
          <TrendingUp className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversions}</div>
            <p className="text-xs text-muted-foreground">All-time conversions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Successful conversions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgProcessingTime.toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground">Per conversion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Tool</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.popularTool}</div>
            <p className="text-xs text-muted-foreground">Most used tool</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(stats.totalDataProcessed)}</div>
            <p className="text-xs text-muted-foreground">Total file size</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Tool Usage
          </CardTitle>
          <CardDescription>Latest conversions and their details</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-muted-foreground">Loading...</p>
          ) : toolUsage.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No tool usage data available</p>
          ) : (
            <div className="space-y-4">
              {toolUsage.slice(0, 10).map((usage) => (
                <div key={usage.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getToolIcon(usage.tool_name)}
                    <div>
                      <div className="font-medium">{usage.tool_name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                      <div className="text-sm text-muted-foreground">
                        {usage.input_format} → {usage.output_format}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatFileSize(usage.file_size || 0)}</div>
                      <div className="text-xs text-muted-foreground">
                        {usage.processing_time ? `${(usage.processing_time / 1000).toFixed(1)}s` : 'N/A'}
                      </div>
                    </div>
                    <Badge variant={usage.success ? 'default' : 'destructive'}>
                      {usage.success ? 'Success' : 'Failed'}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {new Date(usage.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;