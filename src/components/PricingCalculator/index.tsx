import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calculator, Download, Check, Clock, Sparkles } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import DynamicPrice from '@/components/DynamicPrice';
import { getUserCurrency, setUserCurrency } from '@/utils/currencyUtils';
import { toast } from '@/hooks/use-toast';

// Types
type PricingTier = 'standard' | 'premium' | 'outsourced';
type ServiceType = 'vfx' | 'creative' | 'di' | 'tech';
type DeliverySpeed = 'standard' | 'expedited' | 'rush';
type Resolution = 'hd' | '2k' | '4k' | '8k';
type ComplexityLevel = 'low' | 'medium' | 'high' | 'very-high';

interface PricingOption {
  name: string;
  description: string;
  basePrice: number;
  pricePerFrame: number;
  minimumFrames: number;
  maximumDiscount: number;
  deliveryTimeInDays: number;
}

interface EnhancedOptions {
  resolution: Resolution;
  deliverySpeed: DeliverySpeed;
  complexity: ComplexityLevel;
  revisions: number;
  aiIntegration: boolean;
  formats: string[];
  includes3D: boolean;
  includesMattePainting: boolean;
  includesAnimation: boolean;
}

interface PricingCalculatorProps {
  enhanced?: boolean;
}

// Pricing data
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

const formatOptions = [
  { label: 'ProRes 4444', value: 'prores-4444' },
  { label: 'ProRes 422 HQ', value: 'prores-422-hq' },
  { label: 'DNxHR HQX', value: 'dnxhr-hqx' },
  { label: 'H.264', value: 'h264' },
  { label: 'H.265/HEVC', value: 'h265' },
  { label: 'EXR Sequence', value: 'exr' }
];

const currencyOptions = [
  { code: 'INR', name: 'Indian Rupee (₹)' },
  { code: 'USD', name: 'US Dollar ($)' },
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'GBP', name: 'British Pound (£)' },
  { code: 'AUD', name: 'Australian Dollar (A$)' },
  { code: 'CAD', name: 'Canadian Dollar (C$)' },
  { code: 'JPY', name: 'Japanese Yen (¥)' }
];

