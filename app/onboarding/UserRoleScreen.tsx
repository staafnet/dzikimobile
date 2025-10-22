import React, { useState, useEffect } from 'react';
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
} from 'react-native';

import logo from '../../assets/logo.png';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors, spacing } from '../../constants/theme';
import { AnimatedRadioGroup } from '../../components/forms/AnimatedRadioGroup';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useRouter } from 'expo-router';

export default function UserRoleScreen() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const logoSize = Math.min(Math.max(width * 0.45, 160), 280);

  // Inicjalizacja stanu z danymi z kontekstu
  const [role, setRole] = useState(data.role || '');

  const [reduceMotion, setReduceMotion] = useState(false);
  const [fade] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.96));
  const [slideUp] = useState(() => new Animated.Value(16));
  const [titleAnim] = useState(() => new Animated.Value(0));
  const [formAnim] = useState(() => new Animated.Value(0));
  const [buttonAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion).catch(() => {});
  }, []);

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

  const isFormValid = !!role;

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }
    setData({ ...data, role });
    router.push('/onboarding/RegisterScreen');
  };

  const handleBack = () => {
    // Zachowaj wybrane dane przed powrotem
    if (role) {
      setData(prev => ({ ...prev, role }));
    }
    router.back();
  };

  return (
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
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
              Wybierz swoją rolę
            </Typography>
          </Animated.View>

          <Animated.View style={{ opacity: formAnim, width: '100%' }}>
            <View style={styles.inputContainer}>
              <AnimatedRadioGroup
                options={[
                  { label: 'Zawodnik', value: 'athlete' },
                  { label: 'Rodzic/Opiekun', value: 'parent' },
                  { label: 'Kibic', value: 'fan' },
                  { label: 'Trener', value: 'coach' }
                ]}
                value={role}
                onChange={setRole}
              />
            </View>
          </Animated.View>

          <Animated.View style={{ opacity: buttonAnim, width: '100%' }}>
            <View style={styles.buttons}>
              <Button
                title="Wstecz"
                onPress={handleBack}
                variant="outline"
                style={styles.button}
              />
              <Button
                title="Dalej"
                onPress={handleSubmit}
                disabled={!isFormValid}
                style={styles.button}
              />
            </View>
          </Animated.View>
        </Animated.View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  logo: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
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

  title: {
    marginBottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  button: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: spacing.md,
    width: '100%',
  },
});