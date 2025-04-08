
type CurrencyInfo = {
  symbol: string;
  code: string;
  name: string;
  rate?: number; // Exchange rate relative to USD
};

type CurrencyMap = {
  [countryCode: string]: CurrencyInfo;
};

// Base currency information map
export const currencies: CurrencyMap = {
  US: { symbol: "$", code: "USD", name: "US Dollar", rate: 1 },
  IN: { symbol: "₹", code: "INR", name: "Indian Rupee", rate: 83.12 },
  GB: { symbol: "£", code: "GBP", name: "British Pound", rate: 0.78 },
  EU: { symbol: "€", code: "EUR", name: "Euro", rate: 0.92 },
  JP: { symbol: "¥", code: "JPY", name: "Japanese Yen", rate: 151.79 },
  AU: { symbol: "A$", code: "AUD", name: "Australian Dollar", rate: 1.52 },
  CA: { symbol: "C$", code: "CAD", name: "Canadian Dollar", rate: 1.37 },
  CN: { symbol: "¥", code: "CNY", name: "Chinese Yuan", rate: 7.23 },
  // Add more currencies as needed
};

// Default currency if location detection fails
const defaultCurrency: CurrencyInfo = currencies.US;

// Function to get user's country code based on browser locale
export const getUserCountry = (): string => {
  try {
    // Try to get country from navigator.language (e.g., "en-US")
    const locale = navigator.language;
    if (locale && locale.includes('-')) {
      const countryCode = locale.split('-')[1];
      return countryCode;
    }
    
    // Fallback to region from Intl API
    const timeFormat = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeFormat) {
      // Extract region from timezone (e.g., "America/New_York" -> "US")
      const region = timeFormat.split('/')[0];
      if (region === 'America') return 'US';
      if (region === 'Europe') return 'EU';
      if (region === 'Asia') {
        if (timeFormat.includes('Kolkata')) return 'IN';
        if (timeFormat.includes('Tokyo')) return 'JP';
        if (timeFormat.includes('Shanghai')) return 'CN';
      }
      if (region === 'Australia') return 'AU';
    }
    
    return 'US'; // Default fallback
  } catch (error) {
    console.error("Error detecting user location:", error);
    return 'US'; // Default fallback
  }
};

// Get currency information based on user's location
export const getUserCurrency = (): CurrencyInfo => {
  const countryCode = getUserCountry();
  return currencies[countryCode] || defaultCurrency;
};

// Format price according to detected currency
export const formatPrice = (priceInUSD: number): string => {
  const userCurrency = getUserCurrency();
  const price = userCurrency.rate 
    ? (priceInUSD * userCurrency.rate).toFixed(2) 
    : priceInUSD.toFixed(2);
    
  return `${userCurrency.symbol}${price} ${userCurrency.code}`;
};

// Create a hook for currency formatting throughout the application
export const useCurrency = () => {
  const userCurrency = getUserCurrency();
  
  return {
    formatPrice,
    currency: userCurrency,
    convertToLocalCurrency: (usdAmount: number) => {
      return userCurrency.rate 
        ? (usdAmount * userCurrency.rate).toFixed(2) 
        : usdAmount.toFixed(2);
    }
  };
};
