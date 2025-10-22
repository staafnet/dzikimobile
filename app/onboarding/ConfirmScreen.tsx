import AsyncStorage from '@react-native-async-storage/async-storage';
  const handleReset = async () => {
    await AsyncStorage.removeItem('has_onboarded');
    Alert.alert('Dane usunięte', 'Stan onboardingu został zresetowany.');
  };
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors, spacing } from '../../constants/theme';

function ConfirmScreen() {
  const router = useRouter();
  const { data } = useOnboarding();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        Alert.alert('Błąd', json.message || 'Błąd rejestracji');
        setLoading(false);
        return;
      }
      router.push('/onboarding/VerifyScreen');
    } catch {
      Alert.alert('Błąd', 'Nie udało się połączyć z serwerem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="h2" align="center" style={styles.title}>Potwierdzenie</Typography>
      <Typography variant="body1" align="center" color={colors.text.secondary} style={styles.text}>Sprawdź poprawność danych i przejdź dalej.</Typography>
      <Typography variant="body2" style={styles.text}>Email: {data.email}</Typography>
      <Typography variant="body2" style={styles.text}>Imię: {data.firstName}</Typography>
      <Typography variant="body2" style={styles.text}>Nazwisko: {data.lastName}</Typography>
      <Typography variant="body2" style={styles.text}>Nick: {data.nick}</Typography>
      <Typography variant="body2" style={styles.text}>Rola: {data.role}</Typography>
      <Typography variant="body2" style={styles.text}>Zgoda 1: {data.consent1 ? 'TAK' : 'NIE'}</Typography>
      <Typography variant="body2" style={styles.text}>Zgoda 2: {data.consent2 ? 'TAK' : 'NIE'}</Typography>
      <Button
        title={loading ? 'Wysyłanie...' : 'Wyślij i przejdź do weryfikacji'}
        onPress={handleNext}
        disabled={loading}
        style={styles.button}
      />
      <Button title="Usuń dane o stanie" onPress={handleReset} style={{ ...styles.button, marginTop: 12 }} variant="secondary" />
    </View>
  );
}


export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.dark,
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  text: {
    marginBottom: spacing.sm,
    color: colors.text.primary,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.lg,
    width: 220,
    alignSelf: 'center',
  },
});