import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  type SharedValue,
} from 'react-native-reanimated';

interface ListItemAnimationProps {
  children: React.ReactNode;
  index: number;
}

export const ListItemAnimation = ({ 
  children, 
  index 
}: ListItemAnimationProps) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 100;
    
    setTimeout(() => {
      translateY.value = withSpring(0, {
        damping: 12,
        stiffness: 100,
      });
    }, delay);
    
    setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
    }, delay);
  }, [index, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

interface ScrollAnimationProps {
  children: React.ReactNode;
  scrollY: SharedValue<number>;
  inputRange?: number[];
  outputRange?: number[];
}

export const ParallaxImage = ({ 
  children, 
  scrollY,
  inputRange = [0, 100],
  outputRange = [0, 50],
}: ScrollAnimationProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: interpolate(
        scrollY.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

interface FadeScrollViewProps {
  children: React.ReactNode;
  scrollY: SharedValue<number>;
  threshold?: number;
}

export const FadeScrollView = ({ 
  children, 
  scrollY,
  threshold = 100 
}: FadeScrollViewProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, threshold],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};