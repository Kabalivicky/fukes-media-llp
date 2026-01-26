import NotificationsPage from '@/components/Notifications/NotificationsPage';
import SEOHelmet from '@/components/SEOHelmet';

const Notifications = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHelmet
        title="Notifications | Stay Updated"
        description="View your notifications for new followers, messages, and project updates."
      />
      <NotificationsPage />
    </div>
  );
};

export default Notifications;
