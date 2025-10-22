import { Stack } from 'expo-router';
import { Platform, StatusBar, ImageBackground, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/auth/AuthContext';
import { useEffect } from 'react';
import { useFonts } from '../hooks/useFonts';
import backgroundImage from '../assets/back.png';
import * as NavigationBar from 'expo-navigation-bar';

function LayoutInner() {
  const { isReady } = useAuth();
  if (!isReady) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'fade',
        contentStyle: { backgroundColor: 'transparent' },
        fullScreenGestureEnabled: true
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="main" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default function Layout() {
  const fontsLoaded = useFonts();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  if (!fontsLoaded) {
    return null; // lub komponent ładowania
  }

  return (
    <ImageBackground 
      source={backgroundImage} 
      resizeMode="cover"
      style={styles.background}
    >
      <AuthProvider>
        <StatusBar hidden={true} />
        <LayoutInner />
      </AuthProvider>
    </ImageBackground>
  );
}