import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOHelmet from '@/components/SEOHelmet';
import SectionWrapper from '@/components/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2, MapPin, Globe, Users, Calendar, Briefcase,
  Star, CheckCircle, ArrowRight, ExternalLink, Mail,
  Linkedin, Twitter, Instagram, Clock, DollarSign, Loader2
} from 'lucide-react';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';
import { format } from 'date-fns';

const CompanyProfile = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch company details
  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['company', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Fetch company jobs
  const { data: jobs } = useQuery({
    queryKey: ['company-jobs', company?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('company_id', company?.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!company?.id,
  });

  if (isLoadingCompany) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Building2 className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Company not found</h2>
        <Button asChild>
          <Link to="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    );
  }

  const socialLinks = company.social_links as Record<string, string> || {};

  const formatSalary = (min?: number | null, max?: number | null, currency = 'USD') => {
    if (!min && !max) return 'Competitive';
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
    if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
    if (min) return `From ${formatter.format(min)}`;
    return `Up to ${formatter.format(max!)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title={`${company.name} | Company Profile - Fuke's Media`}
        description={company.description || `Learn about ${company.name} and explore career opportunities.`}
        keywords={`${company.name}, VFX studio, animation company, post-production careers`}
      />

      {/* Hero Section */}
      <ParallaxSection className="relative pt-32 pb-16" speed={0.5}>
        <FloatingElements variant="geometric" density="low" colorScheme="primary" />

        {/* Cover Image */}
        {company.cover_url && (
          <div className="absolute inset-0 z-0">
            <img
              src={company.cover_url}
              alt={`${company.name} cover`}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start gap-8"
          >
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-card border-4 border-background shadow-xl overflow-hidden">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">{company.name}</h1>
                {company.is_verified && (
                  <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>

              {company.description && (
                <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                  {company.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                {company.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {company.city && `${company.city}, `}{company.country || company.location}
                  </div>
                )}
                {company.size && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {company.size} employees
                  </div>
                )}
                {company.founded_year && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Founded {company.founded_year}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {company.industries?.map((industry: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="capitalize">
                    {industry.replace('-', ' ')}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {company.website && (
                  <Button asChild>
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" /> Visit Website
                    </a>
                  </Button>
                )}
                {company.is_hiring && (
                  <Badge variant="outline" className="h-10 px-4 bg-green-500/10 text-green-500 border-green-500/20">
                    <Briefcase className="w-4 h-4 mr-2" /> Now Hiring
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Content Tabs */}
      <SectionWrapper>
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="jobs">
              Jobs {jobs?.length ? `(${jobs.length})` : ''}
            </TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About {company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {company.description || `${company.name} is a leading company in the creative industry.`}
                    </p>
                  </CardContent>
                </Card>

                {company.industries && company.industries.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Industries & Specializations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {company.industries.map((industry: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-sm py-1.5 px-3 capitalize">
                            {industry.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {company.size && (
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Company Size</p>
                          <p className="font-medium">{company.size}</p>
                        </div>
                      </div>
                    )}
                    {company.founded_year && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Founded</p>
                          <p className="font-medium">{company.founded_year}</p>
                        </div>
                      </div>
                    )}
                    {(company.city || company.country) && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">
                            {company.city && `${company.city}, `}{company.country}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Social Links */}
                {Object.keys(socialLinks).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Connect</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {socialLinks.linkedin && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {socialLinks.twitter && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {socialLinks.instagram && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            {!jobs || jobs.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No open positions</h3>
                <p className="text-muted-foreground">
                  Check back later for new opportunities
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {jobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {job.is_featured && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            <Star className="w-3 h-3 mr-1" /> Featured
                          </Badge>
                        </div>
                      )}
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {job.location}
                          </span>
                          {job.is_remote && (
                            <Badge variant="secondary" className="text-xs">
                              <Globe className="w-3 h-3 mr-1" /> Remote
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="capitalize">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {job.job_type?.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {formatSalary(job.salary_min, job.salary_max)}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(new Date(job.created_at), 'MMM d, yyyy')}
                          </span>
                          <Button size="sm" asChild>
                            <Link to={`/jobs?id=${job.id}`}>
                              Apply <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Culture Tab */}
          <TabsContent value="culture">
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Company Culture</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Learn about the work environment, values, and team at {company.name}.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </SectionWrapper>
    </div>
  );
};

export default CompanyProfile;
