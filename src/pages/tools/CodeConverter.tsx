
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Code, Copy, Download, Settings } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';

const CodeConverter = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [fromLanguage, setFromLanguage] = useState('');
  const [toLanguage, setToLanguage] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'lua', label: 'Lua' },
    { value: 'dart', label: 'Dart' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'erlang', label: 'Erlang' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'clojure', label: 'Clojure' },
    { value: 'fsharp', label: 'F#' },
    { value: 'vb', label: 'Visual Basic' },
    { value: 'cobol', label: 'COBOL' },
    { value: 'fortran', label: 'Fortran' },
    { value: 'pascal', label: 'Pascal' },
    { value: 'assembly', label: 'Assembly' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'xml', label: 'XML' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
    { value: 'toml', label: 'TOML' },
    { value: 'bash', label: 'Bash' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'batch', label: 'Batch' },
  ];

  const handleConvert = () => {
    if (!inputCode || !fromLanguage || !toLanguage) {
      alert('Please provide code and select both languages');
      return;
    }
    // Conversion logic would go here
    setOutputCode(`// Converted from ${fromLanguage} to ${toLanguage}\n${inputCode}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
  };

  return (
    <MainLayout>
      <SEOHelmet 
        title="Code Converter - Fuke's Media"
        description="Convert code between different programming languages with AI assistance"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red">
              Code Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Convert code between different programming languages
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Input Code
                </CardTitle>
                <CardDescription>
                  Paste your source code here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>From Language</Label>
                  <Select value={fromLanguage} onValueChange={setFromLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Source Code</Label>
                  <Textarea
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter your code here..."
                    className="min-h-[300px] font-mono"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Output Code
                </CardTitle>
                <CardDescription>
                  Converted code will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>To Language</Label>
                  <Select value={toLanguage} onValueChange={setToLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Converted Code</Label>
                  <Textarea
                    value={outputCode}
                    readOnly
                    placeholder="Converted code will appear here..."
                    className="min-h-[300px] font-mono bg-muted"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <Button 
              onClick={handleConvert}
              disabled={!inputCode || !fromLanguage || !toLanguage}
              className="gradient-button"
            >
              <Settings className="mr-2 h-4 w-4" />
              Convert Code
            </Button>
            <Button 
              variant="outline"
              onClick={handleCopy}
              disabled={!outputCode}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Output
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CodeConverter;
