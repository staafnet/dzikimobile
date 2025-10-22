import React, { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface FadeInViewProps extends ViewProps {
  duration?: number;
  delay?: number;
}

export const FadeInView = ({ 
  children, 
  style,
  ...props 
}: FadeInViewProps) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[animatedStyle, style]} 
      {...props}
    >
      {children}
    </Animated.View>
  );
};

interface SlideInViewProps extends ViewProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: number;
  duration?: number;
  delay?: number;
}

export const SlideInView = ({
  children,
  direction = 'bottom',
  distance = 100,
  style,
  ...props
}: SlideInViewProps) => {
  const translation = useSharedValue(distance);

  useEffect(() => {
    translation.value = withSpring(0, {
      damping: 20,
      stiffness: 90,
    });
  }, [translation]);

  const animatedStyle = useAnimatedStyle(() => {
    let transform;
    switch (direction) {
      case 'left':
        transform = [{ translateX: translation.value }];
        break;
      case 'right':
        transform = [{ translateX: -translation.value }];
        break;
      case 'top':
        transform = [{ translateY: translation.value }];
        break;
      case 'bottom':
        transform = [{ translateY: -translation.value }];
        break;
    }
    return { transform };
  });

  return (
    <Animated.View 
      style={[animatedStyle, style]} 
      {...props}
    >
      {children}
    </Animated.View>
  );
};

interface ScaleInViewProps extends ViewProps {
  duration?: number;
  delay?: number;
}

export const ScaleInView = ({
  children,
  style,
  ...props
}: ScaleInViewProps) => {
  const scale = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
    });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View 
      style={[animatedStyle, style]} 
      {...props}
    >
      {children}
    </Animated.View>
  );
};