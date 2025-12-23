import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect keyboard vs mouse navigation for focus styling
 */
const useFocusVisible = () => {
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleFocus = useCallback(() => {
    if (isKeyboardUser) {
      setIsFocusVisible(true);
    }
  }, [isKeyboardUser]);

  const handleBlur = useCallback(() => {
    setIsFocusVisible(false);
  }, []);

  return {
    isFocusVisible,
    isKeyboardUser,
    focusProps: {
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
};

export default useFocusVisible;
