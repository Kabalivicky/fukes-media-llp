
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Copy, Calculator, PieChart, FileSpreadsheet } from 'lucide-react';
import DynamicPrice from '@/components/DynamicPrice';
import { toast } from '@/hooks/use-toast';

interface EstimateResultsProps {
  calculatedPrice: number | null;
  isCalculating: boolean;
  formData: any;
  pricingOption: any;
}

const EstimateResults = ({ 
  calculatedPrice, 
  isCalculating, 
  formData, 
  pricingOption 
}: EstimateResultsProps) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showAdvancedAnalysis, setShowAdvancedAnalysis] = useState(false);
  
  const copyToClipboard = () => {
    if (!calculatedPrice) return;
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(calculatedPrice);
    
    const textToCopy = `
Project Estimate from Fuke's Media:
- Service: ${formData.serviceType.toUpperCase()}
- Tier: ${formData.tier}
- Duration: ${formData.framesDuration.toFixed(1)} seconds (${formData.frames} frames)
- Shots: ${formData.shots}
- Resolution: ${formData.resolution}
- Total Estimate: ${formattedPrice}
    `.trim();
    
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to clipboard",
      description: "Your estimate has been copied to your clipboard."
    });
  };
  
  const handleDownloadPDF = () => {
    toast({
      title: "Download Started",
      description: "Your detailed quote PDF is being generated."
    });
    
    // In a real implementation, this would generate and download a PDF
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Your detailed quote has been downloaded."
      });
    }, 2000);
  };
  
  // Calculate additional fees based on advanced options
  const calculateAdditionalFees = () => {
    let additionalAmount = 0;
    
    // Resolution multiplier
    const resolutionMultiplier = {
      "1080p": 1,
      "2k": 1.2,
      "4k": 1.5,
      "8k": 2.5,
      "custom": 1.8
    }[formData.resolution] || 1;
    
    // Complexity multiplier
    const complexityMultiplier = {
      "basic": 0.8,
      "standard": 1,
      "advanced": 1.5,
      "photorealistic": 2.2
    }[formData.complexity] || 1;
    
    // Deadline multiplier
    const deadlineMultiplier = {
      "standard": 1,
      "rush": 1.2,
      "urgent": 1.5,
      "emergency": 2
    }[formData.deadline] || 1;
    
    // Revisions multiplier
    const revisionsMultiplier = {
      "2": 1,
      "3": 1.1,
      "unlimited": 1.25
    }[formData.revisions] || 1;
    
    // Calculate based on base price for demonstration
    if (calculatedPrice) {
      // Calculate the effect of each factor
      const resolutionEffect = (resolutionMultiplier - 1) * calculatedPrice;
      const complexityEffect = (complexityMultiplier - 1) * calculatedPrice;
      const deadlineEffect = (deadlineMultiplier - 1) * calculatedPrice;
      const revisionsEffect = (revisionsMultiplier - 1) * calculatedPrice;
      
      // Additional requirements
      let requirementsEffect = 0;
      if (formData.additionalRequirements.includes('stereo')) {
        requirementsEffect += 0.4 * calculatedPrice;
      }
      if (formData.additionalRequirements.includes('hdr')) {
        requirementsEffect += 0.15 * calculatedPrice;
      }
      if (formData.additionalRequirements.includes('sourcecode')) {
        requirementsEffect += 0.3 * calculatedPrice;
      }
      
      return {
        total: calculatedPrice * resolutionMultiplier * complexityMultiplier * deadlineMultiplier * revisionsMultiplier + requirementsEffect,
        breakdown: {
          base: calculatedPrice,
          resolutionEffect,
          complexityEffect,
          deadlineEffect,
          revisionsEffect,
          requirementsEffect
        }
      };
    }
    
    return { total: 0, breakdown: {} };
  };
  
  const additionalFees = calculatedPrice ? calculateAdditionalFees() : { total: 0, breakdown: {} };
  const finalPrice = additionalFees.total;
  
  // For demonstration purposes, calculate a visual breakdown of costs
  const createCostBreakdown = () => {
    if (!calculatedPrice) return [];
    
    // Calculate percentages of different cost components
    const bd = additionalFees.breakdown as any;
    const basePercentage = (bd.base / finalPrice) * 100;
    const resolutionPercentage = (bd.resolutionEffect / finalPrice) * 100;
    const complexityPercentage = (bd.complexityEffect / finalPrice) * 100;
    const deadlinePercentage = (bd.deadlineEffect / finalPrice) * 100;
    const revisionsPercentage = (bd.revisionsEffect / finalPrice) * 100;
    const requirementsPercentage = (bd.requirementsEffect / finalPrice) * 100;
    
    return [
      { name: 'Base Cost', percentage: basePercentage, color: 'bg-primary' },
      { name: 'Resolution', percentage: resolutionPercentage, color: 'bg-blue-500' },
      { name: 'Complexity', percentage: complexityPercentage, color: 'bg-purple-500' },
      { name: 'Deadline', percentage: deadlinePercentage, color: 'bg-amber-500' },
      { name: 'Revisions', percentage: revisionsPercentage, color: 'bg-green-500' },
      { name: 'Add-ons', percentage: requirementsPercentage, color: 'bg-red-500' }
    ].filter(item => item.percentage > 0);
  };
  
  const costBreakdown = createCostBreakdown();

  return (
    <div className="h-full flex flex-col">
      {isCalculating ? (
        <div className="text-center space-y-4 h-full flex flex-col items-center justify-center">
          <div className="text-xl">Calculating your estimate...</div>
          <Progress value={75} className="w-[250px]" />
        </div>
      ) : calculatedPrice ? (
        <div className="w-full text-center space-y-6">
          <div>
            <div className="text-sm text-muted-foreground">Estimated Cost</div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              <DynamicPrice priceUSD={showAdvancedAnalysis ? finalPrice : calculatedPrice} showCode={true} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              For {formData.frames} frames ({formData.framesDuration.toFixed(1)} seconds) across {formData.shots} shots 
              {formData.resolution !== "1080p" && ` at ${formData.resolution} resolution`}
            </div>
          </div>
          
          {showAdvancedAnalysis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/40">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <PieChart className="h-4 w-4 mr-2 text-primary" />
                  Cost Distribution
                </h4>
                
                <div className="h-6 w-full rounded-full overflow-hidden flex mb-4">
                  {costBreakdown.map((item, index) => (
                    <div 
                      key={index}
                      className={`${item.color} h-full`}
                      style={{ width: `${item.percentage}%` }}
                      title={`${item.name}: ${item.percentage.toFixed(1)}%`}
                    ></div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {costBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                      <span>{item.name}: {item.percentage.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => setShowBreakdown(!showBreakdown)}
              >
                {showBreakdown ? 'Hide' : 'Show'} Cost Breakdown
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full text-xs"
                onClick={() => setShowAdvancedAnalysis(!showAdvancedAnalysis)}
              >
                {showAdvancedAnalysis ? 'Hide' : 'Show'} Advanced Analysis
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full text-xs"
                onClick={copyToClipboard}
              >
                <Copy className="mr-1 h-3 w-3" /> Copy Estimate
              </Button>
            </div>
            
            <Button variant="default" className="w-full gradient-button" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" /> Download Detailed Quote
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" className="w-1/2 text-xs">
                <FileSpreadsheet className="mr-1 h-3 w-3" /> Export as Excel
              </Button>
              
              <Button variant="outline" className="w-1/2 text-xs">
                <ExternalLink className="mr-1 h-3 w-3" /> Share Quote
              </Button>
            </div>
          </div>
          
          {showBreakdown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="bg-muted/70 border-border/40">
                <CardContent className="p-4">
                  <div className="text-sm font-medium mb-2">Cost Breakdown:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Base Price:</span>
                      <span><DynamicPrice priceUSD={pricingOption.basePrice} /></span>
                    </li>
                    {pricingOption.pricePerFrame > 0 && (
                      <li className="flex justify-between">
                        <span>Per-Frame Cost ({formData.frames} @ <DynamicPrice priceUSD={pricingOption.pricePerFrame} />):</span>
                        <span><DynamicPrice priceUSD={pricingOption.pricePerFrame * formData.frames} /></span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span>Shot Complexity Factor:</span>
                      <span>+{Math.min(30, (formData.shots - 1) * 1)}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Volume Discount:</span>
                      <span>
                        {formData.frames > pricingOption.minimumFrames * 2 
                          ? `-${Math.min(
                              pricingOption.maximumDiscount * 100,
                              ((formData.frames - pricingOption.minimumFrames) / 10000) * pricingOption.maximumDiscount * 100
                            ).toFixed(1)}%` 
                          : 'Not Applied'}
                      </span>
                    </li>
                    
                    {showAdvancedAnalysis && (
                      <>
                        <li className="border-t border-border/30 my-1 pt-1"></li>
                        {formData.resolution && formData.resolution !== "1080p" && (
                          <li className="flex justify-between">
                            <span>Resolution ({formData.resolution}):</span>
                            <span>
                              +<DynamicPrice priceUSD={(additionalFees.breakdown as any).resolutionEffect} />
                            </span>
                          </li>
                        )}
                        {formData.complexity && formData.complexity !== "standard" && (
                          <li className="flex justify-between">
                            <span>Effect Complexity ({formData.complexity}):</span>
                            <span>
                              +<DynamicPrice priceUSD={(additionalFees.breakdown as any).complexityEffect} />
                            </span>
                          </li>
                        )}
                        {formData.deadline && formData.deadline !== "standard" && (
                          <li className="flex justify-between">
                            <span>Priority Deadline ({formData.deadline}):</span>
                            <span>
                              +<DynamicPrice priceUSD={(additionalFees.breakdown as any).deadlineEffect} />
                            </span>
                          </li>
                        )}
                        {formData.additionalRequirements.length > 0 && (
                          <li className="flex justify-between">
                            <span>Additional Requirements:</span>
                            <span>
                              +<DynamicPrice priceUSD={(additionalFees.breakdown as any).requirementsEffect} />
                            </span>
                          </li>
                        )}
                        <li className="border-t border-border/30 my-1 pt-1"></li>
                        <li className="flex justify-between font-medium">
                          <span>Total Estimate:</span>
                          <span><DynamicPrice priceUSD={finalPrice} /></span>
                        </li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-4 h-full flex flex-col items-center justify-center">
          <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto flex items-center justify-center">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <div className="text-xl">Enter your project details</div>
          <div className="text-muted-foreground">
            Fill in the specifications to get an instant cost estimate
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimateResults;
