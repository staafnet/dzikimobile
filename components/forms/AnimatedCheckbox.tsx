import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing } from '../../constants/theme';
import { Typography } from '../Typography';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const AnimatedCheckbox = ({
  label,
  checked,
  onChange,
  error,
}: CheckboxProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const checkboxStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      checked ? colors.primary : colors.background.surface,
      { duration: 150 }
    ),
    borderColor: withTiming(
      error ? colors.state.error : checked ? colors.primary : colors.border.light,
      { duration: 150 }
    ),
    transform: [
      {
        scale: withSpring(isPressed ? 0.95 : 1, {
          damping: 15,
          stiffness: 100,
        }),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange(!checked)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={styles.row}
      >
        <Animated.View style={[styles.checkbox, checkboxStyle]}>
          {checked && (
            <Typography variant="body2" color={colors.text.inverse}>
              ✓
            </Typography>
          )}
        </Animated.View>
        <Typography 
          variant="body2" 
          color={colors.text.primary}
          style={styles.label}
        >
          {label}
        </Typography>
      </Pressable>
      {error && (
        <Typography 
          variant="caption" 
          color={colors.state.error}
          style={styles.error}
        >
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: spacing.md,
    flex: 1,
  },
  error: {
    marginTop: spacing.xs,
    marginLeft: spacing.lg + 24, // checkbox width + margin
  },
});