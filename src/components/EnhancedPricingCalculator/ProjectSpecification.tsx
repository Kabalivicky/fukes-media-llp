
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Calculator, ListFilter, ArrowRight } from 'lucide-react';

interface ProjectSpecificationProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const ProjectSpecification = ({ 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting,
  selectedCurrency,
  onCurrencyChange
}: ProjectSpecificationProps) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  const handleDurationChange = (value: string) => {
    const duration = parseFloat(value);
    if (!isNaN(duration)) {
      onChange('framesDuration', duration);
      onChange('frames', Math.round(duration * formData.fps));
    }
  };

  const handleFramesChange = (value: number[]) => {
    const frameCount = value[0];
    onChange('frames', frameCount);
    onChange('framesDuration', parseFloat((frameCount / formData.fps).toFixed(2)));
  };
  
  const handleFpsChange = (value: string) => {
    const fps = parseInt(value);
    if (!isNaN(fps) && fps > 0) {
      onChange('fps', fps);
      // Recalculate frames based on new fps and existing duration
      onChange('frames', Math.round(formData.framesDuration * fps));
    }
  };

  const resolutionOptions = [
    { value: "1080p", label: "HD (1920x1080)" },
    { value: "2k", label: "2K (2048x1080)" },
    { value: "4k", label: "4K (3840x2160)" },
    { value: "8k", label: "8K (7680x4320)" },
    { value: "custom", label: "Custom Resolution" }
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="service-type">Service Type</Label>
          <Select
            value={formData.serviceType}
            onValueChange={(value) => onChange('serviceType', value)}
          >
            <SelectTrigger id="service-type">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vfx">VFX Solutions</SelectItem>
              <SelectItem value="creative">Creative Services</SelectItem>
              <SelectItem value="di">Digital Intermediate (DI)</SelectItem>
              <SelectItem value="tech">Tech Innovation</SelectItem>
              <SelectItem value="full">Full Production</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 flex-1">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={selectedCurrency}
            onValueChange={onCurrencyChange}
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
        <Tabs value={formData.tier} onValueChange={(value) => onChange('tier', value)} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="standard">In-house Low Cost</TabsTrigger>
            <TabsTrigger value="premium">High Budget</TabsTrigger>
            <TabsTrigger value="outsourced">Outsourced</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-2 rounded-md bg-muted p-3">
          <div className="font-medium text-sm text-foreground">
            {formData.serviceType === 'vfx' && formData.tier === 'standard' && 'In-house Low Cost VFX'}
            {formData.serviceType === 'vfx' && formData.tier === 'premium' && 'High-Budget VFX'}
            {formData.serviceType === 'vfx' && formData.tier === 'outsourced' && 'Outsourced VFX'}
            {formData.serviceType === 'creative' && formData.tier === 'standard' && 'In-house Standard Creative'}
            {formData.serviceType === 'creative' && formData.tier === 'premium' && 'High-End Creative'}
            {formData.serviceType === 'creative' && formData.tier === 'outsourced' && 'Outsourced Creative'}
            {formData.serviceType === 'di' && formData.tier === 'standard' && 'Base Light DI'}
            {formData.serviceType === 'di' && formData.tier === 'premium' && 'DaVinci Resolve DI'}
            {formData.serviceType === 'di' && formData.tier === 'outsourced' && 'Outsourced DI'}
            {formData.serviceType === 'tech' && formData.tier === 'standard' && 'Standard Tech'}
            {formData.serviceType === 'tech' && formData.tier === 'premium' && 'Premium Tech'}
            {formData.serviceType === 'tech' && formData.tier === 'outsourced' && 'Outsourced Tech'}
            {formData.serviceType === 'full' && formData.tier === 'standard' && 'Standard Production Package'}
            {formData.serviceType === 'full' && formData.tier === 'premium' && 'Premium Production Package'}
            {formData.serviceType === 'full' && formData.tier === 'outsourced' && 'Mixed Model Production'}
          </div>
          <div className="text-sm text-muted-foreground">
            {formData.serviceType === 'vfx' && formData.tier === 'standard' && '2D/3D VFX solutions with good quality and turnaround time.'}
            {formData.serviceType === 'vfx' && formData.tier === 'premium' && 'High-end VFX with advanced techniques and senior artists for exceptional quality.'}
            {formData.serviceType === 'vfx' && formData.tier === 'outsourced' && 'Cost-effective solutions for large volume projects with good quality.'}
            {formData.serviceType === 'creative' && formData.tier === 'standard' && 'Essential creative services for projects with moderate complexity.'}
            {formData.serviceType === 'creative' && formData.tier === 'premium' && 'Advanced creative solutions with senior designers and directors.'}
            {formData.serviceType === 'creative' && formData.tier === 'outsourced' && 'Cost-effective creative services for projects with standard requirements.'}
            {formData.serviceType === 'di' && formData.tier === 'standard' && 'Color grading and finishing services using Base Light.'}
            {formData.serviceType === 'di' && formData.tier === 'premium' && 'Advanced color grading with senior colorists using DaVinci Resolve.'}
            {formData.serviceType === 'di' && formData.tier === 'outsourced' && 'Basic color correction and finishing services at a lower cost.'}
            {formData.serviceType === 'tech' && formData.tier === 'standard' && 'Basic technology integration and AI solutions for standard projects.'}
            {formData.serviceType === 'tech' && formData.tier === 'premium' && 'Advanced custom technology development and AI integration.'}
            {formData.serviceType === 'tech' && formData.tier === 'outsourced' && 'Cost-effective technology solutions using existing frameworks.'}
            {formData.serviceType === 'full' && formData.tier === 'standard' && 'End-to-end production services with standard quality and turnaround.'}
            {formData.serviceType === 'full' && formData.tier === 'premium' && 'Premium end-to-end production with senior team and cutting-edge technology.'}
            {formData.serviceType === 'full' && formData.tier === 'outsourced' && 'Hybrid model using in-house and outsourced resources for cost efficiency.'}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Estimated delivery: <span className="text-foreground font-medium">
              {formData.serviceType === 'vfx' && formData.tier === 'standard' && '14 days'}
              {formData.serviceType === 'vfx' && formData.tier === 'premium' && '21 days'}
              {formData.serviceType === 'vfx' && formData.tier === 'outsourced' && '30 days'}
              {formData.serviceType === 'creative' && formData.tier === 'standard' && '10 days'}
              {formData.serviceType === 'creative' && formData.tier === 'premium' && '18 days'}
              {formData.serviceType === 'creative' && formData.tier === 'outsourced' && '24 days'}
              {formData.serviceType === 'di' && formData.tier === 'standard' && '7 days'}
              {formData.serviceType === 'di' && formData.tier === 'premium' && '14 days'}
              {formData.serviceType === 'di' && formData.tier === 'outsourced' && '10 days'}
              {formData.serviceType === 'tech' && formData.tier === 'standard' && '21 days'}
              {formData.serviceType === 'tech' && formData.tier === 'premium' && '42 days'}
              {formData.serviceType === 'tech' && formData.tier === 'outsourced' && '30 days'}
              {formData.serviceType === 'full' && formData.tier === 'standard' && '45 days'}
              {formData.serviceType === 'full' && formData.tier === 'premium' && '60 days'}
              {formData.serviceType === 'full' && formData.tier === 'outsourced' && '75 days'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center">
            <Label htmlFor="frames">Number of Frames</Label>
            <span className="text-sm text-muted-foreground">{formData.frames} frames</span>
          </div>
          <Slider 
            id="frames"
            min={100} 
            max={10000} 
            step={100}
            value={[formData.frames]}
            onValueChange={handleFramesChange}
            className="my-4"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (seconds)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.framesDuration}
              onChange={(e) => handleDurationChange(e.target.value)}
              min={0}
              step={0.01}
            />
            <div className="text-xs text-muted-foreground">At {formData.fps} frames per second</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fps">Frame Rate</Label>
            <Select
              value={formData.fps.toString()}
              onValueChange={handleFpsChange}
            >
              <SelectTrigger id="fps">
                <SelectValue placeholder="Select FPS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24">24 fps (Film)</SelectItem>
                <SelectItem value="25">25 fps (PAL)</SelectItem>
                <SelectItem value="30">30 fps (NTSC)</SelectItem>
                <SelectItem value="60">60 fps (Gaming/Web)</SelectItem>
                <SelectItem value="120">120 fps (High Speed)</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-xs text-muted-foreground">Standard film rate is 24 fps</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shots">Number of Shots</Label>
            <Input
              id="shots"
              type="number"
              value={formData.shots}
              onChange={(e) => onChange('shots', parseInt(e.target.value) || 0)}
              min={1}
            />
            <div className="text-xs text-muted-foreground">Affects complexity pricing</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={showAdvancedOptions}
          onCheckedChange={setShowAdvancedOptions}
          id="advanced-options"
        />
        <Label htmlFor="advanced-options" className="cursor-pointer">
          Show Advanced Options
        </Label>
      </div>
      
      {showAdvancedOptions && (
        <div className="space-y-4 border border-border/60 rounded-lg p-4 bg-muted/30">
          <h4 className="font-medium flex items-center">
            <ListFilter className="h-4 w-4 mr-2" />
            Advanced Project Specifications
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resolution">Resolution</Label>
              <Select
                value={formData.resolution}
                onValueChange={(value) => onChange('resolution', value)}
              >
                <SelectTrigger id="resolution">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  {resolutionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="complexity">Effect Complexity</Label>
              <Select
                value={formData.complexity}
                onValueChange={(value) => onChange('complexity', value)}
              >
                <SelectTrigger id="complexity">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (Simple Effects)</SelectItem>
                  <SelectItem value="standard">Standard (Mixed Effects)</SelectItem>
                  <SelectItem value="advanced">Advanced (Complex Simulations)</SelectItem>
                  <SelectItem value="photorealistic">Photorealistic (Full CG)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Priority Deadline</Label>
              <Select
                value={formData.deadline}
                onValueChange={(value) => onChange('deadline', value)}
              >
                <SelectTrigger id="deadline">
                  <SelectValue placeholder="Select deadline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="rush">Rush (+20%)</SelectItem>
                  <SelectItem value="urgent">Urgent (+50%)</SelectItem>
                  <SelectItem value="emergency">Emergency (+100%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revisions">Included Revisions</Label>
              <Select
                value={formData.revisions}
                onValueChange={(value) => onChange('revisions', value)}
              >
                <SelectTrigger id="revisions">
                  <SelectValue placeholder="Select revisions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Rounds (Standard)</SelectItem>
                  <SelectItem value="3">3 Rounds (+10%)</SelectItem>
                  <SelectItem value="unlimited">Unlimited (+25%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2 col-span-1 sm:col-span-3">
              <Label htmlFor="additional">Additional Requirements (Check all that apply)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.additionalRequirements.includes('stereo')}
                    onCheckedChange={(checked) => {
                      const newReqs = checked 
                        ? [...formData.additionalRequirements, 'stereo']
                        : formData.additionalRequirements.filter((req: string) => req !== 'stereo');
                      onChange('additionalRequirements', newReqs);
                    }}
                    id="stereo"
                  />
                  <Label htmlFor="stereo" className="cursor-pointer">
                    Stereo 3D (+40%)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.additionalRequirements.includes('hdr')}
                    onCheckedChange={(checked) => {
                      const newReqs = checked 
                        ? [...formData.additionalRequirements, 'hdr']
                        : formData.additionalRequirements.filter((req: string) => req !== 'hdr');
                      onChange('additionalRequirements', newReqs);
                    }}
                    id="hdr"
                  />
                  <Label htmlFor="hdr" className="cursor-pointer">
                    HDR Mastering (+15%)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.additionalRequirements.includes('sourcecode')}
                    onCheckedChange={(checked) => {
                      const newReqs = checked 
                        ? [...formData.additionalRequirements, 'sourcecode']
                        : formData.additionalRequirements.filter((req: string) => req !== 'sourcecode');
                      onChange('additionalRequirements', newReqs);
                    }}
                    id="sourcecode"
                  />
                  <Label htmlFor="sourcecode" className="cursor-pointer">
                    Source Files (+30%)
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Button
        onClick={onSubmit}
        className="w-full gradient-button mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Calculating...' : 'Calculate Estimate'}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProjectSpecification;
