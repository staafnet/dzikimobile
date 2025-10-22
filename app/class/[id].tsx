import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { colors } from '../../constants/theme';
import { SlideInView } from '../../components/animations/AnimatedViews';

// Przykładowe dane
const CLASS_DETAILS = {
  id: '1',
  title: 'BJJ Początkujący',
  instructor: 'Jan Kowalski',
  time: '10:00 - 11:30',
  location: 'Sala A',
  available: 8,
  total: 12,
  description: 'Trening Brazilian Jiu-Jitsu dla początkujących. Poznasz podstawowe techniki, zasady i filozofię BJJ.',
  requirements: ['Gi (kimono)', 'Klapki', 'Ręcznik'],
  level: 'Początkujący',
  intensity: 70,
  technique: 80,
  cardio: 60,
};

export default function ClassDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // In a real app, we would fetch class details using the id
  const classDetails = { ...CLASS_DETAILS, id };

  const handleBooking = () => {
    alert(`✅ Zapisano na zajęcia ${id}! (mock)`);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SlideInView direction="top">
          <View style={styles.header}>
            <Typography variant="h2">
              {classDetails.title}
            </Typography>
            <Typography variant="body1">
              z {classDetails.instructor}
            </Typography>
          </View>
        </SlideInView>

        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>👤 Trener</Text>
            <Text style={styles.detailValue}>{classDetails.instructor}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🕐 Godzina</Text>
            <Text style={styles.detailValue}>{classDetails.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 Lokalizacja</Text>
            <Text style={styles.detailValue}>{classDetails.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>👥 Miejsca</Text>
            <Text style={styles.detailValue}>{classDetails.available} / {classDetails.total} dostępnych</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Zapisz się na zajęcia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Wróć do kalendarza</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    flex: 1,
  },
  detailsContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  header: {
    padding: 24,
    paddingTop: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  badge: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#999',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 18,
    margin: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 40,
  },
  backText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
});