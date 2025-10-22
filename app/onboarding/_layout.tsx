import { Stack } from 'expo-router';
import { OnboardingProvider } from '../../contexts/OnboardingContext';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
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
        <Stack.Screen name="WelcomeScreen" />
        <Stack.Screen name="UserDataScreen" />
        <Stack.Screen name="UserRoleScreen" />
        <Stack.Screen name="RegisterScreen" />
        <Stack.Screen name="ConfirmScreen" />
        <Stack.Screen name="VerifyScreen" />
      </Stack>
    </OnboardingProvider>
  );
}