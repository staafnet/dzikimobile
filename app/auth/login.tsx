import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (phone === '+48111222333' && code === '000000') {
      router.push('/calendar');
    } else {
      alert('Nieprawidłowe dane testowe');
    }
  };

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem('has_onboarded');
    Alert.alert('Onboarding zresetowany', 'Uruchom ponownie aplikację, aby przetestować pierwsze uruchomienie.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <Text style={styles.subtitle}>Wpisz numer telefonu i kod SMS</Text>

      <TextInput
        style={styles.input}
        placeholder="Numer telefonu"
        placeholderTextColor="#666"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Kod SMS"
        placeholderTextColor="#666"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>

      <Button title="Resetuj onboarding (test)" onPress={resetOnboarding} color="#ff4444" />

      <Text style={styles.hint}>Dane testowe: +48111222333 / 000000</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#111',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  hint: {
    color: '#666',
    fontSize: 12,
    marginTop: 24,
    textAlign: 'center',
  },
});