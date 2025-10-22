import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing } from '../../constants/theme';
import { Typography } from '../Typography';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const AnimatedRadioGroup = ({
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <AnimatedRadio
          key={option.value}
          label={option.label}
          checked={option.value === value}
          onPress={() => onChange(option.value)}
        />
      ))}
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

interface RadioProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

const AnimatedRadio = ({ label, checked, onPress }: RadioProps) => {
  const outerCircleStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      checked ? colors.primary : colors.border.light,
      { duration: 150 }
    ),
    transform: [
      {
        scale: withSpring(checked ? 1.05 : 1, {
          damping: 15,
          stiffness: 100,
        }),
      },
    ],
  }));

  const innerCircleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(checked ? 1 : 0, {
          damping: 15,
          stiffness: 100,
        }),
      },
    ],
    opacity: withTiming(checked ? 1 : 0, { duration: 150 }),
  }));

  return (
    <Pressable onPress={onPress} style={styles.option}>
      <Animated.View style={[styles.outerCircle, outerCircleStyle]}>
        <Animated.View style={[styles.innerCircle, innerCircleStyle]} />
      </Animated.View>
      <Typography 
        variant="body2" 
        color={colors.text.primary}
        style={styles.label}
      >
        {label}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  label: {
    marginLeft: spacing.md,
  },
  error: {
    marginTop: spacing.xs,
  },
});