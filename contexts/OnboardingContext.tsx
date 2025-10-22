import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type OnboardingData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nick: string;
  role: string;
  consent1: boolean;
  consent2: boolean;
};

type OnboardingContextType = {
  data: OnboardingData;
  setData: Dispatch<SetStateAction<OnboardingData>>;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    nick: '',
    role: '',
    consent1: false,
    consent2: false,
  });
  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
