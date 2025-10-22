import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Typography } from '../Typography';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PressableScale } from '../animations/PressableScale';

const { width } = Dimensions.get('window');
const CALENDAR_PADDING = spacing.md;
const DAY_WIDTH = (width - CALENDAR_PADDING * 2 - spacing.md * 6) / 7;

interface DayProps {
  day: number;
  isSelected?: boolean;
  hasEvents?: boolean;
  onPress?: () => void;
}

const AnimatedDay = ({
  day,
  isSelected,
  hasEvents,
  onPress,
}: DayProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isSelected ? 1.1 : 1, {
          damping: 15,
          stiffness: 100,
        }),
      },
    ],
    backgroundColor: withTiming(
      isSelected ? colors.primary : 'transparent',
      { duration: 200 }
    ),
  }));

  return (
    <PressableScale onPress={onPress}>
      <Animated.View style={[styles.dayContainer, animatedStyle]}>
        <Typography
          variant="body2"
          color={isSelected ? colors.text.inverse : colors.text.primary}
        >
          {day}
        </Typography>
        {hasEvents && <View style={styles.eventDot} />}
      </Animated.View>
    </PressableScale>
  );
};

interface TimeSlotProps {
  time: string;
  title: string;
  instructor: string;
  available: number;
  total: number;
  isBooked?: boolean;
  onPress?: () => void;
}

const AnimatedTimeSlot = ({
  time,
  title,
  instructor,
  available,
  total,
  isBooked,
  onPress,
}: TimeSlotProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isPressed ? 0.98 : 1, {
          damping: 15,
          stiffness: 100,
        }),
      },
    ],
    backgroundColor: withTiming(
      isBooked ? colors.primary : colors.background.surface,
      { duration: 200 }
    ),
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: withSpring(
      `${(available / total) * 100}%`,
      {
        damping: 15,
        stiffness: 100,
      }
    ),
  }));

  return (
    <PressableScale
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Animated.View style={[styles.timeSlotContainer, animatedStyle]}>
        <View style={styles.timeSlotHeader}>
          <Typography variant="body1" weight="bold">
            {time}
          </Typography>
          <Typography variant="body2" color={colors.text.secondary}>
            {available}/{total} miejsc
          </Typography>
        </View>

        <Typography variant="h4" style={styles.timeSlotTitle}>
          {title}
        </Typography>
        <Typography variant="body2" color={colors.text.secondary}>
          {instructor}
        </Typography>

        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>
      </Animated.View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: DAY_WIDTH,
    height: DAY_WIDTH,
    borderRadius: DAY_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.xs,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
  timeSlotContainer: {
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  timeSlotTitle: {
    marginBottom: spacing.xs,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.background.dark,
    borderRadius: 2,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});

export { AnimatedDay, AnimatedTimeSlot };