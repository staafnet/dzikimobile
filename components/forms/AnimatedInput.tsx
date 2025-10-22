import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import { colors, spacing } from '../../constants/theme';
import { Typography } from '../Typography';
import { ShakeView } from '../animations/EffectViews';

interface AnimatedInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
}

export const AnimatedInput = ({ 
  label, 
  error, 
  touched,
  value,
  onFocus,
  onBlur,
  ...props 
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const labelPosition = useDerivedValue(() => {
    if (isFocused || value) {
      return withSpring(-40, {
        damping: 15,
        stiffness: 100,
      });
    }
    return withSpring(2, {
      damping: 15,
      stiffness: 100,
    });
  }, [isFocused, value]);

  const labelScale = useDerivedValue(() => {
    if (isFocused || value) {
      return withSpring(0.8, {
        damping: 15,
        stiffness: 100,
      });
    }
    return withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
  }, [isFocused, value]);

  const borderColor = useDerivedValue(() => {
    if (error && touched) {
      return withTiming(colors.state.error);
    }
    if (isFocused) {
      return withTiming(colors.primary);
    }
    return withTiming(colors.border.light);
  }, [isFocused, error, touched]);

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: labelPosition.value },
      { scale: labelScale.value },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus({} as TextInputProps['onFocus'] extends ((e: infer E) => void) ? E : never);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur({} as TextInputProps['onBlur'] extends ((e: infer E) => void) ? E : never);
    }
  };

  return (
    <ShakeView isShaking={!!error && touched}>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.container, containerStyle]}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text.primary,
                  fontSize: 24,
                  fontWeight: '600'
                }
              ]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              placeholderTextColor={colors.text.tertiary}
              selectionColor={colors.text.primary}
              {...props}
            />
          </View>
          <Animated.View style={[styles.labelContainer, labelStyle]}>
            <Typography 
              variant="body2" 
              color={error && touched ? colors.state.error : colors.text.secondary}
            >
              {label}
            </Typography>
          </Animated.View>
        </Animated.View>
        {error && touched && (
          <Typography 
            variant="caption" 
            color={colors.state.error}
            style={styles.error}
          >
            {error}
          </Typography>
        )}
      </View>
    </ShakeView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  container: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.background.surface,
    paddingHorizontal: spacing.md,
    height: 56,
    position: 'relative',
    zIndex: 1,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 4,
    paddingTop: 16,
    zIndex: 2,
  },
  labelContainer: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    zIndex: 0,
    width: '100%',
    pointerEvents: 'none',
  },
  input: {
    height: 30,
    paddingTop: 8,
  },
  error: {
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
});