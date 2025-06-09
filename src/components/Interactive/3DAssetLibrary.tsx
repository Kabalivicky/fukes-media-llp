import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, Eye, Box, FileImage, Sparkles, Layers } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  format: string;
  size: string;
  downloads: number;
  tags: string[];
}

const AssetLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const categories = [
    { id: 'all', name: 'All Assets', icon: Layers },
    { id: 'characters', name: 'Characters', icon: Box },
    { id: 'environments', name: 'Environments', icon: FileImage },
    { id: 'effects', name: 'Effects', icon: Sparkles }
  ];

  const assets: Asset[] = [
    {
      id: '1',
      name: 'Sci-Fi Character Model',
      category: 'characters',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop',
      format: 'FBX',
      size: '25 MB',
      downloads: 1250,
      tags: ['character', 'sci-fi', 'rigged', 'textured']
    },
    {
      id: '2',
      name: 'Futuristic City Environment',
      category: 'environments',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop',
      format: 'USD',
      size: '150 MB',
      downloads: 890,
      tags: ['environment', 'futuristic', 'city', 'lighting']
    },
    {
      id: '3',
      name: 'Energy Blast Effect',
      category: 'effects',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop',
      format: 'VDB',
      size: '45 MB',
      downloads: 2100,
      tags: ['effect', 'energy', 'particle', 'animated']
    },
    {
      id: '4',
      name: 'Dragon Creature',
      category: 'characters',
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop',
      format: 'FBX',
      size: '80 MB',
      downloads: 1680,
      tags: ['creature', 'dragon', 'fantasy', 'animated']
    },
    {
      id: '5',
      name: 'Medieval Castle',
      category: 'environments',
      thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop',
      format: 'USD',
      size: '200 MB',
      downloads: 720,
      tags: ['medieval', 'castle', 'architecture', 'detailed']
    },
    {
      id: '6',
      name: 'Fire Explosion VFX',
      category: 'effects',
      thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=300&fit=crop',
      format: 'VDB',
      size: '35 MB',
      downloads: 3200,
      tags: ['fire', 'explosion', 'destruction', 'smoke']
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePreview = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 gradient-text">3D Asset Library</h2>
        <p className="text-muted-foreground mb-8">
          Explore our extensive collection of professional 3D assets
        </p>
      </motion.div>

      {/* Search and Filters */}
      <Card className="border border-border bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets by name or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <img
                  src={asset.thumbnail}
                  alt={asset.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handlePreview(asset)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{asset.name}</h3>
                <div className="flex justify-between text-sm text-muted-foreground mb-3">
                  <span>{asset.format}</span>
                  <span>{asset.size}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-muted-foreground">
                    {asset.downloads.toLocaleString()} downloads
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {asset.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{asset.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <Box className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No assets found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default AssetLibrary;
