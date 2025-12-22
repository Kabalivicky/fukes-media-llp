
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Palette } from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';

const ColorConverter = () => {
  const [hexColor, setHexColor] = useState('#FF6B35');
  const [rgbColor, setRgbColor] = useState('rgb(255, 107, 53)');
  const [hslColor, setHslColor] = useState('hsl(16, 100%, 60%)');
  const [cmykColor, setCmykColor] = useState('cmyk(0, 58, 79, 0)');
  const [labColor, setLabColor] = useState('lab(62, 44, 51)');
  const [xyzColor, setXyzColor] = useState('xyz(32, 23, 5)');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const rgbToLab = (r: number, g: number, b: number) => {
    // Simplified LAB conversion
    const l = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    const a = Math.round(128 + (r - g) * 0.5);
    const bValue = Math.round(128 + (0.25 * (r + g) - b) * 0.5);
    
    return { l, a, b: bValue };
  };

  const rgbToXyz = (r: number, g: number, b: number) => {
    // Simplified XYZ conversion
    const x = Math.round(0.412453 * r + 0.357580 * g + 0.180423 * b);
    const y = Math.round(0.212671 * r + 0.715160 * g + 0.072169 * b);
    const z = Math.round(0.019334 * r + 0.119193 * g + 0.950227 * b);
    
    return { x, y, z };
  };

  const updateColors = (newHex: string) => {
    setHexColor(newHex);
    const rgb = hexToRgb(newHex);
    if (rgb) {
      setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
      
      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
      setCmykColor(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`);
      
      const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
      setLabColor(`lab(${lab.l}, ${lab.a}, ${lab.b})`);
      
      const xyz = rgbToXyz(rgb.r, rgb.g, rgb.b);
      setXyzColor(`xyz(${xyz.x}, ${xyz.y}, ${xyz.z})`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <SEOHelmet 
        title="Color Converter - Fuke's Media"
        description="Convert colors between HEX, RGB, and HSL formats with live preview"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red">
              Color Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Convert colors between HEX, RGB, and HSL formats
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Picker
                </CardTitle>
                <CardDescription>
                  Choose a color to see all format conversions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="w-full h-32 rounded-lg border-2 border-border" 
                       style={{ backgroundColor: hexColor }}>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Color Picker</Label>
                    <Input
                      type="color"
                      value={hexColor}
                      onChange={(e) => updateColors(e.target.value)}
                      className="w-full h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Formats</CardTitle>
                <CardDescription>
                  All color format representations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>HEX</Label>
                  <div className="flex gap-2">
                    <Input
                      value={hexColor}
                      onChange={(e) => updateColors(e.target.value)}
                      className="flex-1 font-mono"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(hexColor)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>RGB</Label>
                  <div className="flex gap-2">
                    <Input
                      value={rgbColor}
                      readOnly
                      className="flex-1 font-mono bg-muted"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(rgbColor)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>HSL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={hslColor}
                      readOnly
                      className="flex-1 font-mono bg-muted"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(hslColor)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>CMYK</Label>
                  <div className="flex gap-2">
                    <Input
                      value={cmykColor}
                      readOnly
                      className="flex-1 font-mono bg-muted"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(cmykColor)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>LAB</Label>
                  <div className="flex gap-2">
                    <Input
                      value={labColor}
                      readOnly
                      className="flex-1 font-mono bg-muted"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(labColor)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>XYZ</Label>
                  <div className="flex gap-2">
                    <Input
                      value={xyzColor}
                      readOnly
                      className="flex-1 font-mono bg-muted"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => copyToClipboard(xyzColor)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>
                Common color variations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4A90E2'].map((color, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-lg border-2 border-border cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => updateColors(color)}
                  >
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ColorConverter;
