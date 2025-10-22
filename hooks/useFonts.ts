import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { fontsToLoad } from '../constants/fonts';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync(fontsToLoad);
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Error loading fonts:', error);
        setFontsLoaded(true); // Kontynuuj mimo błędu, użyj fontów systemowych
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};