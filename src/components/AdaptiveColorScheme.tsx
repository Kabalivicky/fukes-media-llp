import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdaptiveColorSchemeProps {
  children: React.ReactNode;
}

const AdaptiveColorScheme = ({ children }: AdaptiveColorSchemeProps) => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'evening' | 'night'>('day');
  const [userActivity, setUserActivity] = useState<'active' | 'idle'>('active');
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Time-based color adaptation
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 18) setTimeOfDay('day');
      else if (hour >= 18 && hour < 22) setTimeOfDay('evening');
      else setTimeOfDay('night');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Activity tracking
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setUserActivity('active');
    };

    const checkActivity = () => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity > 30000) { // 30 seconds of inactivity
        setUserActivity('idle');
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    const activityInterval = setInterval(checkActivity, 5000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(activityInterval);
    };
  }, [lastActivity]);

  // Dynamic CSS variables based on time and activity
  useEffect(() => {
    const root = document.documentElement;
    
    const colorSchemes = {
      morning: {
        primary: '48 100% 50%',     // Warm golden
        secondary: '30 100% 45%',   // Orange
        accent: '120 50% 60%',      // Light green
        background: '0 0% 98%',     // Very light
        foreground: '0 0% 10%',
      },
      day: {
        primary: '214 100% 46%',    // Standard blue
        secondary: '345 100% 41%',  // Standard red
        accent: '142 100% 29%',     // Standard green
        background: '0 0% 100%',    // Pure white
        foreground: '0 0% 0%',
      },
      evening: {
        primary: '25 100% 55%',     // Warm orange
        secondary: '340 100% 50%',  // Pink
        accent: '280 100% 60%',     // Purple
        background: '20 10% 95%',   // Warm light
        foreground: '0 0% 15%',
      },
      night: {
        primary: '240 100% 60%',    // Cool blue
        secondary: '260 100% 55%',  // Purple
        accent: '180 100% 50%',     // Cyan
        background: '0 0% 5%',      // Very dark
        foreground: '0 0% 95%',
      }
    };

    const currentScheme = colorSchemes[timeOfDay];
    
    // Apply adaptive opacity based on activity
    const opacity = userActivity === 'idle' ? '0.8' : '1';
    
    Object.entries(currentScheme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    root.style.setProperty('--adaptive-opacity', opacity);
  }, [timeOfDay, userActivity]);

  return (
    <motion.div
      className="adaptive-color-scheme"
      animate={{
        filter: userActivity === 'idle' ? 'brightness(0.9)' : 'brightness(1)',
      }}
      transition={{ duration: 2 }}
    >
      <AnimatePresence>
        <motion.div
          key={timeOfDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
              ${timeOfDay === 'morning' ? 'rgba(255, 223, 0, 0.1)' :
                timeOfDay === 'day' ? 'rgba(0, 123, 255, 0.05)' :
                timeOfDay === 'evening' ? 'rgba(255, 99, 71, 0.1)' :
                'rgba(72, 61, 139, 0.15)'} 0%, 
              transparent 70%)`,
            zIndex: -10,
          }}
        />
      </AnimatePresence>
      
      {children}
    </motion.div>
  );
};

export default AdaptiveColorScheme;