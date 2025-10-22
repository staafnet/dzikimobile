import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Typography } from '../Typography';
import { AnimatedInput } from '../forms/AnimatedInput';
import { AnimatedCheckbox } from '../forms/AnimatedCheckbox';
import { AnimatedRadioGroup } from '../forms/AnimatedRadioGroup';
import { Button } from '../Button';
import { FadeInView, SlideInView } from '../animations/AnimatedViews';

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  level: string;
  hasGi: boolean;
  acceptRules: boolean;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

const EXPERIENCE_LEVELS = [
  { label: 'Początkujący (0-6 miesięcy)', value: 'beginner' },
  { label: 'Średniozaawansowany (6-18 miesięcy)', value: 'intermediate' },
  { label: 'Zaawansowany (18+ miesięcy)', value: 'advanced' },
];

export const BookingForm = ({ onSubmit, onCancel }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    level: '',
    hasGi: false,
    acceptRules: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    level: false,
    acceptRules: false,
  });

    const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name) {
      newErrors.name = 'Imię i nazwisko jest wymagane';
    }

    if (!formData.phone) {
      newErrors.phone = 'Numer telefonu jest wymagany';
    } else if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Nieprawidłowy numer telefonu';
    }

    if (!formData.email) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy adres email';
    }

    if (!formData.level) {
      newErrors.level = 'Wybierz poziom doświadczenia';
    }

    if (!formData.acceptRules) {
      newErrors.acceptRules = formData.acceptRules ? undefined : 'Musisz zaakceptować regulamin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setTouched({
      name: true,
      phone: true,
      email: true,
      level: true,
      acceptRules: true,
    });

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SlideInView direction="top">
        <Typography variant="h2" weight="bold" style={styles.title}>
          Zapisz się na zajęcia
        </Typography>
      </SlideInView>

      <View style={styles.form}>
        <FadeInView delay={200}>
          <AnimatedInput
            label="Imię i nazwisko"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            onBlur={() => setTouched({ ...touched, name: true })}
            error={errors.name}
            touched={touched.name}
          />
        </FadeInView>

        <FadeInView delay={300}>
          <AnimatedInput
            label="Numer telefonu"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            onBlur={() => setTouched({ ...touched, phone: true })}
            error={errors.phone}
            touched={touched.phone}
            keyboardType="phone-pad"
          />
        </FadeInView>

        <FadeInView delay={400}>
          <AnimatedInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            onBlur={() => setTouched({ ...touched, email: true })}
            error={errors.email}
            touched={touched.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </FadeInView>

        <FadeInView delay={500}>
          <View style={styles.section}>
            <Typography variant="h4" weight="bold" style={styles.sectionTitle}>
              Poziom doświadczenia
            </Typography>
            <AnimatedRadioGroup
              options={EXPERIENCE_LEVELS}
              value={formData.level}
              onChange={(value) => setFormData({ ...formData, level: value })}
              error={touched.level ? errors.level : undefined}
            />
          </View>
        </FadeInView>

        <FadeInView delay={600}>
          <AnimatedCheckbox
            label="Posiadam gi (kimono) do BJJ"
            checked={formData.hasGi}
            onChange={(checked) => setFormData({ ...formData, hasGi: checked })}
          />
        </FadeInView>

        <FadeInView delay={700}>
          <AnimatedCheckbox
            label="Akceptuję regulamin zajęć i zasady bezpieczeństwa"
            checked={formData.acceptRules}
            onChange={(checked) => {
              setFormData({ ...formData, acceptRules: checked });
              setTouched({ ...touched, acceptRules: true });
            }}
            error={touched.acceptRules ? errors.acceptRules : undefined}
          />
        </FadeInView>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Anuluj"
          variant="secondary"
          onPress={onCancel}
          style={styles.buttonCancel}
        />
        <Button
          title="Zapisz się"
          onPress={handleSubmit}
          style={styles.buttonSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  title: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  form: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  buttons: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  buttonCancel: {
    flex: 1,
    marginRight: spacing.sm,
  },
  buttonSubmit: {
    flex: 1,
    marginLeft: spacing.sm,
  },
});