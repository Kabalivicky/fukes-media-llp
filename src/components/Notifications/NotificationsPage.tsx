import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, Check, CheckCheck, Trash2, Loader2,
  UserPlus, MessageCircle, Briefcase, FileText, AlertCircle,
  DollarSign, Milestone
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'follow':
      return <UserPlus className="w-5 h-5 text-blue-500" />;
    case 'message':
    case 'workspace_message':
      return <MessageCircle className="w-5 h-5 text-green-500" />;
    case 'job_application':
      return <Briefcase className="w-5 h-5 text-purple-500" />;
    case 'proposal':
    case 'proposal_update':
      return <FileText className="w-5 h-5 text-orange-500" />;
    case 'project_invite':
      return <AlertCircle className="w-5 h-5 text-teal-500" />;
    case 'milestone':
      return <Milestone className="w-5 h-5 text-indigo-500" />;
    case 'payment':
      return <DollarSign className="w-5 h-5 text-emerald-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
  }
};

const NotificationsPage = () => {
  const { 
    notifications, 
    isLoading, 
    unreadCount,
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.is_read)
    : notifications;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} new</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[calc(100vh-16rem)]">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm">
              {filter === 'unread' 
                ? "You're all caught up!"
                : "Notifications will appear here when you get activity"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                    notification.is_read 
                      ? 'bg-background border-border' 
                      : 'bg-primary/5 border-primary/20'
                  }`}
                >
                  <div className="p-2 rounded-full bg-muted">
                    <NotificationIcon type={notification.type} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-medium ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </p>
                        {notification.content && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.content}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {!notification.is_read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationsPage;
