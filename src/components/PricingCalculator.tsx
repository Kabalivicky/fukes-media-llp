import { useState, useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Check, AlertCircle, Download, Calculator, ListFilter } from 'lucide-react';
import DynamicPrice from '@/components/DynamicPrice';
import { getUserCurrency, setUserCurrency, currencies } from '@/utils/currencyUtils';

type PricingTier = 'standard' | 'premium' | 'outsourced';
type ServiceType = 'vfx' | 'creative' | 'di' | 'tech';

interface PricingOption {
  name: string;
  description: string;
  basePrice: number;
  pricePerFrame: number;
  minimumFrames: number;
  maximumDiscount: number;
  deliveryTimeInDays: number;
}

const pricingOptions: Record<ServiceType, Record<PricingTier, PricingOption>> = {
  vfx: {
    standard: {
      name: 'In-house Low Cost',
      description: '2D/3D VFX solutions with good quality and turnaround time.',
      basePrice: 25000,
      pricePerFrame: 50,
      minimumFrames: 100,
      maximumDiscount: 0.15,
      deliveryTimeInDays: 14
    },
    premium: {
      name: 'High-Budget',
      description: 'High-end VFX with advanced techniques and senior artists for exceptional quality.',
      basePrice: 75000,
      pricePerFrame: 250,
      minimumFrames: 100,
      maximumDiscount: 0.10,
      deliveryTimeInDays: 21
    },
    outsourced: {
      name: 'Outsourced',
      description: 'Cost-effective solutions for large volume projects with good quality.',
      basePrice: 15000,
      pricePerFrame: 25,
      minimumFrames: 500,
      maximumDiscount: 0.25,
      deliveryTimeInDays: 30
    }
  },
  creative: {
    standard: {
      name: 'In-house Standard',
      description: 'Essential creative services for projects with moderate complexity.',
      basePrice: 25000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.15,
      deliveryTimeInDays: 10
    },
    premium: {
      name: 'High-End',
      description: 'Advanced creative solutions with senior designers and directors.',
      basePrice: 50000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.10,
      deliveryTimeInDays: 18
    },
    outsourced: {
      name: 'Outsourced',
      description: 'Cost-effective creative services for projects with standard requirements.',
      basePrice: 15000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.20,
      deliveryTimeInDays: 24
    }
  },
  di: {
    standard: {
      name: 'Base Light',
      description: 'Color grading and finishing services using Base Light.',
      basePrice: 15000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.15,
      deliveryTimeInDays: 7
    },
    premium: {
      name: 'DaVinci Resolve',
      description: 'Advanced color grading with senior colorists using DaVinci Resolve.',
      basePrice: 25000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.10,
      deliveryTimeInDays: 14
    },
    outsourced: {
      name: 'Outsourced',
      description: 'Basic color correction and finishing services at a lower cost.',
      basePrice: 10000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.20,
      deliveryTimeInDays: 10
    }
  },
  tech: {
    standard: {
      name: 'Standard Tech',
      description: 'Basic technology integration and AI solutions for standard projects.',
      basePrice: 50000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.10,
      deliveryTimeInDays: 21
    },
    premium: {
      name: 'Premium Tech',
      description: 'Advanced custom technology development and AI integration.',
      basePrice: 100000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.05,
      deliveryTimeInDays: 42
    },
    outsourced: {
      name: 'Outsourced Tech',
      description: 'Cost-effective technology solutions using existing frameworks.',
      basePrice: 25000,
      pricePerFrame: 0,
      minimumFrames: 0,
      maximumDiscount: 0.15,
      deliveryTimeInDays: 30
    }
  }
};

