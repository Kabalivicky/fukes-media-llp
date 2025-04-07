
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Download, Calendar, Users, DollarSign, BarChart3 } from 'lucide-react';

// Sample data for charts
const marketGrowthData = [
  { year: '2022', value: 210 },
  { year: '2023', value: 245 },
  { year: '2024', value: 290 },
  { year: '2025', value: 345 },
  { year: '2026', value: 405 },
  { year: '2027', value: 480 },
];

const revenueProjectionData = [
  { month: 'Jan', projected: 120, actual: 130 },
  { month: 'Feb', projected: 145, actual: 139 },
  { month: 'Mar', projected: 160, actual: 158 },
  { month: 'Apr', projected: 170, actual: 180 },
  { month: 'May', projected: 190, actual: 200 },
  { month: 'Jun', projected: 210, actual: 220 },
  { month: 'Jul', projected: 220, actual: 210 },
  { month: 'Aug', projected: 240, actual: 250 },
  { month: 'Sep', projected: 250, actual: 260 },
  { month: 'Oct', projected: 270, actual: 280 },
  { month: 'Nov', projected: 290, projected2: 300 },
  { month: 'Dec', projected: 310, projected2: 330 },
];

const serviceSplitData = [
  { name: 'VFX Solutions', value: 40 },
  { name: 'Creative Services', value: 30 },
  { name: 'Digital Intermediate', value: 20 },
  { name: 'Tech Innovation', value: 10 },
];

const COLORS = ['#8B5CF6', '#EC4899', '#0EA5E9', '#10B981'];

const companyMetrics = [
  {
    title: 'Projected Annual Revenue',
    value: '₹3.2 Cr',
    change: '+28%',
    trend: 'up',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    title: 'Projected Market Growth',
    value: '18%',
    change: '+3.5%',
    trend: 'up',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    title: 'Active Clients',
    value: '45+',
    change: '+12',
    trend: 'up',
    icon: <Users className="h-5 w-5" />
  },
  {
    title: 'Completed Projects',
    value: '120+',
    change: '+35',
    trend: 'up',
    icon: <BarChart3 className="h-5 w-5" />
  },
];

const InvestorsSection = () => {
  return (
    <section id="investors" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Investor Relations" 
          subtitle="Information and opportunities for investors interested in Fuke's Media LLP"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {companyMetrics.map((metric, index) => (
            <Card key={index} className="border border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-muted-foreground text-sm">{metric.title}</div>
                  <div className="bg-primary/20 text-primary p-2 rounded-full">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold">{metric.value}</div>
                <div className={`text-sm mt-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last year
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mb-12">
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Company Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">About Fuke's Media LLP</h4>
                  <p className="text-muted-foreground mb-4">
                    Fuke's Media LLP is an innovative, AI-driven VFX and creative services company poised to revolutionize the digital media landscape. Founded by a team of industry veterans, we combine cutting-edge technology with creative excellence to deliver exceptional visual experiences.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our company is strategically positioned to capitalize on the rapidly growing global VFX market, which is expected to reach $33.9 billion by 2027, growing at a CAGR of 12.7%.
                  </p>
                  <p className="text-muted-foreground">
                    With a lean operational model, innovative AI-enhanced workflows, and a flexible talent engagement approach, Fuke's Media offers a compelling investment opportunity with strong growth potential.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Market Growth Projections</h4>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={marketGrowthData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                        <YAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(17, 17, 17, 0.9)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            borderRadius: '6px'
                          }} 
                        />
                        <Bar 
                          dataKey="value" 
                          fill="rgba(139, 92, 246, 0.8)" 
                          name="Market Size (₹ Lakhs)" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    Global VFX Market Size Projection (₹ Lakhs)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <Tabs defaultValue="financials" className="w-full">
            <TabsList className="grid w-full md:w-fit mx-auto grid-cols-1 md:grid-cols-3 gap-2">
              <TabsTrigger value="financials">
                Financial Projections
              </TabsTrigger>
              <TabsTrigger value="investments">
                Investment Opportunities
              </TabsTrigger>
              <TabsTrigger value="reports">
                Reports & Presentations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="financials" className="mt-8">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Financial Projections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Revenue Projections</h4>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={revenueProjectionData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                            <YAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(17, 17, 17, 0.9)', 
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '6px'
                              }} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="projected" 
                              stroke="#EC4899" 
                              strokeWidth={2} 
                              dot={{ r: 4 }} 
                              activeDot={{ r: 6 }} 
                              name="Projected Revenue" 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="#8B5CF6" 
                              strokeWidth={2} 
                              dot={{ r: 4 }} 
                              activeDot={{ r: 6 }} 
                              name="Actual Revenue" 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="projected2" 
                              stroke="#8B5CF6" 
                              strokeWidth={2} 
                              strokeDasharray="5 5"
                              dot={{ r: 4 }} 
                              activeDot={{ r: 6 }} 
                              name="Projected (Remaining)" 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center text-sm text-muted-foreground mt-2">
                        Monthly Revenue Projections (₹ Lakhs)
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Service Revenue Distribution</h4>
                      <div className="h-72 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={serviceSplitData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {serviceSplitData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(17, 17, 17, 0.9)', 
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '6px'
                              }} 
                              formatter={(value) => [`${value}%`, 'Revenue Share']}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center text-sm text-muted-foreground mt-2">
                        Revenue Distribution by Service
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Detailed Financial Projections
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="investments" className="mt-8">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Investment Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Current Fundraising Round</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Round Type:</span>
                          <span className="font-medium">Seed</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Target Amount:</span>
                          <span className="font-medium">₹2.5 Crore</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Minimum Investment:</span>
                          <span className="font-medium">₹25 Lakhs</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Pre-money Valuation:</span>
                          <span className="font-medium">₹10 Crore</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Equity Offered:</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Use of Funds:</span>
                          <span className="font-medium">Expansion, Technology, Marketing</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Investment Highlights</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Experienced founding team with 40+ years of combined industry experience</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Proprietary AI-enhanced production pipeline for faster delivery and higher margins</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Flexible talent model combining in-house expertise with global freelancer network</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Strategic partnerships with major production houses and streaming platforms</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Targeting high-growth segments in digital media, AR/VR, and entertainment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Clear path to profitability within 24 months and 5-year exit strategy</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6 space-x-4">
                    <Button variant="default" className="gradient-button">
                      Request Investor Presentation
                    </Button>
                    <Button variant="outline">
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-8">
              <Card className="border border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Reports & Presentations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Investor Pitch Deck', date: 'October 2023', icon: <Download /> },
                      { title: 'Market Analysis Report', date: 'September 2023', icon: <BarChart3 /> },
                      { title: 'Financial Projections', date: 'October 2023', icon: <DollarSign /> },
                      { title: 'Company Overview', date: 'August 2023', icon: <Users /> },
                      { title: 'Strategic Growth Plan', date: 'October 2023', icon: <TrendingUp /> },
                      { title: 'Upcoming Webinar', date: 'November 15, 2023', icon: <Calendar /> },
                    ].map((item, index) => (
                      <Card key={index} className="border border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary/20 text-primary p-3 rounded-full">
                              {item.icon}
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{item.date}</p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="text-center mt-6">
                    <Button variant="outline">
                      View All Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center mt-12">
          <Button variant="default" size="lg" className="gradient-button">
            Contact Our Investor Relations Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;
