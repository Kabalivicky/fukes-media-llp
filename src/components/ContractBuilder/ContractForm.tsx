
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { FileText, ChevronRight, ChevronLeft, Save, Check } from 'lucide-react';

const ContractForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    projectType: '',
    startDate: '',
    deadlineDate: '',
    paymentTerms: '',
    revisionRounds: '2',
    ipRights: 'client',
    specialClauses: '',
    agreedToTerms: false
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call for contract generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Contract Generated",
        description: "Your contract has been created and is ready to review",
      });
    }, 2000);
  };
  
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Create Your Contract</h3>
            <span className="text-sm text-muted-foreground">{currentStep} of 3</span>
          </div>
          
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: `${(currentStep / 3) * 100}%` }} 
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Tabs value={`step-${currentStep}`} className="w-full">
            <TabsContent value="step-1" className="space-y-4 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input 
                    id="clientName"
                    value={formData.clientName}
                    onChange={e => handleChange('clientName', e.target.value)}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input 
                    id="projectName"
                    value={formData.projectName}
                    onChange={e => handleChange('projectName', e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={value => handleChange('projectType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="film">Feature Film</SelectItem>
                    <SelectItem value="series">TV Series</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="music">Music Video</SelectItem>
                    <SelectItem value="game">Video Game</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={e => handleChange('startDate', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadlineDate">Deadline</Label>
                  <Input 
                    id="deadlineDate"
                    type="date"
                    value={formData.deadlineDate}
                    onChange={e => handleChange('deadlineDate', e.target.value)}
                    required
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="step-2" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Select
                  value={formData.paymentTerms}
                  onValueChange={value => handleChange('paymentTerms', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upfront">100% Upfront</SelectItem>
                    <SelectItem value="50-50">50% Upfront, 50% on Completion</SelectItem>
                    <SelectItem value="milestone">Milestone Based</SelectItem>
                    <SelectItem value="net30">Net 30</SelectItem>
                    <SelectItem value="net60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="revisionRounds">Revision Rounds</Label>
                <Select
                  value={formData.revisionRounds}
                  onValueChange={value => handleChange('revisionRounds', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of revisions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Round</SelectItem>
                    <SelectItem value="2">2 Rounds</SelectItem>
                    <SelectItem value="3">3 Rounds</SelectItem>
                    <SelectItem value="unlimited">Unlimited Rounds (Time-boxed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ipRights">IP Rights</Label>
                <Select
                  value={formData.ipRights}
                  onValueChange={value => handleChange('ipRights', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select IP rights arrangement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Full Transfer to Client</SelectItem>
                    <SelectItem value="license">Licensed to Client</SelectItem>
                    <SelectItem value="shared">Shared Rights</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="step-3" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="specialClauses">Special Clauses or Notes</Label>
                <Textarea 
                  id="specialClauses"
                  value={formData.specialClauses}
                  onChange={e => handleChange('specialClauses', e.target.value)}
                  placeholder="Enter any special clauses or notes for the contract"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreedToTerms}
                  onCheckedChange={checked => handleChange('agreedToTerms', checked === true)}
                />
                <label 
                  htmlFor="terms" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm that all information provided is accurate and I agree to the terms of service
                </label>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg mt-4">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Contract Summary
                </h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Client:</strong> {formData.clientName || 'Not specified'}</li>
                  <li><strong>Project:</strong> {formData.projectName || 'Not specified'}</li>
                  <li><strong>Type:</strong> {formData.projectType || 'Not specified'}</li>
                  <li><strong>Duration:</strong> {formData.startDate && formData.deadlineDate ? `${formData.startDate} to ${formData.deadlineDate}` : 'Not specified'}</li>
                  <li><strong>Payment Terms:</strong> {formData.paymentTerms || 'Not specified'}</li>
                  <li><strong>Revisions:</strong> {formData.revisionRounds || 'Not specified'}</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={goToPrevStep}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <Button 
                type="button" 
                onClick={goToNextStep}
                className="flex items-center gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit"
                className="gradient-button flex items-center gap-1"
                disabled={isGenerating || !formData.agreedToTerms}
              >
                {isGenerating ? (
                  <>Generating... <Save className="h-4 w-4 animate-pulse" /></>
                ) : (
                  <>Generate Contract <Check className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContractForm;
