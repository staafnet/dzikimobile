import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ShakeViewProps {
  children: React.ReactNode;
  isShaking?: boolean;
}

export const ShakeView = ({ children, isShaking }: ShakeViewProps) => {
  const offset = useSharedValue(0);

  useEffect(() => {
    if (isShaking) {
      offset.value = withSequence(
        withTiming(-3, { duration: 50 }),
        withRepeat(
          withTiming(3, { duration: 100 }),
          4,
          true
        ),
        withTiming(0, { duration: 50 })
      );
    }
  }, [isShaking, offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

interface PulseViewProps {
  children: React.ReactNode;
  isPulsing?: boolean;
  scale?: number;
  duration?: number;
}

export const PulseView = ({ 
  children, 
  isPulsing = true, 
  scale = 1.1, 
  duration = 1000 
}: PulseViewProps) => {
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (isPulsing) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(scale, { duration: duration / 2 }),
          withTiming(1, { duration: duration / 2 })
        ),
        -1,
        true
      );
    }
  }, [isPulsing, pulseScale, scale, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

interface RotateViewProps {
  children: React.ReactNode;
  isRotating?: boolean;
  duration?: number;
}

export const RotateView = ({ 
  children, 
  isRotating = true, 
  duration = 2000 
}: RotateViewProps) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isRotating) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration,
          easing: Easing.linear,
        }),
        -1
      );
    }
  }, [isRotating, rotation, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ 
      rotate: `${rotation.value}deg` 
    }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

interface BounceViewProps {
  children: React.ReactNode;
  isBouncing?: boolean;
  height?: number;
}

export const BounceView = ({ 
  children, 
  isBouncing = true, 
  height = 10 
}: BounceViewProps) => {
  const bounce = useSharedValue(0);

  useEffect(() => {
    if (isBouncing) {
      bounce.value = withRepeat(
        withSequence(
          withSpring(-height),
          withSpring(0)
        ),
        -1,
        true
      );
    }
  }, [isBouncing, bounce, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};