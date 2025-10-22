import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'fade',
        contentStyle: { backgroundColor: 'transparent' },
        fullScreenGestureEnabled: true
      }}
    >
      <Stack.Screen name="menu" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="class/[id]" />
    </Stack>
  );
}