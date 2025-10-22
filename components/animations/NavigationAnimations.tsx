import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useSharedValue,
} from 'react-native-reanimated';

interface ModalAnimationProps {
  children: React.ReactNode;
  visible: boolean;
}

export const ModalAnimation = ({ children, visible }: ModalAnimationProps) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      scale.value = withSpring(0);
      opacity.value = withTiming(0);
    }
  }, [visible, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.modalContainer, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

interface DrawerAnimationProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const DrawerAnimation = ({ children, isOpen }: DrawerAnimationProps) => {
  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withSpring(isOpen ? 0 : -300, {
      damping: 20,
      stiffness: 90,
    });
  }, [isOpen, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.drawerContainer, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

interface ToastAnimationProps {
  children: React.ReactNode;
  visible: boolean;
  position?: 'top' | 'bottom';
}

export const ToastAnimation = ({ 
  children, 
  visible, 
  position = 'top' 
}: ToastAnimationProps) => {
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1);
    } else {
      translateY.value = withSpring(position === 'top' ? -100 : 100);
      opacity.value = withTiming(0);
    }
  }, [visible, translateY, opacity, position]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View 
      style={[
        styles.toastContainer, 
        position === 'top' ? styles.toastTop : styles.toastBottom,
        animatedStyle
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastTop: {
    top: 40,
  },
  toastBottom: {
    bottom: 40,
  },
});