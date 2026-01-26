import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useMessages, Conversation } from '@/hooks/useMessages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Send, ArrowLeft, Loader2, Search, 
  Circle, Check, CheckCheck
} from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';

interface MessagesPageProps {
  initialPartnerId?: string;
}

const MessagesPage = ({ initialPartnerId }: MessagesPageProps) => {
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    isLoading, 
    unreadCount,
    fetchMessages, 
    sendMessage 
  } = useMessages();
  
  const [selectedPartner, setSelectedPartner] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle initial partner selection
  useEffect(() => {
    if (initialPartnerId && conversations.length > 0) {
      const partner = conversations.find(c => c.user_id === initialPartnerId);
      if (partner) {
        setSelectedPartner(partner);
        fetchMessages(initialPartnerId);
      }
    }
  }, [initialPartnerId, conversations, fetchMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedPartner(conversation);
    fetchMessages(conversation.user_id);
  };

  const handleSendMessage = async () => {
    if (!selectedPartner || !newMessage.trim()) return;

    setIsSending(true);
    const success = await sendMessage(selectedPartner.user_id, newMessage);
    if (success) {
      setNewMessage('');
    }
    setIsSending(false);
  };

  const formatMessageTime = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday ' + format(date, 'h:mm a');
    }
    return format(date, 'MMM d, h:mm a');
  };

  const filteredConversations = conversations.filter(c =>
    c.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sign in to message</h3>
            <p className="text-muted-foreground">
              Create an account or sign in to connect with other professionals.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex">
      {/* Conversations List */}
      <div className={`w-full md:w-80 border-r flex flex-col ${selectedPartner ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Messages
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Start by messaging someone from the community</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.user_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => handleSelectConversation(conversation)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                  selectedPartner?.user_id === conversation.user_id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar_url || undefined} />
                    <AvatarFallback>
                      {conversation.display_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.unread_count > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {conversation.unread_count}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{conversation.display_name}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(conversation.last_message_at)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.last_message}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Message Thread */}
      <div className={`flex-1 flex flex-col ${!selectedPartner ? 'hidden md:flex' : 'flex'}`}>
        {selectedPartner ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedPartner(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src={selectedPartner.avatar_url || undefined} />
                <AvatarFallback>
                  {selectedPartner.display_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedPartner.display_name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => {
                    const isOwn = message.sender_id === user.id;
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isOwn
                              ? 'bg-primary text-primary-foreground rounded-br-md'
                              : 'bg-muted rounded-bl-md'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : ''}`}>
                            <span className="text-[10px] opacity-70">
                              {formatMessageTime(message.created_at)}
                            </span>
                            {isOwn && (
                              message.is_read 
                                ? <CheckCheck className="w-3 h-3 opacity-70" />
                                : <Check className="w-3 h-3 opacity-70" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isSending}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isSending || !newMessage.trim()}
                  className="gradient-button"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
