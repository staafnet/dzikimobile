import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';

interface Props {
  onPress: () => void;
}

export default function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 1,
  },
});
