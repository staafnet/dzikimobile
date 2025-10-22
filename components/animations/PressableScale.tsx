import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, GestureResponderEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface PressableScaleProps extends TouchableOpacityProps {
  scaleAmount?: number;
}

export const PressableScale = ({
  children,
  scaleAmount = 0.95,
  onPressIn,
  onPressOut,
  ...props
}: PressableScaleProps) => {
  const scale = useSharedValue(1);

  const handlePressIn = (event: GestureResponderEvent) => {
    scale.value = withSpring(scaleAmount, {
      damping: 20,
      stiffness: 300,
    });
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.value = withSpring(1, {
      damping: 20,
      stiffness: 300,
    });
    onPressOut?.(event);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      {...props}
    >
      {children}
    </AnimatedTouchable>
  );
};