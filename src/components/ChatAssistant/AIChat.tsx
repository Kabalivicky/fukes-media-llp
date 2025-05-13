import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, X, Loader, User, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';
import ErrorBoundary from '@/components/ErrorBoundary';
import AnimatedLogo from '@/components/AnimatedLogo';

// Define the types for our messages
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface AIStatus {
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
}

// Mock API for now - would be replaced with actual API implementation
const fetchAIResponse = async (messages: Message[]): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lastMessage = messages[messages.length - 1];
  
  // Simple response logic - would be replaced with actual AI API
  if (lastMessage.content.toLowerCase().includes('hello')) {
    return "Hello there! How can I help with your VFX project today?";
  } else if (lastMessage.content.toLowerCase().includes('price')) {
    return "Our pricing is based on several factors including complexity, number of shots, and timeline. I can help you get a detailed quote using our pricing calculator, or connect you with our sales team.";
  } else if (lastMessage.content.toLowerCase().includes('portfolio')) {
    return "We have worked on projects ranging from Hollywood blockbusters to indie films. Our portfolio includes work for Marvel, Disney, HBO, and many independent studios. Would you like me to show you specific examples of our work?";
  } else {
    return "Thanks for your message. Our team specializes in high-end VFX, AI-driven creative solutions, and production support. Is there a specific project you'd like to discuss?";
  }
};

// Function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      role: 'system',
      content: 'Welcome to Fuke\'s Media AI Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState<string>('');
  const [status, setStatus] = useState<AIStatus>({
    isLoading: false,
    isListening: false,
    isSpeaking: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setStatus({ ...status, isLoading: true });
    
    try {
      // Get AI response
      const response = await fetchAIResponse([...messages, userMessage]);
      
      // Add AI response
      const aiMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      toast({
        title: "Communication Error",
        description: "We're having trouble connecting to our AI system. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setStatus({ ...status, isLoading: false });
    }
  };
  
  const toggleVoiceInput = () => {
    // This would be implemented with the Web Speech API
    if (status.isListening) {
      setStatus({ ...status, isListening: false });
      toast({
        title: "Voice input stopped",
        description: "Voice recognition has been turned off.",
      });
    } else {
      setStatus({ ...status, isListening: true });
      toast({
        title: "Listening...",
        description: "Speak now. Voice recognition is active.",
      });
      
      // Simulated voice input for demo
      setTimeout(() => {
        setInput(prev => prev + "How can you help with my VFX project?");
        setStatus({ ...status, isListening: false });
      }, 3000);
    }
  };
  
  const clearChat = () => {
    setMessages([
      {
        id: generateId(),
        role: 'system',
        content: 'Chat history has been cleared. How can I help you today?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <ErrorBoundary>
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-border/60 bg-card/90 backdrop-blur-sm">
        <CardHeader className="border-b border-border/40 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AnimatedLogo size="sm" className="mr-2" />
              <CardTitle className="text-xl">VFX AI Assistant</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10">
                Enhanced Studio Knowledge
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={clearChat}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear chat history</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className={`h-8 w-8 ${message.role !== 'user' ? 'bg-primary/20' : 'bg-secondary'}`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <AnimatedLogo size="sm" />
                      )}
                    </Avatar>
                    
                    <div className={`rounded-lg px-4 py-2 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : (message.role === 'system' ? 'bg-muted text-muted-foreground' : 'bg-accent text-accent-foreground')
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {status.isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 bg-primary/20">
                      <AnimatedLogo size="sm" />
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-accent text-accent-foreground">
                      <div className="flex items-center">
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {messages.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute bottom-20 right-4 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
        
        <CardFooter className="border-t border-border/40 pt-3">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleVoiceInput}
              className={status.isListening ? 'bg-red-500/20' : ''}
            >
              {status.isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Textarea
              ref={inputRef}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 min-h-10 h-10 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button 
              type="submit" 
              className="gradient-button"
              disabled={status.isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </ErrorBoundary>
  );
};

export default AIChat;
