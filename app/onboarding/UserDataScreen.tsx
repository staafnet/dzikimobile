import React, { useEffect, useState, useRef } from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardEvent,
} from 'react-native';

import logo from '../../assets/logo.png';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors, spacing } from '../../constants/theme';
import { AnimatedInput } from '../../components/forms/AnimatedInput';
import { useOnboarding } from '../../contexts/OnboardingContext';

export default function UserDataScreen() {
  const router = useRouter();
  const { setData } = useOnboarding();
  const { width } = Dimensions.get('window');
  const logoSize = Math.min(Math.max(width * 0.45, 160), 280);
  const scrollViewRef = useRef<ScrollView>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [fade] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.96));
  const [slideUp] = useState(() => new Animated.Value(16));
  const [titleAnim] = useState(() => new Animated.Value(0));
  const [formAnim] = useState(() => new Animated.Value(0));
  const [buttonAnim] = useState(() => new Animated.Value(0));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [keyboardHeight] = useState(new Animated.Value(0));

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
      titleAnim.setValue(1);
      formAnim.setValue(1);
      buttonAnim.setValue(1);
      fade.setValue(1);
      scale.setValue(1);
      slideUp.setValue(0);
      return;
    }

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
  }, [reduceMotion, titleAnim, formAnim, buttonAnim, fade, scale, slideUp]);

  const isFormValid = 
    firstName && 
    lastName && 
    phoneNumber && 
    /^\d{9}$/.test(phoneNumber);

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }
    setData(prev => ({ ...prev, firstName, lastName, nick: nickname, phoneNumber: `+48${phoneNumber}` }));
    router.push('/onboarding/UserRoleScreen');
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
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fade,
                transform: [{ translateY: slideUp }, { scale }],
              },
            ]}
          >
            <View>
              <Image
                source={logo}
                style={[styles.logo, { width: logoSize, height: logoSize }]}
                resizeMode="contain"
                accessible
                accessibilityRole="image"
                accessibilityLabel="Logo klubu Dziki Wschód Biała Podlaska"
              />
            </View>
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
                Dane osobowe
              </Typography>
            </Animated.View>

            <Animated.View style={{ opacity: formAnim, width: '100%' }}>
              <View style={styles.inputContainer}>
                <View style={styles.phoneInputContainer}>
                  <View style={styles.phonePrefix}>
                    <Typography 
                      variant="body1" 
                      color={colors.text.primary}
                      style={{ fontSize: 18, marginTop: 4 }}
                    >
                      +48
                    </Typography>
                  </View>
                  <View style={styles.phoneInput}>
                    <AnimatedInput
                      label="Numer telefonu *"
                      value={phoneNumber}
                      onChangeText={(text) => setPhoneNumber(text.replace(/\D/g, '').slice(0, 9))}
                      keyboardType="number-pad"
                      style={[styles.input, { color: '#FFFFFF', fontSize: 18 }]}
                      maxLength={9}
                      onFocus={() => {
                        if (scrollViewRef.current) {
                          setTimeout(() => {
                            scrollViewRef.current?.scrollTo({ y: 200, animated: true });
                          }, 50);
                        }
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <AnimatedInput
                  label="Wprowadź swoje imię *"
                  value={firstName}
                  onChangeText={setFirstName}
                  style={[styles.input, { color: '#FFFFFF', fontSize: 18 }]}
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollTo({ y: 250, animated: true });
                      }, 50);
                    }
                  }}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <AnimatedInput
                  label="Wprowadź swoje nazwisko *"
                  value={lastName}
                  onChangeText={setLastName}
                  style={[styles.input, { color: '#FFFFFF', fontSize: 18 }]}
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollTo({ y: 300, animated: true });
                      }, 50);
                    }
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <AnimatedInput
                  label="Wprowadź swój pseudonim (opcjonalnie)"
                  value={nickname}
                  onChangeText={setNickname}
                  style={[styles.input, { color: '#FFFFFF', fontSize: 18 }]}
                  onFocus={() => {
                    if (scrollViewRef.current) {
                      setTimeout(() => {
                        scrollViewRef.current?.scrollTo({ y: 350, animated: true });
                      }, 50);
                    }
                  }}
                />
              </View>
            </Animated.View>

            <Animated.View style={{ opacity: buttonAnim }}>
              <Button
                title="Dalej"
                onPress={handleSubmit}
                style={styles.button}
                disabled={!isFormValid}
              />
            </Animated.View>
          </Animated.View>
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

  phoneInputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  phonePrefix: {
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 56,
  },
  phoneInput: {
    flex: 1,
  },
  title: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    maxWidth: '90%',
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
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
});