const PricingCalculator = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('vfx');
  const [tier, setTier] = useState<PricingTier>('standard');
  const [frames, setFrames] = useState(1000);
  const [framesDuration, setFramesDuration] = useState(41.67); // ~1000 frames at 24fps
  const [shots, setShots] = useState(10);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(getUserCurrency().code);

  const handleDurationChange = (value: string) => {
    const duration = parseFloat(value);
    if (!isNaN(duration)) {
      setFramesDuration(duration);
      setFrames(Math.round(duration * 24)); // Assuming 24fps
    }
  };

  const handleFramesChange = (value: number[]) => {
    const frameCount = value[0];
    setFrames(frameCount);
    setFramesDuration(parseFloat((frameCount / 24).toFixed(2))); // Assuming 24fps
  };

  const handleCurrencyChange = (currencyCode: string) => {
    const currencyMap: Record<string, string> = {
      'USD': 'US',
      'INR': 'IN',
      'GBP': 'GB',
      'EUR': 'EU',
      'AUD': 'AU',
      'CAD': 'CA',
      'JPY': 'JP'
    };

    if (currencyMap[currencyCode]) {
      setSelectedCurrency(currencyCode);
      setUserCurrency(currencyMap[currencyCode]);
      // Force a recalculation to update the displayed price
      if (calculatedPrice) {
        setIsCalculating(true);
        setTimeout(() => {
          setIsCalculating(false);
        }, 500);
      }
    }
  };

  const calculatePrice = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const option = pricingOptions[serviceType][tier];
      
      // Base price
      let totalPrice = option.basePrice;
      
      // Add per-frame costs
      if (option.pricePerFrame > 0 && frames > 0) {
        totalPrice += option.pricePerFrame * frames;
      }
      
      // Apply volume discount
      if (frames > option.minimumFrames * 2) {
        const discountFactor = Math.min(
          option.maximumDiscount,
          (frames - option.minimumFrames) / (10000) * option.maximumDiscount
        );
        totalPrice = totalPrice * (1 - discountFactor);
      }
      
      // Add complexity factor based on number of shots
      if (shots > 1) {
        totalPrice *= 1 + Math.min(0.3, (shots - 1) * 0.01);
      }
      
      setCalculatedPrice(Math.round(totalPrice));
      setIsCalculating(false);
    }, 1500);
  };

  const pricingOption = pricingOptions[serviceType][tier];

  const currencyOptions = [
    { code: 'INR', name: 'Indian Rupee (₹)' },
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'JPY', name: 'Japanese Yen (¥)' }
  ];

  return (
    <section id="pricing-calculator" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Pricing Calculator" 
          subtitle="Get an instant estimate for your project based on your specific requirements"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Calculator className="mr-2 h-6 w-6 text-primary" />
                Project Specifications
              </CardTitle>
              <CardDescription className="text-base">
                Fill in your project details to generate a cost estimate
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select
                    value={serviceType}
                    onValueChange={(value) => setServiceType(value as ServiceType)}
                  >
                    <SelectTrigger id="service-type">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vfx">VFX Solutions</SelectItem>
                      <SelectItem value="creative">Creative Services</SelectItem>
                      <SelectItem value="di">Digital Intermediate (DI)</SelectItem>
                      <SelectItem value="tech">Tech Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 flex-1">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={selectedCurrency}
                    onValueChange={handleCurrencyChange}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium mb-2">Pricing Tier</div>
                <Tabs value={tier} onValueChange={(value) => setTier(value as PricingTier)} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="standard">In-house Low Cost</TabsTrigger>
                    <TabsTrigger value="premium">High Budget</TabsTrigger>
                    <TabsTrigger value="outsourced">Outsourced</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="mt-2 rounded-md bg-muted p-3">
                  <div className="font-medium text-sm text-foreground">{pricingOption.name}</div>
                  <div className="text-sm text-muted-foreground">{pricingOption.description}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Estimated delivery: <span className="text-foreground font-medium">{pricingOption.deliveryTimeInDays} days</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="frames">Number of Frames</Label>
                    <span className="text-sm text-muted-foreground">{frames} frames</span>
                  </div>
                  <Slider 
                    id="frames"
                    min={100} 
                    max={10000} 
                    step={100}
                    value={[frames]}
                    onValueChange={handleFramesChange}
                    className="my-4"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={framesDuration}
                      onChange={(e) => handleDurationChange(e.target.value)}
                      min={0}
                      step={0.01}
                    />
                    <div className="text-xs text-muted-foreground">At 24 frames per second</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shots">Number of Shots</Label>
                    <Input
                      id="shots"
                      type="number"
                      value={shots}
                      onChange={(e) => setShots(parseInt(e.target.value) || 0)}
                      min={1}
                    />
                    <div className="text-xs text-muted-foreground">Affects complexity pricing</div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button
                onClick={calculatePrice}
                className="w-full gradient-button"
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate Estimate'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Your Estimate
              </CardTitle>
              <CardDescription className="text-base">
                See a detailed breakdown of your project costs
              </CardDescription>
            </CardHeader>
            
            <CardContent className="h-[350px] flex flex-col items-center justify-center">
              {isCalculating ? (
                <div className="text-center space-y-4">
                  <div className="text-xl">Calculating your estimate...</div>
                  <Progress value={75} className="w-[250px]" />
                </div>
              ) : calculatedPrice ? (
                <div className="w-full text-center space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Estimated Cost</div>
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                      <DynamicPrice priceUSD={calculatedPrice} showCode={true} />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      For {frames} frames ({framesDuration.toFixed(1)} seconds) across {shots} shots
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowBreakdown(!showBreakdown)}
                    >
                      {showBreakdown ? 'Hide' : 'Show'} Cost Breakdown
                    </Button>
                    
                    <Button variant="default" className="w-full gradient-button">
                      <Download className="mr-2 h-4 w-4" /> Download Detailed Quote
                    </Button>
                  </div>
                  
                  {showBreakdown && (
                    <div className="mt-4 p-4 bg-muted rounded-md text-left">
                      <div className="text-sm font-medium mb-2">Cost Breakdown:</div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex justify-between">
                          <span>Base Price:</span>
                          <span><DynamicPrice priceUSD={pricingOption.basePrice} /></span>
                        </li>
                        {pricingOption.pricePerFrame > 0 && (
                          <li className="flex justify-between">
                            <span>Per-Frame Cost ({frames} @ <DynamicPrice priceUSD={pricingOption.pricePerFrame} />):</span>
                            <span><DynamicPrice priceUSD={pricingOption.pricePerFrame * frames} /></span>
                          </li>
                        )}
                        <li className="flex justify-between">
                          <span>Shot Complexity Factor:</span>
                          <span>+{Math.min(30, (shots - 1) * 1)}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Volume Discount:</span>
                          <span>
                            {frames > pricingOption.minimumFrames * 2 
                              ? `-${Math.min(
                                  pricingOption.maximumDiscount * 100,
                                  ((frames - pricingOption.minimumFrames) / 10000) * pricingOption.maximumDiscount * 100
                                ).toFixed(1)}%` 
                              : 'Not Applied'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto flex items-center justify-center">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-xl">Enter your project details</div>
                  <div className="text-muted-foreground">
                    Fill in the specifications to get an instant cost estimate
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="border-t border-border pt-4 text-sm text-muted-foreground">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5 text-primary">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  This is an estimate only. Final pricing may vary based on detailed project requirements. Contact our team for a personalized quote.
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
