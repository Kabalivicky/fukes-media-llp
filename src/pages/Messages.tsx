import MessagesPage from '@/components/Messages/MessagesPage';
import SEOHelmet from '@/components/SEOHelmet';

const Messages = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHelmet
        title="Messages | Connect with Professionals"
        description="Send and receive messages from other creative professionals on the platform."
      />
      <MessagesPage />
    </div>
  );
};

export default Messages;
