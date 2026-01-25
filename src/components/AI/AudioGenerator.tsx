import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Music, Play, Square, Download, Volume2, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

type SoundType = 'explosion' | 'laser' | 'whoosh' | 'ambient' | 'notification' | 'click' | 'power-up' | 'alarm';

interface GeneratedSound {
  id: string;
  name: string;
  type: SoundType;
  duration: number;
  audioUrl: string;
  audioContext: AudioContext | null;
}

const SOUND_PRESETS: Record<SoundType, { label: string; description: string }> = {
  explosion: { label: 'Explosion', description: 'Deep rumbling explosion sound' },
  laser: { label: 'Laser', description: 'Sci-fi laser beam effect' },
  whoosh: { label: 'Whoosh', description: 'Fast movement swoosh' },
  ambient: { label: 'Ambient', description: 'Background atmosphere' },
  notification: { label: 'Notification', description: 'Alert or notification tone' },
  click: { label: 'Click', description: 'UI click sound' },
  'power-up': { label: 'Power-up', description: 'Gaming power-up effect' },
  alarm: { label: 'Alarm', description: 'Warning or alarm sound' },
};

const AudioGenerator = () => {
  const [soundName, setSoundName] = useState('');
  const [soundType, setSoundType] = useState<SoundType>('laser');
  const [duration, setDuration] = useState([1]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSounds, setGeneratedSounds] = useState<GeneratedSound[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const generateSound = async () => {
    if (!soundName.trim()) {
      toast.error('Please enter a sound name');
      return;
    }

    setIsGenerating(true);

    try {
      // Create AudioContext for Web Audio API synthesis
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const soundDuration = duration[0];
      const sampleRate = audioContext.sampleRate;
      const numSamples = Math.floor(sampleRate * soundDuration);
      const buffer = audioContext.createBuffer(2, numSamples, sampleRate);

      // Generate sound based on type
      for (let channel = 0; channel < 2; channel++) {
        const channelData = buffer.getChannelData(channel);
        generateSoundData(channelData, soundType, numSamples, sampleRate);
      }

      // Convert to WAV blob
      const wavBlob = bufferToWave(buffer, numSamples);
      const audioUrl = URL.createObjectURL(wavBlob);

      const newSound: GeneratedSound = {
        id: Date.now().toString(),
        name: soundName,
        type: soundType,
        duration: soundDuration,
        audioUrl,
        audioContext,
      };

      setGeneratedSounds(prev => [newSound, ...prev]);
      setSoundName('');
      toast.success('Sound effect generated!');
    } catch (error) {
      console.error('Error generating sound:', error);
      toast.error('Failed to generate sound');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSoundData = (data: Float32Array, type: SoundType, numSamples: number, sampleRate: number) => {
    const duration = numSamples / sampleRate;

    switch (type) {
      case 'explosion':
        // Low frequency rumble with noise
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const envelope = Math.exp(-t * 3) * (1 - t / duration);
          const noise = (Math.random() * 2 - 1) * 0.7;
          const bass = Math.sin(2 * Math.PI * 50 * t) * 0.5;
          const midBass = Math.sin(2 * Math.PI * 100 * t) * 0.3;
          data[i] = (noise + bass + midBass) * envelope * 0.8;
        }
        break;

      case 'laser':
        // Frequency sweep from high to low
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const envelope = Math.exp(-t * 8);
          const freq = 1500 * Math.exp(-t * 5) + 200;
          data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.6;
        }
        break;

      case 'whoosh':
        // Filtered noise with volume envelope
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const envelope = Math.sin(Math.PI * t / duration);
          const noise = Math.random() * 2 - 1;
          // Simple low-pass filter simulation
          const filtered = noise * 0.5 + (i > 0 ? data[i - 1] * 0.5 : 0);
          data[i] = filtered * envelope * 0.5;
        }
        break;

      case 'ambient':
        // Layered sine waves with slight detuning
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const envelope = 0.5 + 0.5 * Math.sin(Math.PI * t / duration);
          const wave1 = Math.sin(2 * Math.PI * 220 * t) * 0.3;
          const wave2 = Math.sin(2 * Math.PI * 221.5 * t) * 0.3;
          const wave3 = Math.sin(2 * Math.PI * 330 * t) * 0.2;
          data[i] = (wave1 + wave2 + wave3) * envelope * 0.4;
        }
        break;

      case 'notification':
        // Two-tone notification
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const freq = t < duration / 2 ? 880 : 1100;
          const envelope = Math.exp(-t * 4) * 0.8;
          data[i] = Math.sin(2 * Math.PI * freq * t) * envelope;
        }
        break;

      case 'click':
        // Short percussive click
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const envelope = Math.exp(-t * 50);
          const noise = Math.random() * 2 - 1;
          data[i] = noise * envelope * 0.7;
        }
        break;

      case 'power-up':
        // Rising frequency sweep
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const envelope = 1 - Math.pow(t / duration - 0.8, 2);
          const freq = 200 + (t / duration) * 800;
          const harmonics = Math.sin(2 * Math.PI * freq * t) * 0.6 +
                          Math.sin(2 * Math.PI * freq * 2 * t) * 0.3 +
                          Math.sin(2 * Math.PI * freq * 3 * t) * 0.1;
          data[i] = harmonics * Math.max(0, envelope) * 0.5;
        }
        break;

      case 'alarm':
        // Oscillating alarm tone
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const modulation = Math.sin(2 * Math.PI * 4 * t);
          const freq = 600 + modulation * 200;
          const envelope = 0.7 + 0.3 * Math.sin(Math.PI * t / duration);
          data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.5;
        }
        break;
    }
  };

  const bufferToWave = (buffer: AudioBuffer, numSamples: number): Blob => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = numSamples * blockAlign;
    const headerSize = 44;
    const totalSize = headerSize + dataSize;

    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    // WAV header
    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, totalSize - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    // Write audio data
    let offset = 44;
    for (let i = 0; i < numSamples; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  const playSound = (sound: GeneratedSound) => {
    if (playingId === sound.id) {
      setPlayingId(null);
      return;
    }

    const audio = new Audio(sound.audioUrl);
    audio.onended = () => setPlayingId(null);
    audio.play();
    setPlayingId(sound.id);
  };

  const downloadSound = (sound: GeneratedSound) => {
    const link = document.createElement('a');
    link.href = sound.audioUrl;
    link.download = `${sound.name.replace(/\s+/g, '-').toLowerCase()}-${sound.type}.wav`;
    link.click();
    toast.success('Sound downloaded!');
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Sound Effect Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create custom sound effects using Web Audio synthesis. Perfect for games, apps, and video production.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sound-name">Sound Name</Label>
                <Input
                  id="sound-name"
                  placeholder="e.g., Epic Explosion"
                  value={soundName}
                  onChange={(e) => setSoundName(e.target.value)}
                />
              </div>

              <div>
                <Label>Sound Type</Label>
                <Select value={soundType} onValueChange={(v) => setSoundType(v as SoundType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SOUND_PRESETS).map(([key, preset]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col">
                          <span>{preset.label}</span>
                          <span className="text-xs text-muted-foreground">{preset.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Duration: {duration[0]}s</Label>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={0.1}
                  max={5}
                  step={0.1}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={generateSound}
                disabled={isGenerating || !soundName.trim()}
                className="w-full gradient-button"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Sound Effect
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <Label>Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(SOUND_PRESETS).map(([key, preset]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSoundType(key as SoundType);
                      if (!soundName) setSoundName(preset.label);
                    }}
                    className={soundType === key ? 'border-primary' : ''}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedSounds.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Generated Sounds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedSounds.map((sound) => (
                <motion.div
                  key={sound.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => playSound(sound)}
                    >
                      {playingId === sound.id ? (
                        <Square className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div>
                      <p className="font-medium">{sound.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {SOUND_PRESETS[sound.type].label}
                        </Badge>
                        <span>{sound.duration}s</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadSound(sound)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudioGenerator;
