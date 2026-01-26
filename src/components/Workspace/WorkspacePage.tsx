import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWorkspace, Milestone, WorkspaceFile } from '@/hooks/useWorkspace';
import { useAuth } from '@/contexts/AuthContext';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  MessageCircle, FileText, Target, Send, Paperclip,
  CheckCircle2, Clock, AlertCircle, Plus, Download,
  Calendar, DollarSign, User, ArrowLeft, Loader2
} from 'lucide-react';
import { format } from 'date-fns';

const WorkspacePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const {
    currentWorkspace,
    milestones,
    messages,
    files,
    isLoading,
    sendMessage,
    uploadFile,
    addMilestone,
    updateMilestoneStatus,
  } = useWorkspace(id);

  const [messageInput, setMessageInput] = useState('');
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '', due_date: '', amount: '' });
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentWorkspace) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Workspace not found</h2>
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const progress = milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !id) return;
    
    await sendMessage(id, messageInput);
    setMessageInput('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    
    await uploadFile(id, file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddMilestone = async () => {
    if (!newMilestone.title || !id) return;
    
    await addMilestone({
      workspace_id: id,
      title: newMilestone.title,
      description: newMilestone.description,
      due_date: newMilestone.due_date || undefined,
      amount: newMilestone.amount ? parseFloat(newMilestone.amount) : undefined,
    });
    
    setNewMilestone({ title: '', description: '', due_date: '', amount: '' });
    setIsAddingMilestone(false);
  };

  const getMilestoneStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const isClient = user?.id === currentWorkspace.client_id;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <SEOHelmet
        title={`${currentWorkspace.title} - Workspace`}
        description="Collaborate on your project"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{currentWorkspace.title}</h1>
              <p className="text-muted-foreground">{currentWorkspace.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant={currentWorkspace.status === 'active' ? 'default' : 'secondary'}>
                {currentWorkspace.status}
              </Badge>
              {currentWorkspace.deadline && (
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  Due: {format(new Date(currentWorkspace.deadline), 'MMM d, yyyy')}
                </Badge>
              )}
              {currentWorkspace.budget && (
                <Badge variant="outline">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {currentWorkspace.budget_currency} {currentWorkspace.budget.toLocaleString()}
                </Badge>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Project Progress</span>
              <span>{completedMilestones}/{milestones.length} milestones</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Chat
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <Target className="w-4 h-4" /> Milestones
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Files
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Project Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-12">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${msg.sender_id === user?.id ? 'order-2' : ''}`}>
                            <div
                              className={`rounded-2xl px-4 py-2 ${
                                msg.sender_id === user?.id
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2">
                              {format(new Date(msg.created_at), 'h:mm a')}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Project Milestones
                </CardTitle>
                {isClient && (
                  <Dialog open={isAddingMilestone} onOpenChange={setIsAddingMilestone}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Milestone
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Milestone</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <Input
                          placeholder="Milestone title"
                          value={newMilestone.title}
                          onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                        />
                        <Textarea
                          placeholder="Description (optional)"
                          value={newMilestone.description}
                          onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            type="date"
                            value={newMilestone.due_date}
                            onChange={(e) => setNewMilestone({ ...newMilestone, due_date: e.target.value })}
                          />
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={newMilestone.amount}
                            onChange={(e) => setNewMilestone({ ...newMilestone, amount: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleAddMilestone} className="w-full">
                          Add Milestone
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardHeader>
              <CardContent>
                {milestones.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    No milestones yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getMilestoneStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          {milestone.description && (
                            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {milestone.due_date && (
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {format(new Date(milestone.due_date), 'MMM d, yyyy')}
                              </Badge>
                            )}
                            {milestone.amount && (
                              <Badge variant="outline" className="text-xs">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {milestone.amount.toLocaleString()}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {milestone.status !== 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateMilestoneStatus(
                                milestone.id,
                                milestone.status === 'pending' ? 'in_progress' : 'completed'
                              )}
                            >
                              {milestone.status === 'pending' ? 'Start' : 'Complete'}
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Shared Files
                </CardTitle>
                <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Plus className="w-4 h-4 mr-2" /> Upload File
                </Button>
              </CardHeader>
              <CardContent>
                {files.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    No files shared yet.
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {files.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.file_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.file_size ? `${(file.file_size / 1024).toFixed(1)} KB` : 'Unknown size'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(file.created_at), 'MMM d, h:mm a')}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspacePage;
