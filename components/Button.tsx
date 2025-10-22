import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/theme';
import { PressableScale } from './animations/PressableScale';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  title: string;
  loading?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(PressableScale);

export const Button = ({ 
  variant = 'primary',
  size = 'medium',
  title,
  loading,
  icon,
  style,
  disabled,
  onPress,
  ...props 
}: ButtonProps) => {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.button_disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.text_disabled,
  ];

  return (
    <AnimatedPressable 
      entering={FadeIn.duration(200)}
      style={buttonStyles} 
      disabled={disabled || loading}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            color={variant === 'outline' ? colors.primary : colors.text.primary} 
            size="small"
          />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button_primary: {
    backgroundColor: colors.button.primary,
  },
  button_secondary: {
    backgroundColor: colors.button.secondary,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  button_disabled: {
    backgroundColor: colors.button.disabled,
    opacity: 0.6,
  },
  button_small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  button_medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  button_large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  text: {
    fontFamily: 'RubikMarkerHatch',
    fontSize: 30,
    textAlign: 'center',
  },
  text_primary: {
    color: colors.text.primary,
  },
  text_secondary: {
    color: colors.text.primary,
  },
  text_outline: {
    color: colors.primary,
  },
  text_disabled: {
    color: colors.text.tertiary,
  },
  text_small: {
    fontSize: 18,
  },
  text_medium: {
    fontSize: 22,
  },
  text_large: {
    fontSize: 26,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
  loadingContainer: {
    padding: spacing.xs,
  },
});