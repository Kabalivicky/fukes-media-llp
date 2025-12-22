import { Coffee, Heart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DonationButtonsProps {
  kofiUsername?: string;
  buyMeACoffeeUsername?: string;
  paypalEmail?: string;
  showCard?: boolean;
}

const DonationButtons = ({
  kofiUsername = 'fykesmedia',
  buyMeACoffeeUsername = 'fykesmedia',
  paypalEmail = 'donate@fykesmedia.com',
  showCard = true
}: DonationButtonsProps) => {
  const buttons = [
    {
      name: 'Ko-fi',
      icon: Coffee,
      url: `https://ko-fi.com/${kofiUsername}`,
      color: 'bg-[#FF5E5B] hover:bg-[#FF5E5B]/90',
      description: 'Buy us a coffee'
    },
    {
      name: 'Buy Me a Coffee',
      icon: Heart,
      url: `https://www.buymeacoffee.com/${buyMeACoffeeUsername}`,
      color: 'bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black',
      description: 'Support our work'
    },
    {
      name: 'PayPal',
      icon: DollarSign,
      url: `https://paypal.me/${paypalEmail}`,
      color: 'bg-[#003087] hover:bg-[#003087]/90',
      description: 'Send a tip'
    }
  ];

  const content = (
    <div className="flex flex-wrap gap-3 justify-center">
      {buttons.map((button) => (
        <a
          key={button.name}
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className={`${button.color} text-white font-medium transition-all duration-300 hover:scale-105`}
          >
            <button.icon className="w-4 h-4 mr-2" />
            {button.name}
          </Button>
        </a>
      ))}
    </div>
  );

  if (!showCard) {
    return content;
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Support Our Work
        </CardTitle>
        <CardDescription>
          If you find our tools helpful, consider supporting us!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default DonationButtons;
