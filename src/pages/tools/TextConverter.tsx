
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, FileText, Type } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';

const TextConverter = () => {
  const [inputText, setInputText] = useState('');

  const conversions = {
    uppercase: inputText.toUpperCase(),
    lowercase: inputText.toLowerCase(),
    title: inputText.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ),
    camelCase: inputText.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ).replace(/\s+/g, ''),
    pascalCase: inputText.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
      word.toUpperCase()
    ).replace(/\s+/g, ''),
    kebabCase: inputText.toLowerCase().replace(/\s+/g, '-'),
    snakeCase: inputText.toLowerCase().replace(/\s+/g, '_'),
    constantCase: inputText.toUpperCase().replace(/\s+/g, '_'),
    reverse: inputText.split('').reverse().join(''),
    removeSpaces: inputText.replace(/\s+/g, ''),
    removeSpecialChars: inputText.replace(/[^\w\s]/gi, ''),
    base64Encode: btoa(inputText),
    base64Decode: (() => {
      try {
        return atob(inputText);
      } catch {
        return 'Invalid Base64';
      }
    })(),
    urlEncode: encodeURIComponent(inputText),
    urlDecode: (() => {
      try {
        return decodeURIComponent(inputText);
      } catch {
        return 'Invalid URL encoding';
      }
    })(),
    htmlEntities: inputText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;'),
    extractNumbers: inputText.replace(/\D/g, ''),
    extractLetters: inputText.replace(/[^a-zA-Z]/g, ''),
    wordCount: inputText.split(/\s+/).filter(Boolean).length.toString(),
    characterCount: inputText.length.toString(),
    sentenceCount: inputText.split(/[.!?]+/).filter(Boolean).length.toString(),
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <MainLayout>
      <SEOHelmet 
        title="Text Converter - Fuke's Media"
        description="Convert text formats and encoding with multiple transformation options"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red">
              Text Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform text with various formatting and encoding options
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Input Text
                </CardTitle>
                <CardDescription>
                  Enter your text to convert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Text to Convert</Label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="min-h-[200px]"
                  />
                  <div className="text-sm text-muted-foreground">
                    Characters: {inputText.length} | Words: {inputText.split(/\s+/).filter(Boolean).length}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Text Conversions
                </CardTitle>
                <CardDescription>
                  Available text transformations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(conversions).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                    <div className="flex gap-2">
                      <Textarea
                        value={value}
                        readOnly
                        className="flex-1 min-h-[60px] bg-muted font-mono text-sm"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => copyToClipboard(value)}
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Case Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Convert between uppercase, lowercase, title case, and more
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Code Formatting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Transform text for programming: camelCase, snake_case, kebab-case
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Text Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get character and word counts for your text content
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TextConverter;
