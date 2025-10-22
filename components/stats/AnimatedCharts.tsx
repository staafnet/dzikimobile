import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);
import { colors, spacing } from '../../constants/theme';
import { Typography } from '../Typography';

interface AnimatedBarProps {
  value: number;
  maxValue: number;
  label?: string;
  color?: string;
  delay?: number;
  style?: ViewStyle;
}

export const AnimatedBar = ({
  value,
  maxValue,
  label,
  color = colors.primary,
  delay = 0,
  style,
}: AnimatedBarProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      progress.value = withSpring(value / maxValue, {
        damping: 15,
        stiffness: 100,
      });
    }, delay);
  }, [value, maxValue, delay, progress]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: color,
  }));

  return (
    <View style={[styles.barContainer, style]}>
      {label && (
        <Typography variant="caption" color={colors.text.secondary} style={styles.label}>
          {label}
        </Typography>
      )}
      <View style={styles.barBackground}>
        <Animated.View style={[styles.bar, barStyle]} />
      </View>
    </View>
  );
};

interface AnimatedCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  delay?: number;
  showLabel?: boolean;
}

export const AnimatedCircle = ({
  percentage,
  size = 100,
  strokeWidth = 10,
  color = colors.primary,
  delay = 0,
  showLabel = true,
}: AnimatedCircleProps) => {
  const progress = useSharedValue(0);
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);

  useEffect(() => {
    setTimeout(() => {
      progress.value = withTiming(percentage / 100, {
        duration: 1500,
      });
    }, delay);
  }, [percentage, delay, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: withSpring(
      interpolate(
        progress.value,
        [0, 1],
        [circumference, 0]
      )
    ),
  }));

  return (
    <View style={[styles.circleContainer, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke={colors.border.light}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedSvgCircle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </Svg>
      {showLabel && (
        <View style={styles.percentageLabel}>
          <Typography variant="h3" weight="bold">
            {Math.round(percentage)}%
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    marginVertical: spacing.xs,
  },
  label: {
    marginBottom: spacing.xs,
  },
  barBackground: {
    height: 8,
    backgroundColor: colors.background.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  circleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageLabel: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});