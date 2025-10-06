import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Target, 
  PlayCircle, 
  CheckCircle2, 
  Lock,
  Zap,
  BookOpen,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  unlocked: boolean;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  xpReward: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  locked: boolean;
  prerequisites?: string[];
  topics: string[];
}

interface UserProgress {
  level: number;
  totalXP: number;
  currentLevelXP: number;
  nextLevelXP: number;
  rank: string;
  streakDays: number;
}

const GamifiedLearning = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 12,
    totalXP: 2850,
    currentLevelXP: 350,
    nextLevelXP: 500,
    rank: 'VFX Specialist',
    streakDays: 7
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first VFX tutorial',
      xp: 50,
      unlocked: true,
      icon: <Star className="w-5 h-5" />,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Compositor Master',
      description: 'Complete 10 compositing challenges',
      xp: 200,
      unlocked: true,
      icon: <Target className="w-5 h-5" />,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Speed Demon',
      description: 'Complete a tutorial in under 30 minutes',
      xp: 150,
      unlocked: false,
      icon: <Zap className="w-5 h-5" />,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'AI Pioneer',
      description: 'Master 5 AI-powered VFX techniques',
      xp: 500,
      unlocked: false,
      icon: <Trophy className="w-5 h-5" />,
      rarity: 'legendary'
    }
  ]);

  const [learningModules] = useState<LearningModule[]>([
    {
      id: '1',
      title: 'Rotoscoping Fundamentals',
      description: 'Learn the basics of manual and AI-assisted rotoscoping',
      duration: '45 min',
      xpReward: 100,
      difficulty: 'beginner',
      completed: true,
      locked: false,
      topics: ['Manual Rotoscoping', 'AI Tools', 'Best Practices']
    },
    {
      id: '2',
      title: 'Advanced Compositing',
      description: 'Master complex compositing techniques and workflows',
      duration: '90 min',
      xpReward: 200,
      difficulty: 'intermediate',
      completed: true,
      locked: false,
      prerequisites: ['1'],
      topics: ['Node-based Compositing', 'Color Matching', 'Integration']
    },
    {
      id: '3',
      title: 'Neural Rendering',
      description: 'Explore AI-powered rendering and style transfer',
      duration: '120 min',
      xpReward: 300,
      difficulty: 'advanced',
      completed: false,
      locked: false,
      prerequisites: ['2'],
      topics: ['AI Rendering', 'Style Transfer', 'Real-time Processing']
    },
    {
      id: '4',
      title: 'Virtual Production Pipeline',
      description: 'Build end-to-end virtual production workflows',
      duration: '180 min',
      xpReward: 500,
      difficulty: 'advanced',
      completed: false,
      locked: true,
      prerequisites: ['3'],
      topics: ['LED Walls', 'Real-time Tracking', 'Live Compositing']
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: 'Sarah Chen', xp: 4520, level: 18 },
    { rank: 2, name: 'Mike Rodriguez', xp: 3890, level: 15 },
    { rank: 3, name: 'You', xp: 2850, level: 12 },
    { rank: 4, name: 'Emma Wilson', xp: 2340, level: 10 },
    { rank: 5, name: 'David Kim', xp: 1950, level: 9 }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startModule = (moduleId: string) => {
    // Start learning module
    // TODO: Implement module navigation
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">VFX Learning Academy</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Level up your VFX skills with our gamified learning platform. Earn XP, unlock achievements, and compete with fellow artists.
        </p>
      </div>

      {/* User Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Level {userProgress.level} - {userProgress.rank}
              </CardTitle>
              <CardDescription>
                {userProgress.currentLevelXP} / {userProgress.nextLevelXP} XP to next level
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{userProgress.totalXP.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress 
              value={(userProgress.currentLevelXP / userProgress.nextLevelXP) * 100} 
              className="w-full h-3"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">{userProgress.streakDays} day streak</span>
              </div>
              <Badge variant="secondary">
                Rank #3 in Studio
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="learn" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="learn">
            <BookOpen className="w-4 h-4 mr-2" />
            Learn
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="leaderboard">
            <TrendingUp className="w-4 h-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="community">
            <Users className="w-4 h-4 mr-2" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningModules.map((module) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: parseInt(module.id) * 0.1 }}
              >
                <Card className={`relative ${module.locked ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {module.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : module.locked ? (
                            <Lock className="w-5 h-5 text-gray-400" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-primary" />
                          )}
                          {module.title}
                        </CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Duration: {module.duration}</span>
                        <span className="font-medium">+{module.xpReward} XP</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <Button 
                        className="w-full" 
                        disabled={module.locked}
                        onClick={() => startModule(module.id)}
                        variant={module.completed ? "outline" : "default"}
                      >
                        {module.completed ? 'Review' : module.locked ? 'Locked' : 'Start Learning'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: parseInt(achievement.id) * 0.1 }}
              >
                <Card className={`${achievement.unlocked ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' : 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                        <div className={achievement.unlocked ? getRarityColor(achievement.rarity) : 'text-gray-400'}>
                          {achievement.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            +{achievement.xp} XP
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Studio Leaderboard</CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: user.rank * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">Level {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{user.xp.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">XP</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Groups</CardTitle>
                <CardDescription>Join collaborative learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Advanced Compositing Circle</h4>
                    <p className="text-sm text-muted-foreground">5 members • Next session: Today 3PM</p>
                    <Button size="sm" className="mt-2">Join Session</Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">AI VFX Explorers</h4>
                    <p className="text-sm text-muted-foreground">12 members • Next session: Tomorrow 2PM</p>
                    <Button size="sm" variant="outline" className="mt-2">Join Group</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenges</CardTitle>
                <CardDescription>Weekly community challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Speed Rotoscoping Challenge</h4>
                    <p className="text-sm text-muted-foreground">Ends in 3 days • 45 participants</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm">Participate</Button>
                      <Badge>+250 XP</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Creative Compositing Contest</h4>
                    <p className="text-sm text-muted-foreground">Ends in 1 week • 78 participants</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" variant="outline">View Entries</Button>
                      <Badge variant="outline">+500 XP</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamifiedLearning;