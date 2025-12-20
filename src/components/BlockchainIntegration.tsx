import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileCheck, 
  Wallet, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Upload,
  Link as LinkIcon
} from 'lucide-react';

interface AssetVerification {
  id: string;
  name: string;
  hash: string;
  timestamp: string;
  verified: boolean;
  owner: string;
  metadata: {
    project: string;
    format: string;
    size: string;
    version: number;
  };
}

interface PaymentTransaction {
  id: string;
  freelancer: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed';
  milestone: string;
  hash?: string;
}

const BlockchainIntegration = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [verifications, setVerifications] = useState<AssetVerification[]>([
    {
      id: '1',
      name: 'hero_character_v3.ma',
      hash: '0x742d35Cc7C3F8A0e1...89F5c8B2',
      timestamp: '2024-01-15T10:30:00Z',
      verified: true,
      owner: '0x1234...5678',
      metadata: {
        project: 'Sci-Fi Film Alpha',
        format: 'Maya ASCII',
        size: '125.7 MB',
        version: 3
      }
    },
    {
      id: '2',
      name: 'environment_concept_art.psd',
      hash: '0x8f3a21Bc9D4E2A7e5...12A8c9D3',
      timestamp: '2024-01-14T14:22:00Z',
      verified: true,
      owner: '0x5678...9012',
      metadata: {
        project: 'Fantasy Series Beta',
        format: 'Photoshop Document',
        size: '89.3 MB',
        version: 1
      }
    }
  ]);

  const [payments, setPayments] = useState<PaymentTransaction[]>([
    {
      id: '1',
      freelancer: 'John Doe (3D Artist)',
      amount: 5000,
      status: 'confirmed',
      milestone: 'Character Modeling Complete',
      hash: '0xa1b2c3d4...e5f6g7h8'
    },
    {
      id: '2',
      freelancer: 'Jane Smith (Animator)',
      amount: 3500,
      status: 'pending',
      milestone: 'Animation Review Approved'
    }
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const connectWallet = async () => {
    setWalletConnected(true);
    // Simulate wallet connection
  };

  const verifyAsset = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload and verification process
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new verification
          const newVerification: AssetVerification = {
            id: Date.now().toString(),
            name: file.name,
            hash: `0x${Math.random().toString(16).substr(2, 40)}`,
            timestamp: new Date().toISOString(),
            verified: true,
            owner: '0x1234...5678',
            metadata: {
              project: 'Current Project',
              format: file.type,
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              version: 1
            }
          };
          
          setVerifications(prev => [newVerification, ...prev]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const processPayment = (paymentId: string) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: 'confirmed' as const,
            hash: `0x${Math.random().toString(16).substr(2, 40)}`
          }
        : payment
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Blockchain Integration</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Secure asset verification, IP protection, and transparent payment processing powered by blockchain technology.
        </p>
      </div>

      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Connection
          </CardTitle>
          <CardDescription>
            Connect your Web3 wallet to access blockchain features
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!walletConnected ? (
            <Button onClick={connectWallet} className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Connected: 0x1234...5678</span>
              </div>
              <Badge variant="secondary">MetaMask</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Asset Verification
            </CardTitle>
            <CardDescription>
              Verify ownership and integrity of digital assets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <input
                type="file"
                id="asset-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) verifyAsset(file);
                }}
                disabled={!walletConnected || isUploading}
              />
              <label 
                htmlFor="asset-upload" 
                className={`cursor-pointer ${!walletConnected ? 'opacity-50' : ''}`}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">
                  {isUploading ? 'Verifying...' : 'Upload Asset for Verification'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Drag & drop or click to select
                </p>
              </label>
            </div>

            {/* Upload Progress */}
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span>Uploading and verifying...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Verified Assets */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Verified Assets</h4>
              {verifications.map((verification) => (
                <motion.div
                  key={verification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{verification.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <span>Project: {verification.metadata.project}</span>
                    <span>Size: {verification.metadata.size}</span>
                    <span>Format: {verification.metadata.format}</span>
                    <span>Version: {verification.metadata.version}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <LinkIcon className="w-3 h-3 mr-1" />
                      View on Chain
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Processing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              Payment Processing
            </CardTitle>
            <CardDescription>
              Transparent milestone-based payments for freelancers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {payments.map((payment) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{payment.freelancer}</h4>
                    <p className="text-sm text-muted-foreground">{payment.milestone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${payment.amount.toLocaleString()}</p>
                    <Badge 
                      variant={
                        payment.status === 'completed' ? 'default' : 
                        payment.status === 'confirmed' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {payment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {payment.status === 'confirmed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {payment.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {payment.hash && (
                  <div className="text-xs text-muted-foreground mb-2">
                    Transaction: {payment.hash}
                  </div>
                )}

                {payment.status === 'pending' && walletConnected && (
                  <Button 
                    size="sm" 
                    onClick={() => processPayment(payment.id)}
                    className="w-full"
                  >
                    Process Payment
                  </Button>
                )}
              </motion.div>
            ))}

            {/* Smart Contract Info */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 dark:text-blue-200">Smart Contract Features</p>
                  <ul className="text-blue-700 dark:text-blue-300 text-xs mt-1 space-y-1">
                    <li>• Automatic milestone-based releases</li>
                    <li>• Dispute resolution mechanism</li>
                    <li>• Multi-signature approval process</li>
                    <li>• Transparent fee structure</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockchainIntegration;