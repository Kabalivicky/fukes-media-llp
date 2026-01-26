import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Music, Play, Square, Download, Volume2, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type MoodType = 'calm' | 'energetic' | 'mysterious' | 'happy' | 'sad' | 'epic' | 'ambient' | 'tension';

interface GeneratedTrack {
  id: string;
  name: string;
  mood: MoodType;
  duration: number;
  bpm: number;
  audioUrl: string;
}

const MOOD_PRESETS: Record<MoodType, { 
  label: string; 
  description: string;
  baseFreqs: number[];
  scale: number[];
  tempo: number;
  color: string;
}> = {
  calm: { 
    label: 'Calm', 
    description: 'Peaceful and relaxing ambience',
    baseFreqs: [220, 277, 330, 392],
    scale: [0, 2, 4, 5, 7, 9, 11], // Major scale
    tempo: 60,
    color: 'from-blue-500 to-cyan-500'
  },
  energetic: { 
    label: 'Energetic', 
    description: 'Upbeat and driving rhythm',
    baseFreqs: [110, 165, 220, 330],
    scale: [0, 2, 4, 7, 9], // Pentatonic
    tempo: 128,
    color: 'from-orange-500 to-red-500'
  },
  mysterious: { 
    label: 'Mysterious', 
    description: 'Dark and intriguing soundscape',
    baseFreqs: [110, 138, 165, 207],
    scale: [0, 1, 3, 5, 6, 8, 10], // Phrygian
    tempo: 80,
    color: 'from-purple-500 to-indigo-500'
  },
  happy: { 
    label: 'Happy', 
    description: 'Cheerful and uplifting melody',
    baseFreqs: [262, 330, 392, 523],
    scale: [0, 2, 4, 5, 7, 9, 11], // Major scale
    tempo: 110,
    color: 'from-yellow-500 to-orange-500'
  },
  sad: { 
    label: 'Sad', 
    description: 'Melancholic and emotional',
    baseFreqs: [196, 220, 262, 294],
    scale: [0, 2, 3, 5, 7, 8, 10], // Natural minor
    tempo: 70,
    color: 'from-slate-500 to-blue-800'
  },
  epic: { 
    label: 'Epic', 
    description: 'Grand and cinematic',
    baseFreqs: [65, 98, 131, 196],
    scale: [0, 2, 4, 5, 7, 9, 11],
    tempo: 90,
    color: 'from-amber-500 to-red-600'
  },
  ambient: { 
    label: 'Ambient', 
    description: 'Atmospheric background texture',
    baseFreqs: [55, 82, 110, 165],
    scale: [0, 2, 4, 7, 9],
    tempo: 50,
    color: 'from-teal-500 to-emerald-500'
  },
  tension: { 
    label: 'Tension', 
    description: 'Suspenseful and uneasy',
    baseFreqs: [98, 104, 147, 156],
    scale: [0, 1, 4, 5, 7, 8, 11], // Altered scale
    tempo: 85,
    color: 'from-red-600 to-rose-800'
  },
};

