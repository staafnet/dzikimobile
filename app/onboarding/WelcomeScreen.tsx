import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
  Platform,
  AccessibilityInfo,
  Pressable,
  View,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';

import logo from '../../assets/logo.png';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors, spacing } from '../../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();



  // Animacje z obsługą preferencji ograniczania ruchu
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fade] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.96));
  const [slideUp] = useState(() => new Animated.Value(16));
  
  // Nowe animacje dla sekwencyjnego pojawiania się
  const [logoAnim] = useState(() => new Animated.Value(0));
  const [titleAnim] = useState(() => new Animated.Value(0));
  const [subtitleAnim] = useState(() => new Animated.Value(0));
  const [startTextAnim] = useState(() => new Animated.Value(0));
  const [startTextPulse] = useState(() => new Animated.Value(1));
  const [buttonAnim] = useState(() => new Animated.Value(0));
  const [rodoAnim] = useState(() => new Animated.Value(0));

  // Funkcja do pojedynczej animacji pulsowania
  const singlePulseAnimation = useCallback(() => {
    return Animated.sequence([
      Animated.timing(startTextPulse, {
        toValue: 1.1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(startTextPulse, {
        toValue: 1,
        duration: 1000,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
  }, [startTextPulse]);

  // Funkcja do zapętlonej animacji pulsowania
  const startPulseAnimation = useCallback(() => {
    if (reduceMotion) return;
    
    const animate = () => {
      singlePulseAnimation().start(() => {
        if (!reduceMotion) {
          animate();
        }
      });
    };
    
    animate();
  }, [reduceMotion, singlePulseAnimation]);
  
  // Stan dla animowanych tekstów
  const [animatedText1, setAnimatedText1] = useState('');
  const [animatedText2, setAnimatedText2] = useState('');
  const [animatedText3, setAnimatedText3] = useState('');
  const [animatedText4, setAnimatedText4] = useState('');
  const [currentTextPart, setCurrentTextPart] = useState(1);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion).catch(() => {});
  }, []);

  // Funkcja do animacji tekstu litera po literze z callback po zakończeniu
  const animateText = useCallback((text: string, partNumber: number, onComplete?: () => void) => {
    let currentText = '';
    const setTextForPart = (text: string) => {
      switch (partNumber) {
        case 1: setAnimatedText1(text); break;
        case 2: setAnimatedText2(text); break;
        case 3: setAnimatedText3(text); break;
        case 4: setAnimatedText4(text); break;
      }
    };

    const textInterval = setInterval(() => {
      if (currentText.length < text.length) {
        currentText += text[currentText.length];
        setTextForPart(currentText);
      } else {
        clearInterval(textInterval);
        setCurrentTextPart(prev => Math.min(prev + 1, 4));
        onComplete?.();
      }
    }, 40); // Nieco szybsze pisanie dla lepszego efektu

    return () => clearInterval(textInterval); // Cleanup funkcji
  }, [setAnimatedText1, setAnimatedText2, setAnimatedText3, setAnimatedText4, setCurrentTextPart]);

  const welcomeTexts = React.useMemo(() => [
    "         Twoja droga do mistrzostwa",
    "w sztukach walki zaczyna się tutaj.",
    "                 Dołącz do społeczności",
    "             prawdziwych wojowników."
  ], []);

  // Funkcja do animacji wszystkich części tekstu
  const animateAllTexts = useCallback((onComplete?: () => void) => {
    const animateNextPart = (partIndex: number) => {
      if (partIndex >= welcomeTexts.length) {
        onComplete?.();
        return;
      }
      
      animateText(welcomeTexts[partIndex], partIndex + 1, () => {
        setTimeout(() => {
          animateNextPart(partIndex + 1);
        }, 200); // Większe opóźnienie między częściami dla lepszego efektu
      });
    };

    animateNextPart(0);
  }, [welcomeTexts, animateText]);

  // Osobny useEffect do obsługi animacji
  useEffect(() => {
    if (reduceMotion) {
      // Natychmiastowe ustawienie wartości dla preferencji ograniczonego ruchu
      logoAnim.setValue(1);
      titleAnim.setValue(1);
      subtitleAnim.setValue(1);
      startTextAnim.setValue(1);
      buttonAnim.setValue(1);
      rodoAnim.setValue(1);
      fade.setValue(1);
      scale.setValue(1);
      slideUp.setValue(0);
      // Ustawiamy wszystkie teksty bez animacji
      requestAnimationFrame(() => {
        setAnimatedText1(welcomeTexts[0]);
        setAnimatedText2(welcomeTexts[1]);
        setAnimatedText3(welcomeTexts[2]);
        setAnimatedText4(welcomeTexts[3]);
        setCurrentTextPart(4);
      });
      return;
    }

    // Resetowanie stanu animacji
    logoAnim.setValue(0);
    titleAnim.setValue(0);
    subtitleAnim.setValue(0);
    buttonAnim.setValue(0);
    fade.setValue(0);
    scale.setValue(0.96);
    slideUp.setValue(16);

    // Sekwencja animacji
    Animated.sequence([
      // Najpierw płynne pojawienie się tła
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
      // Następnie powolne wyświetlenie logo
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Potem powolne wyświetlenie tytułu
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Animacja kontenera subtytułu
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Po zakończeniu głównych animacji, rozpocznij animację tekstów
      animateAllTexts(() => {
        // Po zakończeniu animacji wszystkich tekstów, pokaż pozostałe elementy
        Animated.parallel([
          Animated.timing(startTextAnim, {
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
          Animated.timing(rodoAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Rozpocznij pulsowanie po pojawieniu się tekstu
          startPulseAnimation();
        });
      });
    });
  }, [
    reduceMotion, 
    logoAnim, 
    titleAnim, 
    subtitleAnim, 
    buttonAnim, 
    startTextAnim, 
    rodoAnim, 
    fade, 
    scale, 
    slideUp, 
    startPulseAnimation, 
    welcomeTexts, 
    animateAllTexts
  ]);

  const { width } = Dimensions.get('window');
  const logoSize = Math.min(Math.max(width * 0.45, 160), 280); // responsywne, ale ograniczone

  return (
    <Animated.View
        style={[
          styles.container,
          {
            opacity: fade,
            transform: [{ translateY: slideUp }, { scale }],
          },
        ]}
      >
        <Animated.View style={{ opacity: logoAnim }}>
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
              fontSize: 24
            }}
            accessibilityRole={Platform.OS === 'ios' ? undefined : 'header'}
          >
            Witaj w aplikacji klubu
          </Typography>
          <Typography
            variant="h4"
            style={{ 
              color: colors.primary, 
              textAlign: 'center', 
              marginVertical: spacing.xs,
              fontFamily: 'RubikMarkerHatch',
              fontSize: 38
            }}
          >
            DZIKI WSCHÓD
          </Typography>
          <Typography
            variant="h4"
            style={{ 
              color: colors.text.primary, 
              textAlign: 'center',
              fontFamily: 'RubikMarkerHatch',
              fontSize: 24
            }}
          >
            Biała Podlaska
          </Typography>
        </Animated.View>

        <Animated.View style={[{ opacity: subtitleAnim }, styles.subtitleContainer]}>
          <View style={styles.subtitleInnerContainer}>
            <Typography
              variant="body1"
              color={colors.text.primary}
              align="left"
              style={[
                styles.subtitleText,
                styles.subtitleTextAbsolute,
                { opacity: currentTextPart >= 1 ? 1 : 0, top: 0 }
              ]}
            >
              {animatedText1}
            </Typography>
            <Typography
              variant="body1"
              color={colors.text.primary}
              align="left"
              style={[
                styles.subtitleText,
                styles.subtitleTextAbsolute,
                { opacity: currentTextPart >= 2 ? 1 : 0, top: 24 }
              ]}
            >
              {animatedText2}
            </Typography>
            <Typography
              variant="body1"
              color={colors.text.primary}
              align="left"
              style={[
                styles.subtitleText,
                styles.subtitleTextAbsolute,
                { opacity: currentTextPart >= 3 ? 1 : 0, top: 48 }
              ]}
            >
              {animatedText3}
            </Typography>
            <Typography
              variant="body1"
              color={colors.text.primary}
              align="left"
              style={[
                styles.subtitleText,
                styles.subtitleTextAbsolute,
                { opacity: currentTextPart >= 4 ? 1 : 0, top: 72 }
              ]}
            >
              {animatedText4}
            </Typography>
          </View>
        </Animated.View>

        <Animated.View style={[
          { opacity: startTextAnim },
          {
            transform: [
              { scale: startTextPulse }
            ]
          }
        ]}>
          <Typography
            variant="h4"
            color={colors.text.primary}
            align="center"
            style={styles.startText}
          >
            Zanim zaczniemy, odpowiedz na kilka pytań.
          </Typography>
        </Animated.View>

        <Animated.View style={{ opacity: buttonAnim }}>
          <Button
            title="Rozpocznij"
            onPress={() => router.push('/onboarding/UserDataScreen')}
            style={styles.button}
          />
        </Animated.View>

        <Animated.View style={{ opacity: rodoAnim }}>
          <Typography
            variant="caption"
            color={colors.text.secondary}
            align="center"
            style={styles.securityNote}
          >
            Twoje bezpieczeństwo jest dla nas priorytetem.{'\n'}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography
                variant="caption"
                color={colors.text.secondary}
              >
                Wszystkie dane są chronione zgodnie z{' '}
              </Typography>
              <Pressable 
                onPress={() => router.push('../rodo')}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Typography
                  variant="caption"
                  style={{ 
                    textDecorationLine: 'underline',
                    color: '#007AFF'
                  }}
                >
                  RODO
                </Typography>
              </Pressable>
              <Typography
                variant="caption"
                color={colors.text.secondary}
              >
                .
              </Typography>
            </View>
          </Typography>
        </Animated.View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="caption"
            color={colors.text.secondary}
            style={{ fontFamily: 'System' }}
          >
            Created by{' '}
          </Typography>
          <Pressable 
            onPress={() => Linking.openURL('https://creanode.com')}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Typography
              variant="caption"
              style={{ 
                textDecorationLine: 'underline',
                color: '#007AFF',
                fontFamily: 'System'
              }}
            >
              CREANODE
            </Typography>
          </Pressable>
          <Typography
            variant="caption"
            color={colors.text.secondary}
            style={{ fontFamily: 'System' }}
          >
            {' '}© 2025 All rights reserved
          </Typography>
        </View>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.dark,
    ...(Platform.OS === 'android' && {
      windowTranslucentStatus: true,
      windowTranslucentNavigation: true,
    }),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.select({ ios: spacing.xl, default: spacing.lg }),
    paddingBottom: Platform.select({ ios: spacing.xl, default: spacing.lg }),
    paddingHorizontal: spacing.lg,
  },

  logo: {
    marginTop: spacing.xl * 2
  },
  title: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleContainer: {
    width: '100%',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  subtitleInnerContainer: {
    height: 96, // 4 linie tekstu * 24px wysokości
    position: 'relative',
  },
  subtitleText: {
    fontFamily: 'RubikMarkerHatch',
    fontSize: 16,
    lineHeight: 24,
  },
  subtitleTextAbsolute: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  startText: {
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  securityNote: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
  button: {
    width: 300,
    maxWidth: '90%',
    alignSelf: 'center',
  },
  copyright: {
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
});
