export const colors = {
  // Podstawowe kolory
  primary: '#FF1E1E', // Czerwony akcent
  secondary: '#1A1A1A', // Ciemny grafit
  
  // Tło
  background: {
    dark: '#000000',
    card: '#1A1A1A',
    surface: '#2C2C2C',
  },
  
  // Tekst
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#999999',
    inverse: '#000000',
  },
  
  // Stan
  state: {
    success: '#4CAF50',
    error: '#FF3B30',
    warning: '#FFC107',
    info: '#2196F3',
  },
  
  // Przyciski
  button: {
    primary: '#FF1E1E',
    secondary: '#2C2C2C',
    disabled: '#666666',
  },
  
  // Obramowania
  border: {
    light: '#333333',
    dark: '#1A1A1A',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
  fonts: {
    heading: 'RubikMarkerHatch',
    headingBold: 'RubikMarkerHatch',
    body: 'RubikMarkerHatch',
    bodyMedium: 'RubikMarkerHatch',
  }
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};