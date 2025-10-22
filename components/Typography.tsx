import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { colors, typography } from '../constants/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption';
  color?: string;
  weight?: keyof typeof typography.weights;
  align?: 'left' | 'center' | 'right';
}

export const Typography = ({
  variant = 'body1',
  color = colors.text.primary,
  weight = 'regular' as const,
  align = 'left',
  style,
  children,
  ...props
}: TypographyProps) => {
  const textStyles = StyleSheet.flatten([
    styles[variant],
    { 
      color, 
      textAlign: align, 
      fontWeight: typography.weights[weight] as TextStyle['fontWeight']
    },
    style,
  ]);

  return (
    <Text 
      style={textStyles} 
      {...props}
      allowFontScaling={false}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.sizes.xxxl,
    fontFamily: typography.fonts.headingBold,
  },
  h2: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
  },
  h3: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.heading,
  },
  h4: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
  },
  body1: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
  },
  body2: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
  },
  caption: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.body,
  },
});