const MusicGenerator = () => {
  const [trackName, setTrackName] = useState('');
  const [mood, setMood] = useState<MoodType>('calm');
  const [duration, setDuration] = useState([30]);
  const [bpm, setBpm] = useState([80]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<GeneratedTrack[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Update BPM when mood changes
  useEffect(() => {
    setBpm([MOOD_PRESETS[mood].tempo]);
  }, [mood]);

  const generateMusic = async () => {
    if (!trackName.trim()) {
      toast.error('Please enter a track name');
      return;
    }

    setIsGenerating(true);

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const trackDuration = duration[0];
      const trackBpm = bpm[0];
      const preset = MOOD_PRESETS[mood];
      const sampleRate = audioContext.sampleRate;
      const numSamples = Math.floor(sampleRate * trackDuration);
      const buffer = audioContext.createBuffer(2, numSamples, sampleRate);

      // Generate music for both channels
      for (let channel = 0; channel < 2; channel++) {
        const channelData = buffer.getChannelData(channel);
        generateMusicData(channelData, preset, numSamples, sampleRate, trackBpm, channel);
      }

      // Convert to WAV
      const wavBlob = bufferToWave(buffer, numSamples);
      const audioUrl = URL.createObjectURL(wavBlob);

      const newTrack: GeneratedTrack = {
        id: Date.now().toString(),
        name: trackName,
        mood,
        duration: trackDuration,
        bpm: trackBpm,
        audioUrl,
      };

      setGeneratedTracks(prev => [newTrack, ...prev]);
      setTrackName('');
      toast.success('Music track generated!');
    } catch (error) {
      console.error('Error generating music:', error);
      toast.error('Failed to generate music');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMusicData = (
    data: Float32Array, 
    preset: typeof MOOD_PRESETS[MoodType], 
    numSamples: number, 
    sampleRate: number,
    bpm: number,
    channel: number
  ) => {
    const duration = numSamples / sampleRate;
    const beatDuration = 60 / bpm;
    const barDuration = beatDuration * 4;
    
    // Slight stereo offset for width
    const stereoOffset = channel === 0 ? 0 : 0.003;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate + stereoOffset;
      let sample = 0;

      // Bass drone (foundational)
      const bassFreq = preset.baseFreqs[0];
      sample += Math.sin(2 * Math.PI * bassFreq * t) * 0.15;
      sample += Math.sin(2 * Math.PI * bassFreq * 2 * t) * 0.08;

      // Pad layer (evolving harmonics)
      for (let j = 0; j < preset.baseFreqs.length; j++) {
        const freq = preset.baseFreqs[j];
        const detuneAmount = 0.5 + Math.sin(t * 0.3 + j) * 0.5;
        const detunedFreq = freq * (1 + detuneAmount * 0.002);
        
        // Slow amplitude modulation for movement
        const ampMod = 0.5 + 0.5 * Math.sin(t * (0.1 + j * 0.05));
        
        sample += Math.sin(2 * Math.PI * detunedFreq * t) * 0.08 * ampMod;
        sample += Math.sin(2 * Math.PI * detunedFreq * 1.5 * t) * 0.04 * ampMod;
      }

      // Rhythmic element based on BPM
      const beatPhase = (t % beatDuration) / beatDuration;
      const barPhase = (t % barDuration) / barDuration;
      
      // Kick-like pulse on downbeats
      if (bpm > 70) {
        const kickEnv = Math.exp(-beatPhase * 15);
        const kickFreq = 60 * (1 + kickEnv * 2);
        sample += Math.sin(2 * Math.PI * kickFreq * t) * kickEnv * 0.2;
      }

      // Hi-hat shimmer (for energetic moods)
      if (preset.tempo > 100) {
        const hihatPhase = (t * 4 % beatDuration) / beatDuration;
        const hihatEnv = Math.exp(-hihatPhase * 20);
        const noise = (Math.random() * 2 - 1);
        sample += noise * hihatEnv * 0.05;
      }

      // Melodic arpeggios
      const noteIndex = Math.floor(t / (beatDuration / 2)) % preset.scale.length;
      const noteFreq = preset.baseFreqs[1] * Math.pow(2, preset.scale[noteIndex] / 12);
      const notePhase = (t * 2 % beatDuration) / beatDuration;
      const noteEnv = Math.exp(-notePhase * 4) * 0.5;
      sample += Math.sin(2 * Math.PI * noteFreq * t) * noteEnv * 0.1;

      // Sub-bass movement
      const subFreq = preset.baseFreqs[0] / 2;
      const subMod = Math.sin(t * 0.2) * 0.3 + 0.7;
      sample += Math.sin(2 * Math.PI * subFreq * t) * 0.1 * subMod;

      // Atmospheric noise layer
      const atmosphereNoise = (Math.random() * 2 - 1) * 0.02;
      const atmosphereFilter = Math.sin(t * 0.1) * 0.5 + 0.5;
      sample += atmosphereNoise * atmosphereFilter;

      // Apply overall envelope (fade in/out)
      const fadeIn = Math.min(1, t / 2);
      const fadeOut = Math.min(1, (duration - t) / 3);
      const envelope = fadeIn * fadeOut;

      // Gentle compression/limiting
      sample = Math.tanh(sample * 1.5) * 0.7;
      
      data[i] = sample * envelope;
    }
  };

  const bufferToWave = (buffer: AudioBuffer, numSamples: number): Blob => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1;
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = numSamples * blockAlign;
    const headerSize = 44;
    const totalSize = headerSize + dataSize;

    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, totalSize - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

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

  const playTrack = (track: GeneratedTrack) => {
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.audioUrl);
    audio.onended = () => setPlayingId(null);
    audio.play();
    audioRef.current = audio;
    setPlayingId(track.id);
  };

  const downloadTrack = (track: GeneratedTrack) => {
    const link = document.createElement('a');
    link.href = track.audioUrl;
    link.download = `${track.name.replace(/\s+/g, '-').toLowerCase()}-${track.mood}-${track.bpm}bpm.wav`;
    link.click();
    toast.success('Track downloaded!');
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Music & Loop Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create background music and ambient loops using Web Audio synthesis. Perfect for videos, games, and podcasts.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="track-name">Track Name</Label>
                <Input
                  id="track-name"
                  placeholder="e.g., Cinematic Ambience"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                />
              </div>

              <div>
                <Label>Mood / Style</Label>
                <Select value={mood} onValueChange={(v) => setMood(v as MoodType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(MOOD_PRESETS).map(([key, preset]) => (
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
                  min={10}
                  max={120}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>BPM: {bpm[0]}</Label>
                <Slider
                  value={bpm}
                  onValueChange={setBpm}
                  min={40}
                  max={180}
                  step={5}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={generateMusic}
                disabled={isGenerating || !trackName.trim()}
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
                    Generate Music Track
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <Label>Quick Mood Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(MOOD_PRESETS).map(([key, preset]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMood(key as MoodType);
                      if (!trackName) setTrackName(preset.label + ' Track');
                    }}
                    className={`${mood === key ? 'border-primary' : ''} justify-start`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${preset.color} mr-2`} />
                    {preset.label}
                  </Button>
                ))}
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Current Settings</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Mood: <span className="text-foreground">{MOOD_PRESETS[mood].label}</span></p>
                  <p>Duration: <span className="text-foreground">{duration[0]} seconds</span></p>
                  <p>Tempo: <span className="text-foreground">{bpm[0]} BPM</span></p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedTracks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Generated Tracks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedTracks.map((track) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => playTrack(track)}
                    >
                      {playingId === track.id ? (
                        <Square className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div>
                      <p className="font-medium">{track.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className={`text-xs bg-gradient-to-r ${MOOD_PRESETS[track.mood].color} text-white`}>
                          {MOOD_PRESETS[track.mood].label}
                        </Badge>
                        <span>{track.duration}s</span>
                        <span>{track.bpm} BPM</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadTrack(track)}
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

export default MusicGenerator;
