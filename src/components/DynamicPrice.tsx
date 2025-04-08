
import { useState, useEffect } from 'react';
import { formatPrice, getUserCurrency } from '@/utils/currencyUtils';

interface DynamicPriceProps {
  priceUSD: number;
  className?: string;
  showCode?: boolean;
  minimumFractionDigits?: number;
  showOriginal?: boolean;
}

const DynamicPrice = ({ 
  priceUSD, 
  className = '', 
  showCode = false,
  minimumFractionDigits = 2,
  showOriginal = false
}: DynamicPriceProps) => {
  const [formattedPrice, setFormattedPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  
  useEffect(() => {
    // Get formatted price with user's currency
    const formattedValue = formatPrice(priceUSD, { 
      showCode, 
      minimumFractionDigits 
    });
    
    setFormattedPrice(formattedValue);
    
    // If showing original price is requested, format the USD price
    if (showOriginal) {
      const usdFormatted = `$${priceUSD.toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: minimumFractionDigits
      })}`;
      setOriginalPrice(usdFormatted);
    }
    
  }, [priceUSD, showCode, minimumFractionDigits, showOriginal]);
  
  return (
    <span className={`font-medium ${className}`}>
      {formattedPrice}
      {showOriginal && getUserCurrency().code !== 'USD' && (
        <span className="text-muted-foreground text-xs ml-1">
          ({originalPrice} USD)
        </span>
      )}
    </span>
  );
};

export default DynamicPrice;
