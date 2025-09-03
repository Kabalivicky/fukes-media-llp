
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, show welcome message
  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto glass-card">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-xl font-semibold">Welcome back!</h3>
          <p className="text-muted-foreground">
            You are already signed in as {user.email}
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            variant="outline"
            className="w-full"
          >
            Manage Account
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      // User will be redirected by the auth context
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Freelancer Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="text-right">
              <Button variant="link" className="text-xs p-0">Forgot password?</Button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full gradient-button" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button 
              variant="link" 
              className="p-0"
              onClick={() => navigate('/auth?tab=signup')}
            >
              Apply to join
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
