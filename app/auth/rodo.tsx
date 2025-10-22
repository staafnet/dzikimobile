import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors, spacing } from '../../constants/theme';

export default function RODOScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Typography
          variant="h4"
          style={styles.title}
          color={colors.text.primary}
        >
          Polityka Prywatności i RODO
        </Typography>

        <Typography
          variant="body1"
          style={styles.section}
          color={colors.text.primary}
        >
          1. Administrator Danych{'\n'}
          Administratorem Twoich danych osobowych jest klub sportowy Dziki Wschód Biała Podlaska.
        </Typography>

        <Typography
          variant="body1"
          style={styles.section}
          color={colors.text.primary}
        >
          2. Cele Przetwarzania{'\n'}
          • Realizacja usług członkowskich{'\n'}
          • Informowanie o zajęciach i wydarzeniach{'\n'}
          • Kontakt w sprawach organizacyjnych{'\n'}
          • Zapewnienie bezpieczeństwa podczas zajęć
        </Typography>

        <Typography
          variant="body1"
          style={styles.section}
          color={colors.text.primary}
        >
          3. Podstawa Prawna{'\n'}
          Przetwarzanie danych odbywa się na podstawie:{'\n'}
          • Wyrażonej przez Ciebie zgody{'\n'}
          • Realizacji umowy członkowskiej{'\n'}
          • Prawnie uzasadnionego interesu administratora
        </Typography>

        <Typography
          variant="body1"
          style={styles.section}
          color={colors.text.primary}
        >
          4. Twoje Prawa{'\n'}
          Masz prawo do:{'\n'}
          • Dostępu do swoich danych{'\n'}
          • Sprostowania danych{'\n'}
          • Usunięcia danych{'\n'}
          • Ograniczenia przetwarzania{'\n'}
          • Przenoszenia danych{'\n'}
          • Wniesienia sprzeciwu
        </Typography>

        <Typography
          variant="body1"
          style={styles.section}
          color={colors.text.primary}
        >
          5. Okres Przechowywania{'\n'}
          Dane będą przechowywane przez okres niezbędny do realizacji celów, a po tym czasie przez okres wymagany przepisami prawa.
        </Typography>

        <Typography
          variant="body1"
          style={styles.section}
          color={colors.text.primary}
        >
          6. Bezpieczeństwo{'\n'}
          Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe.
        </Typography>

        <Button
          title="Powrót"
          onPress={() => router.back()}
          style={styles.button}
          variant="primary"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    marginVertical: spacing.xl,
    textAlign: 'center',
    fontFamily: 'System',
  },
  section: {
    marginBottom: spacing.lg,
    fontFamily: 'System',
  },
  button: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});