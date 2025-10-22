import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Platform,
  ScrollView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useOnboarding } from '../../contexts/OnboardingContext';
import logo from '../../assets/logo.png';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { AnimatedInput } from '../../components/forms/AnimatedInput';
import { colors, spacing } from '../../constants/theme';
import { AnimatedCheckbox } from '../../components/forms/AnimatedCheckbox';

export default function VerifyScreen() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);
  const router = useRouter();
  const { setOnboarded } = useAuth();
  const { data } = useOnboarding();
  const { width } = Dimensions.get('window');
  const logoSize = Math.min(Math.max(width * 0.45, 160), 280);
  
  // Animacje
  const [fade] = useState(() => new Animated.Value(0));
  const [contentAnim] = useState(() => new Animated.Value(0));
  const [logoAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(contentAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fade, contentAnim, logoAnim]);

  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = async () => {
    if (!canResend || resendLoading) return;

    setResendLoading(true);
    try {
      const res = await fetch('http://localhost:3000/onboarding/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!res.ok) {
        Alert.alert('Błąd', json.message || 'Nie udało się wysłać kodu');
        return;
      }
      setCanResend(false);
      setResendTimer(60); // 60 sekund cooldownu
      Alert.alert('Sukces', 'Nowy kod został wysłany na twój adres e-mail');
    } catch {
      Alert.alert('Błąd', 'Nie udało się połączyć z serwerem');
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code || !dataProcessingConsent || code.length !== 6) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/onboarding/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: data.email, 
          code,
          marketingConsent,
          dataProcessingConsent 
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        Alert.alert('Błąd', json.message || 'Błąd weryfikacji');
        setLoading(false);
        return;
      }
      await setOnboarded();
      router.replace('/menu');
    } catch {
      Alert.alert('Błąd', 'Nie udało się połączyć z serwerem');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.container, { opacity: fade }]}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Animated.View style={[styles.logoContainer, { opacity: logoAnim }]}>
              <Image
                source={logo}
                style={[styles.logo, { width: logoSize, height: logoSize }]}
                resizeMode="contain"
                accessible
                accessibilityRole="image"
                accessibilityLabel="Logo klubu Dziki Wschód Biała Podlaska"
              />
            </Animated.View>
            <Animated.View style={[styles.titleContainer, { opacity: contentAnim }]}>
              <Typography
                variant="h4"
                style={styles.title}
                accessibilityRole={Platform.OS === 'ios' ? undefined : 'header'}
              >
                Weryfikacja konta
              </Typography>
              <Typography style={styles.subtitle}>
                Na Twój adres email wysłaliśmy kod weryfikacyjny. Wpisz go poniżej, aby potwierdzić konto.
              </Typography>
            </Animated.View>

            <Animated.View style={[styles.formContainer, { opacity: contentAnim }]}>
              <View style={styles.inputContainer}>
                <AnimatedInput
                  label="Kod weryfikacyjny"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  maxLength={6}
                  textContentType="oneTimeCode"
                  style={styles.input}
                />
              </View>

              <View style={styles.consentContainer}>
                <AnimatedCheckbox
                  label="Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji usługi"
                  checked={dataProcessingConsent}
                  onChange={setDataProcessingConsent}
                  error={!dataProcessingConsent ? 'To pole jest wymagane' : undefined}
                />
                <AnimatedCheckbox
                  label="Wyrażam zgodę na otrzymywanie informacji marketingowych"
                  checked={marketingConsent}
                  onChange={setMarketingConsent}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Wstecz"
                  onPress={handleBack}
                  variant="outline"
                  style={styles.button}
                />
                <Button
                  title={canResend ? "Wyślij kod ponownie" : `Odczekaj ${resendTimer}s`}
                  onPress={handleResend}
                  style={{ ...styles.button, backgroundColor: colors.button.secondary }}
                  disabled={!canResend || resendLoading}
                  loading={resendLoading}
                />
                <Button
                  title={loading ? 'Weryfikuję...' : 'Dalej'}
                  onPress={handleVerify}
                  disabled={loading || !code || !dataProcessingConsent || code.length !== 6}
                  style={styles.button}
                />
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: spacing.md,
    width: '100%',
  },
  titleContainer: {
    marginBottom: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logo: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text.primary,
    textAlign: 'center',
    fontFamily: 'RubikMarkerHatch',
    fontSize: 32,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.text.secondary,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    paddingTop: 0,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  consentContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});