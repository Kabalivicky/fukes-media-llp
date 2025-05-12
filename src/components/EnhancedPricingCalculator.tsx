import { useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Check, AlertCircle, Download, Calculator, ListFilter, Clock, Calendar, FileCode, Sparkles, HelpCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import DynamicPrice from '@/components/DynamicPrice';
import { getUserCurrency, setUserCurrency, currencies } from '@/utils/currencyUtils';
import { toast } from '@/hooks/use-toast';

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

// Enhanced pricing options
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

// Format options for output
const formatOptions = [
  { label: 'ProRes 4444', value: 'prores-4444' },
  { label: 'ProRes 422 HQ', value: 'prores-422-hq' },
  { label: 'DNxHR HQX', value: 'dnxhr-hqx' },
  { label: 'DNxHR SQ', value: 'dnxhr-sq' },
  { label: 'H.264', value: 'h264' },
  { label: 'H.265/HEVC', value: 'h265' },
  { label: 'Uncompressed EXR', value: 'exr' },
  { label: 'TIFF Sequence', value: 'tiff' },
  { label: 'DPX Sequence', value: 'dpx' }
];

const EnhancedPricingCalculator = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('vfx');
  const [tier, setTier] = useState<PricingTier>('standard');
  const [frames, setFrames] = useState(1000);
  const [framesDuration, setFramesDuration] = useState(41.67); // ~1000 frames at 24fps
  const [fps, setFps] = useState(24);
  const [shots, setShots] = useState(10);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(getUserCurrency().code);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
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
  
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<Date | null>(null);
  const [pricingFactors, setPricingFactors] = useState<Record<string, number>>({});
  const [quotePdf, setQuotePdf] = useState<string | null>(null);
  
  // Update frames when duration or FPS changes
  const handleDurationChange = (value: string) => {
    const duration = parseFloat(value);
    if (!isNaN(duration)) {
      setFramesDuration(duration);
      setFrames(Math.round(duration * fps));
    }
  };
  
  // Update duration when frames change
  const handleFramesChange = (value: number[]) => {
    const frameCount = value[0];
    setFrames(frameCount);
    setFramesDuration(parseFloat((frameCount / fps).toFixed(2)));
  };
  
  // Update frames when FPS changes
  const handleFpsChange = (value: string) => {
    const fpsValue = parseInt(value);
    if (!isNaN(fpsValue) && fpsValue > 0) {
      setFps(fpsValue);
      setFrames(Math.round(framesDuration * fpsValue));
    }
  };
  
  // Handle currency change
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
  
  // Update enhanced options
  const updateEnhancedOption = <K extends keyof EnhancedOptions>(key: K, value: EnhancedOptions[K]) => {
    setEnhancedOptions(prev => ({ ...prev, [key]: value }));
  };
  
  // Toggle format selection
  const toggleFormat = (format: string) => {
    setEnhancedOptions(prev => {
      const currentFormats = [...prev.formats];
      if (currentFormats.includes(format)) {
        return { ...prev, formats: currentFormats.filter(f => f !== format) };
      } else {
        return { ...prev, formats: [...currentFormats, format] };
      }
    });
  };
  
  // Calculate price
  const calculatePrice = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const option = pricingOptions[serviceType][tier];
      const factors: Record<string, number> = {};
      
      // Base price
      let totalPrice = option.basePrice;
      factors['basePrice'] = option.basePrice;
      
      // Add per-frame costs
      if (option.pricePerFrame > 0 && frames > 0) {
        const framePrice = option.pricePerFrame * frames;
        totalPrice += framePrice;
        factors['perFramePrice'] = framePrice;
      }
      
      // Resolution factor
      const resolutionFactors: Record<Resolution, number> = {
        'hd': 1,
        '2k': 1.25,
        '4k': 1.5,
        '8k': 2
      };
      const resolutionFactor = resolutionFactors[enhancedOptions.resolution];
      totalPrice *= resolutionFactor;
      factors['resolutionFactor'] = resolutionFactor;
      
      // Delivery speed factor
      const deliveryFactors: Record<DeliverySpeed, number> = {
        'standard': 1,
        'expedited': 1.25,
        'rush': 1.5
      };
      const deliveryFactor = deliveryFactors[enhancedOptions.deliverySpeed];
      totalPrice *= deliveryFactor;
      factors['deliveryFactor'] = deliveryFactor;
      
      // Complexity factor
      const complexityFactors: Record<ComplexityLevel, number> = {
        'low': 0.85,
        'medium': 1,
        'high': 1.3,
        'very-high': 1.5
      };
      const complexityFactor = complexityFactors[enhancedOptions.complexity];
      totalPrice *= complexityFactor;
      factors['complexityFactor'] = complexityFactor;
      
      // Additional features
      if (enhancedOptions.includes3D) {
        totalPrice *= 1.2;
        factors['3dFactor'] = 1.2;
      }
      
      if (enhancedOptions.includesMattePainting) {
        totalPrice *= 1.15;
        factors['mattePaintingFactor'] = 1.15;
      }
      
      if (enhancedOptions.includesAnimation) {
        totalPrice *= 1.25;
        factors['animationFactor'] = 1.25;
      }
      
      // AI integration
      if (enhancedOptions.aiIntegration) {
        totalPrice *= 1.1;
        factors['aiFactor'] = 1.1;
      }
      
      // Format factor (more formats = more work)
      const formatFactor = 1 + (Math.min(enhancedOptions.formats.length - 1, 3) * 0.05);
      totalPrice *= formatFactor;
      factors['formatFactor'] = formatFactor;
      
      // Revision factor
      const revisionFactor = 1 + ((enhancedOptions.revisions - 2) * 0.1);
      totalPrice *= Math.max(revisionFactor, 1);
      factors['revisionFactor'] = Math.max(revisionFactor, 1);
      
      // Apply volume discount
      if (frames > option.minimumFrames * 2) {
        const discountFactor = Math.min(
          option.maximumDiscount,
          (frames - option.minimumFrames) / (10000) * option.maximumDiscount
        );
        totalPrice = totalPrice * (1 - discountFactor);
        factors['volumeDiscountFactor'] = (1 - discountFactor);
      }
      
      // Add complexity factor based on number of shots
      if (shots > 1) {
        const shotFactor = 1 + Math.min(0.3, (shots - 1) * 0.01);
        totalPrice *= shotFactor;
        factors['shotsFactor'] = shotFactor;
      }
      
      // Calculate estimated delivery date
      let deliveryDays = option.deliveryTimeInDays;
      
      // Adjust delivery time based on speed option
      if (enhancedOptions.deliverySpeed === 'expedited') {
        deliveryDays = Math.ceil(deliveryDays * 0.7);
      } else if (enhancedOptions.deliverySpeed === 'rush') {
        deliveryDays = Math.ceil(deliveryDays * 0.5);
      }
      
      // Adjust for complexity
      if (enhancedOptions.complexity === 'high') {
        deliveryDays = Math.ceil(deliveryDays * 1.2);
      } else if (enhancedOptions.complexity === 'very-high') {
        deliveryDays = Math.ceil(deliveryDays * 1.4);
      }
      
      // Adjust for frames/shots
      const frameFactor = Math.max(1, frames / 1000);
      const shotsFactor = Math.max(1, shots / 10);
      deliveryDays = Math.ceil(deliveryDays * Math.max(frameFactor, shotsFactor));
      
      // Calculate delivery date
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + deliveryDays);
      
      setEstimatedDeliveryDate(deliveryDate);
      setPricingFactors(factors);
      setCalculatedPrice(Math.round(totalPrice));
      setIsCalculating(false);
      
      // Simulate PDF generation
      setQuotePdf('quote_' + Date.now() + '.pdf');
    }, 1500);
  };

  const shareQuote = () => {
    if (!calculatedPrice) return;
    
    // Simulate sharing functionality
    navigator.clipboard.writeText(`Fuke's Media VFX Quote: ${calculatedPrice} ${selectedCurrency} for ${frames} frames across ${shots} shots.`)
      .then(() => {
        toast({
          title: "Quote copied to clipboard",
          description: "You can now share it with your team or clients",
        });
      })
      .catch((err) => {
        console.error('Failed to copy quote: ', err);
        toast({
          title: "Failed to copy quote",
          description: "Please try again or download the PDF",
          variant: "destructive"
        });
      });
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
        <SectionTitle 
          title="Advanced Pricing Calculator" 
          subtitle="Get a detailed estimate for your project based on comprehensive specifications"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Calculator className="mr-2 h-6 w-6 text-primary" />
                Project Specifications
              </CardTitle>
              <CardDescription className="text-base">
                Fill in your project details to generate a detailed cost estimate
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
                    Standard delivery: <span className="text-foreground font-medium">{pricingOption.deliveryTimeInDays} days</span>
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
                
                <div className="grid grid-cols-3 gap-4">
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
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fps">Frame Rate (FPS)</Label>
                    <Input
                      id="fps"
                      type="number"
                      value={fps}
                      onChange={(e) => handleFpsChange(e.target.value)}
                      min={1}
                    />
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
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/30">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center justify-center"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                >
                  <ListFilter className="h-4 w-4 mr-2" />
                  {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </Button>
                
                {showAdvancedOptions && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-3">
                      <Label>Output Resolution</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['hd', '2k', '4k', '8k'] as Resolution[]).map((res) => (
                          <Button
                            key={res}
                            type="button"
                            variant={enhancedOptions.resolution === res ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => updateEnhancedOption('resolution', res)}
                          >
                            {res.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Delivery Speed</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['standard', 'expedited', 'rush'] as DeliverySpeed[]).map((speed) => (
                          <Button
                            key={speed}
                            type="button"
                            variant={enhancedOptions.deliverySpeed === speed ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => updateEnhancedOption('deliverySpeed', speed)}
                          >
                            {speed.charAt(0).toUpperCase() + speed.slice(1)}
                            {speed === 'expedited' && 
                              <Badge className="ml-1 bg-amber-500">+25%</Badge>
                            }
                            {speed === 'rush' && 
                              <Badge className="ml-1 bg-red-500">+50%</Badge>
                            }
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Project Complexity</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['low', 'medium', 'high', 'very-high'] as ComplexityLevel[]).map((complexity) => (
                          <Button
                            key={complexity}
                            type="button"
                            variant={enhancedOptions.complexity === complexity ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => updateEnhancedOption('complexity', complexity)}
                          >
                            {complexity.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Revision Rounds</Label>
                        <span className="text-sm text-muted-foreground">{enhancedOptions.revisions}</span>
                      </div>
                      <Slider 
                        min={1} 
                        max={5} 
                        step={1}
                        value={[enhancedOptions.revisions]}
                        onValueChange={([value]) => updateEnhancedOption('revisions', value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 round</span>
                        <span>5 rounds</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Output Formats</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {formatOptions.slice(0, 6).map((format) => (
                          <div key={format.value} className="flex items-center space-x-2">
                            <Checkbox 
                              id={format.value}
                              checked={enhancedOptions.formats.includes(format.value)}
                              onCheckedChange={() => toggleFormat(format.value)}
                            />
                            <label 
                              htmlFor={format.value}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {format.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Additional Requirements</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <Label htmlFor="3d" className="font-normal">
                            Includes 3D Elements
                          </Label>
                          <Switch 
                            id="3d"
                            checked={enhancedOptions.includes3D}
                            onCheckedChange={(checked) => updateEnhancedOption('includes3D', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <Label htmlFor="matte" className="font-normal">
                            Matte Painting
                          </Label>
                          <Switch 
                            id="matte"
                            checked={enhancedOptions.includesMattePainting}
                            onCheckedChange={(checked) => updateEnhancedOption('includesMattePainting', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <Label htmlFor="animation" className="font-normal">
                            Character Animation
                          </Label>
                          <Switch 
                            id="animation"
                            checked={enhancedOptions.includesAnimation}
                            onCheckedChange={(checked) => updateEnhancedOption('includesAnimation', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <Label htmlFor="ai" className="font-normal">
                            AI Integration
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" className="h-4 w-4 p-0 ml-2 text-muted-foreground">
                                  <HelpCircle className="h-3 w-3" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent side="top" className="w-80 text-sm">
                                Leverage our AI tools for faster iteration cycles and enhanced creative outcomes. This option utilizes neural networks for certain tasks like rotoscoping, clean-up, and some simulations.
                              </PopoverContent>
                            </Popover>
                          </Label>
                          <Switch 
                            id="ai"
                            checked={enhancedOptions.aiIntegration}
                            onCheckedChange={(checked) => updateEnhancedOption('aiIntegration', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
            
            <CardContent className="h-[500px] flex flex-col items-center justify-center overflow-y-auto">
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
                  
                  {estimatedDeliveryDate && (
                    <div className="flex flex-col items-center bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center text-primary">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Estimated Delivery Date</span>
                      </div>
                      <div className="text-xl font-semibold mt-1">
                        {estimatedDeliveryDate.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Based on your project specifications and selected delivery speed
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowBreakdown(!showBreakdown)}
                    >
                      {showBreakdown ? 'Hide' : 'Show'} Cost Breakdown
                    </Button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button 
                        variant="default" 
                        className="w-full gradient-button"
                        onClick={() => {
                          toast({
                            title: "Quote Generated",
                            description: "Your detailed quote has been sent to your email",
                          });
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" /> Download Quote
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={shareQuote}
                      >
                        <Sparkles className="mr-2 h-4 w-4" /> Share Quote
                      </Button>
                    </div>
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
                        
                        {/* Additional pricing factors would be listed here */}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-xl font-medium">Enter your project details</div>
                  <div className="text-muted-foreground">
                    Fill in the form and click "Calculate Estimate" to see your pricing
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

export default EnhancedPricingCalculator;
