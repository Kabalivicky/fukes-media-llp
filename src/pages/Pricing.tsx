import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription, pricingPlans } from '@/hooks/useSubscription';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Check, X, Crown, Star, Zap, Building2, Loader2, 
  ArrowRight, Sparkles, Shield
} from 'lucide-react';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';
import AnimatedSectionDivider from '@/components/AnimatedSectionDivider';
import { AnimatedLetters, GradientText } from '@/components/KineticText';

const tierIcons = {
  free: Star,
  artist: Zap,
  studio: Building2,
  enterprise: Crown,
};

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTier, subscribe, isProcessing } = useSubscription();
  const [annual, setAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/auth?redirect=/pricing');
      return;
    }

    setSelectedPlan(planId);
    const success = await subscribe(planId as any);
    if (success) {
      navigate('/dashboard');
    }
    setSelectedPlan(null);
  };

  const getPrice = (basePrice: number) => {
    if (basePrice === 0) return 0;
    return annual ? Math.floor(basePrice * 10) : basePrice; // 2 months free on annual
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title="Pricing | Membership Plans - Fuke's Media"
        description="Choose the perfect plan for your creative career. From free to enterprise, we have options for individuals and studios."
        keywords="pricing, subscription, membership, VFX, animation, creative professionals"
      />

      {/* Hero Section */}
      <ParallaxSection className="relative pt-32 pb-16" speed={0.5}>
        <FloatingElements variant="mixed" density="low" colorScheme="mixed" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Simple, Transparent Pricing
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <AnimatedLetters>Choose Your</AnimatedLetters>
              <span className="block mt-2">
                <GradientText>Perfect Plan</GradientText>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Label htmlFor="billing" className={!annual ? 'text-foreground' : 'text-muted-foreground'}>
                Monthly
              </Label>
              <Switch
                id="billing"
                checked={annual}
                onCheckedChange={setAnnual}
              />
              <Label htmlFor="billing" className={annual ? 'text-foreground' : 'text-muted-foreground'}>
                Annual
                <Badge variant="secondary" className="ml-2 bg-green-500/10 text-green-500">
                  Save 17%
                </Badge>
              </Label>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      <AnimatedSectionDivider variant="wave" />

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const Icon = tierIcons[plan.id];
              const isCurrentPlan = currentTier === plan.id;
              const price = getPrice(plan.price);

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`h-full flex flex-col ${
                    plan.highlighted 
                      ? 'border-primary shadow-lg shadow-primary/10 scale-105' 
                      : 'border-border/50'
                  } ${isCurrentPlan ? 'ring-2 ring-primary' : ''}`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                        plan.highlighted 
                          ? 'bg-gradient-to-br from-primary to-secondary' 
                          : 'bg-muted'
                      }`}>
                        <Icon className={`w-7 h-7 ${plan.highlighted ? 'text-white' : 'text-foreground'}`} />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold">${price}</span>
                          <span className="text-muted-foreground">
                            /{annual ? 'year' : 'month'}
                          </span>
                        </div>
                        {plan.price > 0 && annual && (
                          <p className="text-sm text-muted-foreground mt-1">
                            ${plan.price}/mo billed annually
                          </p>
                        )}
                      </div>

                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      {isCurrentPlan ? (
                        <Button variant="outline" className="w-full" disabled>
                          <Shield className="w-4 h-4 mr-2" />
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          className={`w-full ${plan.highlighted ? 'gradient-button' : ''}`}
                          variant={plan.highlighted ? 'default' : 'outline'}
                          onClick={() => handleSubscribe(plan.id)}
                          disabled={isProcessing}
                        >
                          {isProcessing && selectedPlan === plan.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              {plan.price === 0 ? 'Get Started' : 'Subscribe'}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
            <p className="text-muted-foreground">
              See what's included in each plan
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Feature</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.id} className="text-center py-4 px-4 capitalize">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Portfolio Items', values: ['5', 'Unlimited', 'Unlimited', 'Unlimited'] },
                  { feature: 'Job Applications', values: ['5/month', 'Unlimited', 'Unlimited', 'Unlimited'] },
                  { feature: 'Direct Messages', values: [false, true, true, true] },
                  { feature: 'Featured in Search', values: [false, true, true, true] },
                  { feature: 'Verified Badge', values: [false, true, true, true] },
                  { feature: 'Post Jobs', values: [false, false, 'Unlimited', 'Unlimited'] },
                  { feature: 'Team Members', values: ['-', '-', '10', 'Unlimited'] },
                  { feature: 'Analytics', values: ['Basic', 'Advanced', 'Advanced', 'Enterprise'] },
                  { feature: 'API Access', values: [false, false, true, true] },
                  { feature: 'Priority Support', values: [false, false, true, true] },
                  { feature: 'Custom Branding', values: [false, false, true, true] },
                  { feature: 'Dedicated Manager', values: [false, false, false, true] },
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    {row.values.map((value, j) => (
                      <td key={j} className="text-center py-4 px-4">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-sm">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'Is there a free trial?',
                a: 'The Free plan is always free and lets you explore the platform. You can upgrade when you\'re ready.',
              },
              {
                q: 'How do I cancel my subscription?',
                a: 'You can cancel from your dashboard settings. Your access continues until the end of the billing period.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 14-day money-back guarantee for all paid plans if you\'re not satisfied.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of creative professionals already using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-button" onClick={() => navigate('/auth')}>
              Start for Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
