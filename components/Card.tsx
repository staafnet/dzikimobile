import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, borderRadius, shadows } from '../constants/theme';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card = ({ 
  variant = 'elevated',
  style,
  children,
  ...props 
}: CardProps) => {
  return (
    <View style={[styles.card, styles[variant], style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: 16,
  },
  elevated: {
    backgroundColor: colors.background.card,
    ...shadows.medium,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filled: {
    backgroundColor: colors.background.surface,
  },
});