import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';

interface ClassItem {
  id: string;
  time: string;
  title: string;
  instructor: string;
  available: number;
  total: number;
}



// Przykładowe dane
const MOCK_CLASSES: ClassItem[] = [
  {
    id: '1',
    time: '10:00',
    title: 'BJJ Początkujący',
    instructor: 'Jan Kowalski',
    available: 8,
    total: 12,
  },
  {
    id: '2',
    time: '12:00',
    title: 'MMA Open Mat',
    instructor: 'Anna Nowak',
    available: 5,
    total: 15,
  },
  {
    id: '3',
    time: '17:00',
    title: 'BJJ Zaawansowani',
    instructor: 'Piotr Wiśniewski',
    available: 10,
    total: 12,
  },
  {
    id: '4',
    time: '19:00',
    title: 'No-Gi Training',
    instructor: 'Marek Kowalczyk',
    available: 3,
    total: 10,
  },
];

export default function Calendar() {
  const renderItem = ({ item }: { item: ClassItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/class/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
      <Text style={styles.cardSubtitle}>👤 {item.instructor}</Text>
      <Text style={styles.cardSubtitle}>🏋️ {`${item.available}/${item.total} miejsc`}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardAction}>Szczegóły →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_CLASSES}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  cardTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  cardSpots: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600',
  },
  cardAction: {
    fontSize: 14,
    color: '#666',
  },
});