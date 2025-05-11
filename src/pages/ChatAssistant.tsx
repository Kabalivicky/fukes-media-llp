
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, PlusCircle, Send, Bot, User, Loader2, FileQuestion, Lightbulb, Wand2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

const topics: Topic[] = [
  { 
    id: 'pricing', 
    name: 'Pricing & Quotes', 
    description: 'Get detailed information about our pricing structure and request custom quotes.',
    icon: <FileQuestion className="h-5 w-5" />
  },
  { 
    id: 'services', 
    name: 'Our Services', 
    description: 'Learn about our VFX, post-production, and creative services.',
    icon: <Wand2 className="h-5 w-5" />
  },
  { 
    id: 'technical', 
    name: 'Technical Support', 
    description: 'Get help with file formats, delivery requirements, and technical queries.',
    icon: <Bot className="h-5 w-5" />
  },
  { 
    id: 'ideas', 
    name: 'Creative Ideas', 
    description: 'Explore creative possibilities and get inspiration for your project.',
    icon: <Lightbulb className="h-5 w-5" />
  }
];

// Sample predefined responses
const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
    return "Our pricing varies based on the complexity and scope of your project. Our base VFX packages start at $5,000, while more complex work can range up to $75,000+. For the most accurate quote, I'd recommend using our pricing calculator on the Pricing page, or I can connect you with our sales team for a personalized quote based on your specific needs.";
  }
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    return "Fuke's Media offers a comprehensive range of services including: VFX Solutions (2D/3D compositing, animation, simulations), Creative Services (concept design, motion graphics), Digital Intermediate (color grading, finishing), and Technology Innovation (AI-driven tools, custom pipeline development). Would you like more details about any specific service?";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('speak to')) {
    return "You can reach our team through the contact form on our website, or I can forward your information to the appropriate department. Our typical response time is within 24 hours on business days. Would you like me to help you get in touch with someone specific?";
  }
  
  if (lowerMessage.includes('deadline') || lowerMessage.includes('turnaround')) {
    return "Our turnaround times vary based on project complexity. Standard VFX shots typically take 1-2 weeks, while more complex sequences can take 3-4 weeks. Rush services are available for an additional fee. For your specific timeline needs, I'd recommend discussing directly with our production team.";
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage === 'hey') {
    return "Hello! Welcome to Fuke's Media AI assistant. I'm here to help answer your questions about our services, pricing, or anything else related to our VFX and creative offerings. How can I assist you today?";
  }
  
  return "Thank you for your message. I'll do my best to help you with that. To provide the most accurate information, could you please share a few more details about your project or specific requirements? This will help me tailor my response to your needs.";
};

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm the Fuke's Media AI assistant. I'm here to help answer your questions about our services, pricing, or anything else. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const sendMessage = (content: string = newMessage) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const startNewConversation = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: "Hello! I'm the Fuke's Media AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };
  
  const handleTopicSelect = (topic: Topic) => {
    let prompt = '';
    
    switch(topic.id) {
      case 'pricing':
        prompt = "I'd like to know more about your pricing options.";
        break;
      case 'services':
        prompt = "Can you tell me about the services you offer?";
        break;
      case 'technical':
        prompt = "I need some technical information about your VFX workflows.";
        break;
      case 'ideas':
        prompt = "I'm looking for creative ideas for my project.";
        break;
      default:
        prompt = "I'd like to know more about " + topic.name;
    }
    
    sendMessage(prompt);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <MainLayout pageKey="chat-assistant">
      <Helmet>
        <title>AI Chat Assistant | Fuke's Media</title>
        <meta name="description" content="Get immediate assistance with our AI-powered chat assistant for questions about services, pricing, and creative solutions." />
      </Helmet>
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
              AI Assistant <Sparkles className="h-6 w-6 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-2">
              Get immediate answers about our services, pricing, and creative solutions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar with topics */}
            <div className="lg:col-span-1">
              <Tabs defaultValue="topics" className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="topics">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Common Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {topics.map((topic) => (
                        <Button 
                          key={topic.id} 
                          variant="outline" 
                          className="w-full justify-start text-left px-3 py-5 h-auto"
                          onClick={() => handleTopicSelect(topic)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              {topic.icon}
                            </div>
                            <div>
                              <div className="font-medium">{topic.name}</div>
                              <div className="text-sm text-muted-foreground line-clamp-2">{topic.description}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Conversations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 pb-0">
                      <Button variant="ghost" className="w-full justify-start text-left h-auto py-2" onClick={startNewConversation}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Conversation
                      </Button>
                    </CardContent>
                    <CardFooter className="text-xs text-center text-muted-foreground pt-2">
                      Conversation history is stored locally
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Need More Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      For complex inquiries or to speak with our team directly:
                    </p>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Contact Request Received",
                        description: "Our team will reach out to you shortly."
                      });
                    }}>
                      Contact Sales Team
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Chat interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b pt-4 pb-3 px-4">
                  <CardTitle className="text-lg flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-primary" />
                    Fuke's Media Assistant
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          <Avatar className="h-8 w-8">
                            {message.sender === 'user' ? (
                              <>
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=fukes-ai" />
                                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          
                          <div>
                            <div 
                              className={`px-4 py-2 rounded-lg text-sm ${
                                message.sender === 'user' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}
                            >
                              {message.content}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-1 px-1">
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=fukes-ai" />
                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                          
                          <div className="px-4 py-3 rounded-lg bg-muted">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                
                <CardFooter className="border-t p-4">
                  <div className="flex w-full gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your question here..."
                      className="min-h-9 resize-none"
                      disabled={isTyping}
                    />
                    <Button 
                      className="gradient-button"
                      onClick={() => sendMessage()}
                      disabled={!newMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default ChatAssistant;