const PricingCalculator = ({ enhanced = false }: PricingCalculatorProps) => {
  const [serviceType, setServiceType] = useState<ServiceType>('vfx');
  const [tier, setTier] = useState<PricingTier>('standard');
  const [frames, setFrames] = useState(1000);
  const [framesDuration, setFramesDuration] = useState(41.67);
  const [fps, setFps] = useState(24);
  const [shots, setShots] = useState(10);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(getUserCurrency().code);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<Date | null>(null);
  
  const [enhancedOptions, setEnhancedOptions] = useState<EnhancedOptions>({
    resolution: '2k',
    deliverySpeed: 'standard',
    complexity: 'medium',
    revisions: 2,
    aiIntegration: false,
    formats: ['prores-422-hq'],
    includes3D: false,
    includesMattePainting: false,
    includesAnimation: false
  });

  const handleDurationChange = (value: string) => {
    const duration = parseFloat(value);
    if (!isNaN(duration)) {
      setFramesDuration(duration);
      setFrames(Math.round(duration * fps));
    }
  };

  const handleFramesChange = (value: number[]) => {
    const frameCount = value[0];
    setFrames(frameCount);
    setFramesDuration(parseFloat((frameCount / fps).toFixed(2)));
  };

  const handleCurrencyChange = (currencyCode: string) => {
    const currencyMap: Record<string, string> = {
      'USD': 'US', 'INR': 'IN', 'GBP': 'GB', 'EUR': 'EU',
      'AUD': 'AU', 'CAD': 'CA', 'JPY': 'JP'
    };
    if (currencyMap[currencyCode]) {
      setSelectedCurrency(currencyCode);
      setUserCurrency(currencyMap[currencyCode]);
      if (calculatedPrice) {
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 500);
      }
    }
  };

  const updateEnhancedOption = <K extends keyof EnhancedOptions>(key: K, value: EnhancedOptions[K]) => {
    setEnhancedOptions(prev => ({ ...prev, [key]: value }));
  };

  const toggleFormat = (format: string) => {
    setEnhancedOptions(prev => ({
      ...prev,
      formats: prev.formats.includes(format)
        ? prev.formats.filter(f => f !== format)
        : [...prev.formats, format]
    }));
  };

  const calculatePrice = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const option = pricingOptions[serviceType][tier];
      let totalPrice = option.basePrice;
      
      // Per-frame costs
      if (option.pricePerFrame > 0 && frames > 0) {
        totalPrice += option.pricePerFrame * frames;
      }
      
      // Enhanced mode multipliers
      if (enhanced) {
        const resolutionFactors: Record<Resolution, number> = { 'hd': 1, '2k': 1.25, '4k': 1.5, '8k': 2 };
        const deliveryFactors: Record<DeliverySpeed, number> = { 'standard': 1, 'expedited': 1.25, 'rush': 1.5 };
        const complexityFactors: Record<ComplexityLevel, number> = { 'low': 0.85, 'medium': 1, 'high': 1.3, 'very-high': 1.5 };
        
        totalPrice *= resolutionFactors[enhancedOptions.resolution];
        totalPrice *= deliveryFactors[enhancedOptions.deliverySpeed];
        totalPrice *= complexityFactors[enhancedOptions.complexity];
        
        if (enhancedOptions.includes3D) totalPrice *= 1.2;
        if (enhancedOptions.includesMattePainting) totalPrice *= 1.15;
        if (enhancedOptions.includesAnimation) totalPrice *= 1.25;
        if (enhancedOptions.aiIntegration) totalPrice *= 1.1;
        
        const formatFactor = 1 + (Math.min(enhancedOptions.formats.length - 1, 3) * 0.05);
        totalPrice *= formatFactor;
        
        const revisionFactor = 1 + ((enhancedOptions.revisions - 2) * 0.1);
        totalPrice *= Math.max(revisionFactor, 1);
      }
      
      // Volume discount
      if (frames > option.minimumFrames * 2) {
        const discountFactor = Math.min(
          option.maximumDiscount,
          (frames - option.minimumFrames) / 10000 * option.maximumDiscount
        );
        totalPrice *= (1 - discountFactor);
      }
      
      // Shot complexity
      if (shots > 1) {
        totalPrice *= 1 + Math.min(0.3, (shots - 1) * 0.01);
      }
      
      // Delivery date calculation (enhanced mode)
      if (enhanced) {
        let deliveryDays = option.deliveryTimeInDays;
        if (enhancedOptions.deliverySpeed === 'expedited') deliveryDays = Math.ceil(deliveryDays * 0.7);
        else if (enhancedOptions.deliverySpeed === 'rush') deliveryDays = Math.ceil(deliveryDays * 0.5);
        
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
        setEstimatedDeliveryDate(deliveryDate);
      }
      
      setCalculatedPrice(Math.round(totalPrice));
      setIsCalculating(false);
    }, 1500);
  };

  const shareQuote = () => {
    if (!calculatedPrice) return;
    navigator.clipboard.writeText(
      `Fuke's Media VFX Quote: ${calculatedPrice} ${selectedCurrency} for ${frames} frames across ${shots} shots.`
    ).then(() => {
      toast({ title: "Quote copied to clipboard", description: "You can now share it with your team" });
    });
  };

  const pricingOption = pricingOptions[serviceType][tier];

  return (
    <section id="pricing-calculator" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title={enhanced ? "Advanced Pricing Calculator" : "Pricing Calculator"}
          subtitle="Get an instant estimate for your project based on your specific requirements"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Specifications Card */}
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
                  <Select value={serviceType} onValueChange={(v) => setServiceType(v as ServiceType)}>
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
                  <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>{currency.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium mb-2">Pricing Tier</div>
                <Tabs value={tier} onValueChange={(v) => setTier(v as PricingTier)} className="w-full">
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
                  <Slider id="frames" min={100} max={10000} step={100} value={[frames]} onValueChange={handleFramesChange} className="my-4" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input id="duration" type="number" value={framesDuration} onChange={(e) => handleDurationChange(e.target.value)} min={0} step={0.01} />
                    <div className="text-xs text-muted-foreground">At {fps} frames per second</div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shots">Number of Shots</Label>
                    <Input id="shots" type="number" value={shots} onChange={(e) => setShots(parseInt(e.target.value) || 0)} min={1} />
                    <div className="text-xs text-muted-foreground">Affects complexity pricing</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Mode Options */}
              {enhanced && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Advanced Options
                    </Label>
                    <Switch checked={showAdvancedOptions} onCheckedChange={setShowAdvancedOptions} />
                  </div>
                  
                  {showAdvancedOptions && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Resolution</Label>
                          <Select value={enhancedOptions.resolution} onValueChange={(v) => updateEnhancedOption('resolution', v as Resolution)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hd">HD (1080p)</SelectItem>
                              <SelectItem value="2k">2K</SelectItem>
                              <SelectItem value="4k">4K UHD</SelectItem>
                              <SelectItem value="8k">8K</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Delivery Speed</Label>
                          <Select value={enhancedOptions.deliverySpeed} onValueChange={(v) => updateEnhancedOption('deliverySpeed', v as DeliverySpeed)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="expedited">Expedited (+25%)</SelectItem>
                              <SelectItem value="rush">Rush (+50%)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Complexity Level</Label>
                        <Select value={enhancedOptions.complexity} onValueChange={(v) => updateEnhancedOption('complexity', v as ComplexityLevel)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (-15%)</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High (+30%)</SelectItem>
                            <SelectItem value="very-high">Very High (+50%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Additional Services</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={enhancedOptions.includes3D} onCheckedChange={(v) => updateEnhancedOption('includes3D', !!v)} />
                            <label className="text-sm">3D Elements (+20%)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={enhancedOptions.includesMattePainting} onCheckedChange={(v) => updateEnhancedOption('includesMattePainting', !!v)} />
                            <label className="text-sm">Matte Painting (+15%)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={enhancedOptions.includesAnimation} onCheckedChange={(v) => updateEnhancedOption('includesAnimation', !!v)} />
                            <label className="text-sm">Animation (+25%)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox checked={enhancedOptions.aiIntegration} onCheckedChange={(v) => updateEnhancedOption('aiIntegration', !!v)} />
                            <label className="text-sm">AI Integration (+10%)</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Output Formats</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              {enhancedOptions.formats.length} format(s) selected
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56">
                            <div className="space-y-2">
                              {formatOptions.map((format) => (
                                <div key={format.value} className="flex items-center space-x-2">
                                  <Checkbox checked={enhancedOptions.formats.includes(format.value)} onCheckedChange={() => toggleFormat(format.value)} />
                                  <label className="text-sm">{format.label}</label>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button onClick={calculatePrice} className="w-full gradient-button" disabled={isCalculating}>
                {isCalculating ? 'Calculating...' : 'Calculate Estimate'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Results Card */}
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Your Estimate</CardTitle>
              <CardDescription className="text-base">See a detailed breakdown of your project costs</CardDescription>
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
                    {enhanced && estimatedDeliveryDate && (
                      <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Estimated delivery: {estimatedDeliveryDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full" onClick={() => setShowBreakdown(!showBreakdown)}>
                      {showBreakdown ? 'Hide' : 'Show'} Cost Breakdown
                    </Button>
                    <Button variant="default" className="w-full gradient-button">
                      <Download className="mr-2 h-4 w-4" /> Download Detailed Quote
                    </Button>
                    {enhanced && (
                      <Button variant="secondary" className="w-full" onClick={shareQuote}>
                        Share Quote
                      </Button>
                    )}
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
                            <span>Per-Frame Cost ({frames} frames):</span>
                            <span><DynamicPrice priceUSD={pricingOption.pricePerFrame * frames} /></span>
                          </li>
                        )}
                        <li className="flex justify-between">
                          <span>Shot Complexity Factor:</span>
                          <span>+{Math.min(30, (shots - 1) * 1)}%</span>
                        </li>
                        {enhanced && enhancedOptions.includes3D && (
                          <li className="flex justify-between text-primary">
                            <span>3D Elements:</span><span>+20%</span>
                          </li>
                        )}
                        {enhanced && enhancedOptions.includesAnimation && (
                          <li className="flex justify-between text-primary">
                            <span>Animation:</span><span>+25%</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Check className="h-12 w-12 text-muted-foreground/50" />
                    <div className="text-muted-foreground">Fill in the project specifications and click "Calculate Estimate"</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
