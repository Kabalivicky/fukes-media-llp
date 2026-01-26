import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  sender?: { display_name: string; avatar_url: string | null };
  receiver?: { display_name: string; avatar_url: string | null };
}

export interface Conversation {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    if (!user) return;

    try {
      // Get all messages where user is sender or receiver
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by conversation partner
      const conversationMap = new Map<string, Conversation>();
      
      for (const msg of data || []) {
        const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            user_id: partnerId,
            display_name: 'Loading...',
            avatar_url: null,
            last_message: msg.content,
            last_message_at: msg.created_at,
            unread_count: 0,
          });
        }
        
        const conv = conversationMap.get(partnerId)!;
        if (!msg.is_read && msg.receiver_id === user.id) {
          conv.unread_count++;
        }
      }

      // Fetch user profiles for conversation partners
      const partnerIds = Array.from(conversationMap.keys());
      if (partnerIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles_public')
          .select('user_id, display_name, avatar_url')
          .in('user_id', partnerIds);

        for (const profile of profiles || []) {
          const conv = conversationMap.get(profile.user_id);
          if (conv) {
            conv.display_name = profile.display_name || 'Anonymous';
            conv.avatar_url = profile.avatar_url;
          }
        }
      }

      setConversations(Array.from(conversationMap.values()));
      
      // Calculate total unread
      const totalUnread = Array.from(conversationMap.values())
        .reduce((sum, c) => sum + c.unread_count, 0);
      setUnreadCount(totalUnread);
      
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch messages with a specific user
  const fetchMessages = useCallback(async (partnerId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark unread messages as read
      const unreadIds = (data || [])
        .filter(m => !m.is_read && m.receiver_id === user.id)
        .map(m => m.id);

      if (unreadIds.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true, read_at: new Date().toISOString() })
          .in('id', unreadIds);
      }

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [user]);

  // Send a message
  const sendMessage = async (receiverId: string, content: string) => {
    if (!user) {
      toast.error('Please sign in to send messages');
      return false;
    }

    if (!content.trim()) {
      toast.error('Message cannot be empty');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, data]);
      
      // Create notification for receiver
      await supabase.from('notifications').insert({
        user_id: receiverId,
        type: 'message',
        title: 'New Message',
        content: `You have a new message`,
        reference_id: data.id,
        reference_type: 'message',
      });

      return true;
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return false;
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Real-time subscription for new messages
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          setUnreadCount(prev => prev + 1);
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchConversations]);

  return {
    conversations,
    messages,
    isLoading,
    unreadCount,
    fetchConversations,
    fetchMessages,
    sendMessage,
  };
};
