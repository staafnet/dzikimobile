import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  Platform,
  AccessibilityInfo,
  View,
  ScrollView,
  Image,
  Dimensions,
  KeyboardEvent,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Typography } from '../../components/Typography';
import { useRouter } from 'expo-router';
import logo from '../../assets/logo.png';
import googleSignIn from '../../assets/google-signin.png';
import facebookSignIn from '../../assets/facebook-signin.png';

import { Button } from '../../components/Button';
import { colors, spacing } from '../../constants/theme';
import { AnimatedInput } from '../../components/forms/AnimatedInput';
import { useOnboarding } from '../../contexts/OnboardingContext';


export default function RegisterScreen() {
  const router = useRouter();
  const { data: formData, setData } = useOnboarding();
  const { width } = Dimensions.get('window');
  const logoSize = Math.min(Math.max(width * 0.45, 160), 280);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Animacje
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fade] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.96));
  const [slideUp] = useState(() => new Animated.Value(16));
  const [titleAnim] = useState(() => new Animated.Value(0));
  const [formAnim] = useState(() => new Animated.Value(0));
  const [buttonAnim] = useState(() => new Animated.Value(0));
  const [keyboardHeight] = useState(new Animated.Value(0));

  // Form state
  const [email, setEmail] = useState(formData?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion).catch(() => {});

    const keyboardWillShow = (e: KeyboardEvent) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    };

    const keyboardWillHide = (e: KeyboardEvent) => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight]);

  useEffect(() => {
    if (reduceMotion) {
      fade.setValue(1);
      scale.setValue(1);
      slideUp.setValue(0);
      titleAnim.setValue(1);
      formAnim.setValue(1);
      buttonAnim.setValue(1);
    } else {
      titleAnim.setValue(0);
      formAnim.setValue(0);
      buttonAnim.setValue(0);
      fade.setValue(0);
      scale.setValue(0.96);
      slideUp.setValue(16);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(fade, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(slideUp, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
        ]),
        Animated.timing(titleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(formAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fade, scale, slideUp, titleAnim, formAnim, buttonAnim, reduceMotion]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const isFormValid = 
    email && 
    password && 
    confirmPassword && 
    emailRegex.test(email) && 
    password === confirmPassword;

  const handleContinue = () => {
    if (!isFormValid) {
      return;
    }
    setData({ ...formData, email, password });
    router.push('/onboarding/VerifyScreen');
  };

  const handleBack = () => {
    router.back();
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook login
    console.log('Facebook login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.mainContainer, { paddingBottom: keyboardHeight }]}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Animated.View style={{ opacity: fade }}>
              <Image
                source={logo}
                style={[styles.logo, { width: logoSize, height: logoSize }]}
                resizeMode="contain"
                accessible
                accessibilityRole="image"
                accessibilityLabel="Logo klubu Dziki Wschód Biała Podlaska"
              />
            </Animated.View>
            <Animated.View style={[styles.title, { opacity: titleAnim }]}>
              <Typography
                variant="h4"
                style={{ 
                  color: colors.text.primary, 
                  textAlign: 'center',
                  fontFamily: 'RubikMarkerHatch',
                  fontSize: 32
                }}
                accessibilityRole={Platform.OS === 'ios' ? undefined : 'header'}
              >
                Stwórz konto
              </Typography>
            </Animated.View>

            <Animated.View style={{ opacity: formAnim, width: '100%' }}>
              <View style={styles.inputContainer}>
                <AnimatedInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollTo({ y: 200, animated: true });
                      }, 50);
                    }
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <AnimatedInput
                  label="Hasło"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollTo({ y: 250, animated: true });
                      }, 50);
                    }
                  }}
                />
              </View>
              <View style={styles.lastInputContainer}>
                <AnimatedInput
                  label="Potwierdź hasło"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  style={styles.input}
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollTo({ y: 300, animated: true });
                      }, 50);
                    }
                  }}
                />
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.buttonContainer,
                { opacity: buttonAnim }
              ]}
            >
              <View style={styles.socialButtons}>
                <TouchableWithoutFeedback onPress={handleGoogleLogin}>
                  <Image 
                    source={googleSignIn} 
                    style={styles.socialButton}
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleFacebookLogin}>
                  <Image 
                    source={facebookSignIn} 
                    style={styles.socialButton}
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.buttons}>
                <Button
                  title="Wstecz"
                  onPress={handleBack}
                  variant="outline"
                  style={styles.button}
                />
                <Button
                  title="Dalej"
                  onPress={handleContinue}
                  disabled={!isFormValid}
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
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingBottom: Platform.select({ ios: spacing.xl, default: spacing.lg }),
    paddingHorizontal: spacing.lg,
  },
  logo: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },

  title: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: spacing.md,
    width: '100%',
  },
  lastInputContainer: {
    width: '100%',
  },
  input: {
    paddingTop: 0,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  inputLabel: {
    marginBottom: spacing.xs,
    fontSize: 16,
    fontFamily: 'RubikMarkerHatch',
  },
  buttonContainer: {
    gap: spacing.xl,
    marginTop: 0,
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  socialButton: {
    height: 50,
    width: 160,
  },
});
