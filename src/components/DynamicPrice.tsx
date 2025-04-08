
import { useState, useEffect } from 'react';
import { formatPrice, getUserCurrency } from '@/utils/currencyUtils';

interface DynamicPriceProps {
  priceUSD: number;
  className?: string;
  showCode?: boolean;
  minimumFractionDigits?: number;
}

const DynamicPrice = ({ 
  priceUSD, 
  className = '', 
  showCode = false,
  minimumFractionDigits = 2
}: DynamicPriceProps) => {
  const [formattedPrice, setFormattedPrice] = useState('');
  
  useEffect(() => {
    // Get formatted price with user's currency
    const formattedValue = formatPrice(priceUSD, { 
      showCode, 
      minimumFractionDigits 
    });
    
    setFormattedPrice(formattedValue);
    
  }, [priceUSD, showCode, minimumFractionDigits]);
  
  return (
    <span className={`font-medium ${className}`}>
      {formattedPrice}
    </span>
  );
};

export default DynamicPrice;
