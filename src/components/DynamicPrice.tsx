
import { useState, useEffect } from 'react';
import { formatPrice, getUserCurrency } from '@/utils/currencyUtils';

interface DynamicPriceProps {
  priceUSD: number;
  className?: string;
  showCode?: boolean;
}

const DynamicPrice = ({ priceUSD, className = '', showCode = false }: DynamicPriceProps) => {
  const [formattedPrice, setFormattedPrice] = useState('');
  
  useEffect(() => {
    const userCurrency = getUserCurrency();
    const convertedPrice = userCurrency.rate 
      ? (priceUSD * userCurrency.rate).toFixed(2) 
      : priceUSD.toFixed(2);
      
    setFormattedPrice(
      showCode 
        ? `${userCurrency.symbol}${convertedPrice} ${userCurrency.code}` 
        : `${userCurrency.symbol}${convertedPrice}`
    );
  }, [priceUSD, showCode]);
  
  return (
    <span className={className}>
      {formattedPrice}
    </span>
  );
};

export default DynamicPrice;
