import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Lock, Mail, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DynamicHeader from '@/components/DynamicHeader';
import Footer from '@/components/Footer';
import LightweightBackground from '@/components/LightweightBackground';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp, resetPassword, loading } = useAuth();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'signin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign In Form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  // Reset Password Form
  const [resetEmail, setResetEmail] = useState('');

  // Redirect authenticated users
  useEffect(() => {
    if (user && !loading) {
      // Check if new user (no profile completed) - redirect to onboarding
      const isNewSignup = searchParams.get('new') === 'true';
      navigate(isNewSignup ? '/onboarding' : '/dashboard');
    }
  }, [user, loading, navigate, searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signIn(signInEmail, signInPassword);
    
    if (!error) {
      navigate('/');
    }

    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpPassword !== confirmPassword) {
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await signUp(signUpEmail, signUpPassword, displayName);
    
    if (!error) {
      // Redirect to onboarding after successful signup
      navigate('/onboarding');
    }

    setIsSubmitting(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await resetPassword(resetEmail);
    
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Authentication - Fukes Media | Sign In or Create Account</title>
        <meta 
          name="description" 
          content="Sign in to your Fukes Media account or create a new account to access our VFX services, pricing tools, and freelancer portal." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <LightweightBackground />
        <DynamicHeader />
        
        <main className="flex-1 flex items-center justify-center py-12 px-4 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <h1 className="text-3xl font-bold mb-2">Welcome to Fukes Media</h1>
              <p className="text-muted-foreground">Access your account or create a new one</p>
            </div>

            <Card className="glass-card">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="reset">Reset</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="space-y-4 mt-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl text-center">Sign In</CardTitle>
                    </CardHeader>
                    
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="Enter your password"
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full gradient-button" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                      </Button>

                      <div className="text-center">
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('reset')}
                          className="text-sm"
                        >
                          Forgot your password?
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl text-center">Create Account</CardTitle>
                    </CardHeader>
                    
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Display Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Enter your display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create a password"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            className="pl-10"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                        {signUpPassword !== confirmPassword && confirmPassword && (
                          <p className="text-destructive text-sm">Passwords do not match</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full gradient-button" 
                        disabled={isSubmitting || signUpPassword !== confirmPassword}
                      >
                        {isSubmitting ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="reset" className="space-y-4 mt-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl text-center">Reset Password</CardTitle>
                    </CardHeader>
                    
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full gradient-button" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Reset Link"}
                      </Button>

                      <div className="text-center">
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab('signin')}
                          className="text-sm"
                        >
                          Back to Sign In
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Auth;
