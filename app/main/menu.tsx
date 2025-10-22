import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu() {
  const router = useRouter();

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem('has_onboarded');
    Alert.alert('Onboarding zresetowany', 'Uruchom ponownie aplikację, aby przetestować pierwsze uruchomienie.');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b0b0c' }}>
      <Text style={{ color: '#fff', fontSize: 24, marginBottom: 20 }}>Menu główne</Text>
      <Button title="Kalendarz" onPress={() => router.push('/calendar')} />
      <Button title="Wyloguj" onPress={() => router.push('/login')} />
      <Button title="Resetuj onboarding (test)" onPress={resetOnboarding} color="#ff4444" />
    </View>
  );
}
