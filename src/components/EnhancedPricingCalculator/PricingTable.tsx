import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingData {
  service: string;
  lowCost: string;
  mediumCost: string;
  highCost: string;
  pricePerShot: string;
}

const PricingTable = () => {
  const [activeTab, setActiveTab] = useState('vfx');

  const vfxServices: PricingData[] = [
    {
      service: "2D Compositing",
      lowCost: "₹25-75",
      mediumCost: "₹100-300",
      highCost: "₹40-125",
      pricePerShot: "₹1,500-₹10,000"
    },
    {
      service: "3D Compositing", 
      lowCost: "₹50-150",
      mediumCost: "₹250-600",
      highCost: "₹65-175",
      pricePerShot: "₹3,000-₹15,000"
    },
    {
      service: "Digital Matte Painting",
      lowCost: "₹15,000-₹30,000 per frame",
      mediumCost: "₹50,000-₹1,00,000 per frame", 
      highCost: "₹12,000-₹20,000 per frame",
      pricePerShot: "₹75,000-₹5,00,000"
    }
  ];

  const threeDServices: PricingData[] = [
    {
      service: "3D Modeling & Texturing",
      lowCost: "₹3,000-₹10,000 per model",
      mediumCost: "₹25,000-₹1,00,000 per model",
      highCost: "₹15,000-₹50,000 per model",
      pricePerShot: "₹25,000-₹1,00,000"
    },
    {
      service: "Animation",
      lowCost: "₹50-₹200",
      mediumCost: "₹250-₹1,000",
      highCost: "₹40-₹150",
      pricePerShot: "₹5,000-₹25,000"
    },
    {
      service: "Rigging",
      lowCost: "₹5,000-₹20,000 per character",
      mediumCost: "₹25,000-₹1,00,000 per character",
      highCost: "₹10,000-₹15,000 per character",
      pricePerShot: "₹15,000-₹75,000"
    },
    {
      service: "Matchmove",
      lowCost: "₹25-₹75",
      mediumCost: "₹150-₹400",
      highCost: "₹20-₹75",
      pricePerShot: "₹1,500-₹10,000"
    },
    {
      service: "Simulation & FX",
      lowCost: "₹125-₹500",
      mediumCost: "₹625-₹2,500",
      highCost: "₹100-₹300",
      pricePerShot: "₹7,500-₹50,000"
    },
    {
      service: "Lighting & Rendering",
      lowCost: "₹50-₹200",
      mediumCost: "₹300-₹1,000",
      highCost: "₹40-₹150",
      pricePerShot: "₹3,000-₹15,000"
    }
  ];

  const creativeServices: PricingData[] = [
    {
      service: "Color Grading",
      lowCost: "₹200-₹500 per hour",
      mediumCost: "₹800-₹2,000 per hour",
      highCost: "₹300-₹800 per hour",
      pricePerShot: "₹5,000-₹25,000"
    },
    {
      service: "Audio Post-Production",
      lowCost: "₹150-₹400 per hour",
      mediumCost: "₹600-₹1,500 per hour",
      highCost: "₹250-₹600 per hour",
      pricePerShot: "₹10,000-₹50,000"
    },
    {
      service: "Motion Graphics",
      lowCost: "₹100-₹300 per second",
      mediumCost: "₹500-₹1,200 per second",
      highCost: "₹200-₹500 per second",
      pricePerShot: "₹15,000-₹75,000"
    }
  ];

  const renderRow = (service: PricingData, index: number) => (
    <motion.tr
      key={service.service}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
    >
      <td className="py-4 px-6 font-medium">{service.service}</td>
      <td className="py-4 px-6 text-green-600 font-medium">{service.lowCost}</td>
      <td className="py-4 px-6 text-blue-600 font-medium">{service.mediumCost}</td>
      <td className="py-4 px-6 text-orange-600 font-medium">{service.highCost}</td>
      <td className="py-4 px-6 text-purple-600 font-medium">{service.pricePerShot}</td>
    </motion.tr>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Pricing & Packages
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing options tailored to your creative vision and production needs
        </p>
      </motion.div>

      <div className="mb-8 flex justify-center">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
          <Calculator className="mr-2 h-5 w-5" />
          Calculate Your Project Cost
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="vfx">VFX Services</TabsTrigger>
          <TabsTrigger value="3d">3D Department</TabsTrigger>
          <TabsTrigger value="creative">Creative Services</TabsTrigger>
        </TabsList>

        <TabsContent value="vfx">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">VFX Department</Badge>
                Visual Effects Services
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-4 px-6 text-left font-semibold">Service</th>
                      <th className="py-4 px-6 text-left font-semibold text-green-700">
                        In-House Price per Frame<br/>
                        <span className="text-sm font-normal">(Low-Cost Projects)</span>
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-blue-700">
                        In-House Price per Frame<br/>
                        <span className="text-sm font-normal">(Medium-Cost Projects)</span>
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-orange-700">
                        Outsourced Price per Frame
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-purple-700">
                        Price per Shot
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vfxServices.map((service, index) => renderRow(service, index))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3d">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">3D Department</Badge>
                3D Production Services
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-4 px-6 text-left font-semibold">Service</th>
                      <th className="py-4 px-6 text-left font-semibold text-green-700">
                        In-House Price per Frame<br/>
                        <span className="text-sm font-normal">(Low-Cost Projects)</span>
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-blue-700">
                        In-House Price per Frame<br/>
                        <span className="text-sm font-normal">(Medium-Cost Projects)</span>
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-orange-700">
                        Outsourced Price per Frame
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-purple-700">
                        Price per Shot
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {threeDServices.map((service, index) => renderRow(service, index))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creative">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">Creative Services</Badge>
                Post-Production & Creative
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-4 px-6 text-left font-semibold">Service</th>
                      <th className="py-4 px-6 text-left font-semibold text-green-700">
                        In-House Price per Frame<br/>
                        <span className="text-sm font-normal">(Low-Cost Projects)</span>
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-blue-700">
                        In-House Price per Frame<br/>
                        <span className="text-sm font-normal">(Medium-Cost Projects)</span>
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-orange-700">
                        Outsourced Price per Frame
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-purple-700">
                        Price per Shot
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {creativeServices.map((service, index) => renderRow(service, index))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-8"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Download className="mr-2 h-4 w-4" />
            Download Rate Card
          </Button>
          <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
            <FileText className="mr-2 h-4 w-4" />
            Request Custom Quote
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingTable;