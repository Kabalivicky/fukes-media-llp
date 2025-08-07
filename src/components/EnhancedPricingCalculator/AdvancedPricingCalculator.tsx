
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { getUserCurrency } from '@/utils/currencyUtils';
import ProjectSpecification from './ProjectSpecification';
import EstimateResults from './EstimateResults';
import ErrorBoundary from '@/components/ErrorBoundary';

type PricingTier = 'standard' | 'premium' | 'outsourced';
type ServiceType = 'vfx' | 'creative' | 'di' | 'tech' | 'full';

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
  },
  full: {
    standard: {
      name: 'Standard Production',
      description: 'End-to-end production services with standard quality and turnaround.',
      basePrice: 150000,
      pricePerFrame: 100,
      minimumFrames: 1000,
      maximumDiscount: 0.12,
      deliveryTimeInDays: 45
    },
    premium: {
      name: 'Premium Production',
      description: 'Premium end-to-end production with senior team and cutting-edge technology.',
      basePrice: 350000,
      pricePerFrame: 300,
      minimumFrames: 1000,
      maximumDiscount: 0.08,
      deliveryTimeInDays: 60
    },
    outsourced: {
      name: 'Mixed Model',
      description: 'Hybrid model using in-house and outsourced resources for cost efficiency.',
      basePrice: 200000,
      pricePerFrame: 80,
      minimumFrames: 2000,
      maximumDiscount: 0.18,
      deliveryTimeInDays: 75
    }
  }
};

const AdvancedPricingCalculator = () => {
  const [formData, setFormData] = useState({
    serviceType: 'vfx' as ServiceType,
    tier: 'standard' as PricingTier,
    frames: 1000,
    framesDuration: 41.67, // ~1000 frames at 24fps
    fps: 24,
    shots: 10,
    resolution: '1080p',
    complexity: 'standard',
    deadline: 'standard',
    revisions: '2',
    additionalRequirements: [] as string[]
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(getUserCurrency().code);

  // Handle form field changes
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      localStorage.setItem('user_currency', currencyMap[currencyCode]);
      // Force a recalculation to update the displayed price
      if (calculatedPrice) {
        setIsCalculating(true);
        setTimeout(() => {
          setIsCalculating(false);
        }, 500);
      }
    }
  };

  // Calculate price based on form data
  const calculatePrice = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const option = pricingOptions[formData.serviceType][formData.tier];
      
      // Base price
      let totalPrice = option.basePrice;
      
      // Add per-frame costs
      if (option.pricePerFrame > 0 && formData.frames > 0) {
        totalPrice += option.pricePerFrame * formData.frames;
      }
      
      // Apply volume discount
      if (formData.frames > option.minimumFrames * 2) {
        const discountFactor = Math.min(
          option.maximumDiscount,
          (formData.frames - option.minimumFrames) / (10000) * option.maximumDiscount
        );
        totalPrice = totalPrice * (1 - discountFactor);
      }
      
      // Add complexity factor based on number of shots
      if (formData.shots > 1) {
        totalPrice *= 1 + Math.min(0.3, (formData.shots - 1) * 0.01);
      }
      
      setCalculatedPrice(Math.round(totalPrice));
      setIsCalculating(false);
    }, 1500);
  };

  const pricingOption = pricingOptions[formData.serviceType][formData.tier];

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              Project Specifications
            </CardTitle>
            <CardDescription className="text-base">
              Fill in your project details to generate a cost estimate
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <ProjectSpecification
              formData={formData}
              onChange={handleFormChange}
              onSubmit={calculatePrice}
              isSubmitting={isCalculating}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={handleCurrencyChange}
            />
          </CardContent>
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
          
          <CardContent className="h-[350px]">
            <EstimateResults
              calculatedPrice={calculatedPrice}
              isCalculating={isCalculating}
              formData={formData}
              pricingOption={pricingOption}
            />
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
    </ErrorBoundary>
  );
};

export default AdvancedPricingCalculator;
