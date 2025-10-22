import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/auth/AuthContext';

export default function Index() {
  const { isAuthenticated, hasOnboarded } = useAuth();

  if (!hasOnboarded) {
    return <Redirect href="/onboarding/WelcomeScreen" />;
  }

  if (isAuthenticated) {
    return <Redirect href="/main/menu" />;
  }

  return <Redirect href="/auth/login" />;
}