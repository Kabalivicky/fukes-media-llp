
type CurrencyInfo = {
  symbol: string;
  code: string;
  name: string;
  rate?: number; // Exchange rate relative to USD
};

type CurrencyMap = {
  [countryCode: string]: CurrencyInfo;
};

// Base currency information map with more comprehensive coverage
export const currencies: CurrencyMap = {
  US: { symbol: "$", code: "USD", name: "US Dollar", rate: 1 },
  IN: { symbol: "₹", code: "INR", name: "Indian Rupee", rate: 83.12 },
  GB: { symbol: "£", code: "GBP", name: "British Pound", rate: 0.78 },
  EU: { symbol: "€", code: "EUR", name: "Euro", rate: 0.92 },
  JP: { symbol: "¥", code: "JPY", name: "Japanese Yen", rate: 151.79 },
  AU: { symbol: "A$", code: "AUD", name: "Australian Dollar", rate: 1.52 },
  CA: { symbol: "C$", code: "CAD", name: "Canadian Dollar", rate: 1.37 },
  CN: { symbol: "¥", code: "CNY", name: "Chinese Yuan", rate: 7.23 },
  SG: { symbol: "S$", code: "SGD", name: "Singapore Dollar", rate: 1.35 },
  AE: { symbol: "د.إ", code: "AED", name: "UAE Dirham", rate: 3.67 },
  CH: { symbol: "Fr", code: "CHF", name: "Swiss Franc", rate: 0.91 },
  BR: { symbol: "R$", code: "BRL", name: "Brazilian Real", rate: 5.03 },
  ZA: { symbol: "R", code: "ZAR", name: "South African Rand", rate: 18.67 },
  RU: { symbol: "₽", code: "RUB", name: "Russian Ruble", rate: 92.35 },
  MX: { symbol: "Mex$", code: "MXN", name: "Mexican Peso", rate: 16.75 },
  KR: { symbol: "₩", code: "KRW", name: "South Korean Won", rate: 1345.21 },
  // Additional European countries using Euro
  DE: { symbol: "€", code: "EUR", name: "Euro (Germany)", rate: 0.92 },
  FR: { symbol: "€", code: "EUR", name: "Euro (France)", rate: 0.92 },
  IT: { symbol: "€", code: "EUR", name: "Euro (Italy)", rate: 0.92 },
  ES: { symbol: "€", code: "EUR", name: "Euro (Spain)", rate: 0.92 },
  // Add more currencies as needed
};

// Default currency if location detection fails
const defaultCurrency: CurrencyInfo = currencies.IN; // Setting default to INR since this is an Indian company

// More comprehensive function to get user's country code based on browser locale
export const getUserCountry = (): string => {
  try {
    // Try to use saved preference first
    const savedCurrency = localStorage.getItem('user_currency');
    if (savedCurrency && currencies[savedCurrency]) {
      return savedCurrency;
    }

    // Primary approach: Use navigator.language
    if (navigator.language) {
      const locale = navigator.language;
      if (locale && locale.includes('-')) {
        const countryCode = locale.split('-')[1];
        // Verify if this is a supported country
        if (currencies[countryCode]) {
          return countryCode;
        }
      }
    }
    
    // Secondary approach: Try to use Intl API for timezone
    const timeFormat = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeFormat) {
      // Common timezones to country mapping
      if (timeFormat.includes('America')) {
        if (timeFormat.includes('New_York') || timeFormat.includes('Chicago') || 
            timeFormat.includes('Denver') || timeFormat.includes('Los_Angeles')) {
          return 'US';
        }
        if (timeFormat.includes('Toronto') || timeFormat.includes('Vancouver')) {
          return 'CA';
        }
        if (timeFormat.includes('Mexico')) {
          return 'MX';
        }
        if (timeFormat.includes('Sao_Paulo')) {
          return 'BR';
        }
      }
      
      if (timeFormat.includes('Europe')) {
        if (timeFormat.includes('London')) {
          return 'GB';
        }
        if (timeFormat.includes('Paris') || timeFormat.includes('Berlin') || 
            timeFormat.includes('Rome') || timeFormat.includes('Madrid')) {
          return 'EU';
        }
        if (timeFormat.includes('Moscow')) {
          return 'RU';
        }
        if (timeFormat.includes('Zurich')) {
          return 'CH';
        }
      }
      
      if (timeFormat.includes('Asia')) {
        if (timeFormat.includes('Kolkata') || timeFormat.includes('Delhi')) {
          return 'IN';
        }
        if (timeFormat.includes('Tokyo')) {
          return 'JP';
        }
        if (timeFormat.includes('Shanghai') || timeFormat.includes('Beijing')) {
          return 'CN';
        }
        if (timeFormat.includes('Singapore')) {
          return 'SG';
        }
        if (timeFormat.includes('Seoul')) {
          return 'KR';
        }
        if (timeFormat.includes('Dubai')) {
          return 'AE';
        }
      }
      
      if (timeFormat.includes('Australia')) {
        return 'AU';
      }
      
      if (timeFormat.includes('Africa') && timeFormat.includes('Johannesburg')) {
        return 'ZA';
      }
    }
    
    return 'IN'; // Default to India
  } catch {
    // Silent fallback to India - location detection is non-critical
    return 'IN';
  }
};

// Save user's preferred currency
export const setUserCurrency = (countryCode: string): void => {
  if (currencies[countryCode]) {
    localStorage.setItem('user_currency', countryCode);
  }
};

// Get currency information based on user's location
export const getUserCurrency = (): CurrencyInfo => {
  const countryCode = getUserCountry();
  return currencies[countryCode] || defaultCurrency;
};

// Format price according to detected currency with more formatting options
export const formatPrice = (priceInUSD: number, options: { showCode?: boolean, minimumFractionDigits?: number } = {}): string => {
  const { showCode = false, minimumFractionDigits = 2 } = options;
  const userCurrency = getUserCurrency();
  
  // Convert the price
  const convertedPrice = userCurrency.rate 
    ? (priceInUSD * userCurrency.rate) 
    : priceInUSD;
  
  // Format the number with the specified number of decimal places
  const formattedNumber = convertedPrice.toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits
  });
  
  // Return formatted string with or without currency code
  return showCode 
    ? `${userCurrency.symbol}${formattedNumber} ${userCurrency.code}` 
    : `${userCurrency.symbol}${formattedNumber}`;
};

// Create a hook for currency formatting throughout the application
export const useCurrency = () => {
  const userCurrency = getUserCurrency();
  
  return {
    formatPrice,
    currency: userCurrency,
    convertToLocalCurrency: (usdAmount: number, minimumFractionDigits = 2) => {
      const convertedAmount = userCurrency.rate 
        ? (usdAmount * userCurrency.rate) 
        : usdAmount;
        
      return convertedAmount.toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: minimumFractionDigits
      });
    },
    // Allow switching currency
    switchCurrency: (countryCode: string) => {
      setUserCurrency(countryCode);
      window.location.reload(); // Refresh to apply changes
    }
  };
};
