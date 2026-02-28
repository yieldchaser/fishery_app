/**
 * Species Screen - Species Intelligence Card
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Mock data for demonstration
const mockSpecies = [
  { id: '1', speciesId: 'rohu', scientificName: 'Labeo rohita', commonName: 'Rohu', tempMin: 25, tempMax: 32, doMin: 5 },
  { id: '2', speciesId: 'catla', scientificName: 'Catla catla', commonName: 'Catla', tempMin: 25, tempMax: 32, doMin: 5 },
  { id: '3', speciesId: 'vannamei', scientificName: 'Litopenaeus vannamei', commonName: 'Vannamei Shrimp', tempMin: 28, tempMax: 32, doMin: 5 },
  { id: '4', speciesId: 'pangasius', scientificName: 'Pangasianodon hypophthalmus', commonName: 'Pangasius', tempMin: 26, tempMax: 30, doMin: 5 },
  { id: '5', speciesId: 'tilapia', scientificName: 'Oreochromis niloticus', commonName: 'Tilapia', tempMin: 26, tempMax: 30, doMin: 4 },
  { id: '6', speciesId: 'scampi', scientificName: 'Macrobrachium rosenbergii', commonName: 'Scampi', tempMin: 28, tempMax: 31, doMin: 5 },
];

const SpeciesCard = ({ species, onPress }: { species: any; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Ionicons name="fish" size={32} color="#4CAF50" />
        <Text style={styles.speciesName}>{species.commonName}</Text>
      </View>
      <Text style={styles.scientificName}>{species.scientificName}</Text>
      <View style={styles.parameters}>
        <View style={styles.paramItem}>
          <Ionicons name="thermometer-outline" size={16} color="#666" />
          <Text style={styles.paramText}>{species.tempMin}°C - {species.tempMax}°C</Text>
        </View>
        <View style={styles.paramItem}>
          <Ionicons name="water-outline" size={16} color="#666" />
          <Text style={styles.paramText}>DO > {species.doMin} mg/L</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function SpeciesScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('species.title')}</Text>
        <Text style={styles.subtitle}>{t('species.subtitle')}</Text>
      </View>
      
      <FlatList
        data={mockSpecies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SpeciesCard
            species={item}
            onPress={() => navigation.navigate('SpeciesDetail' as never, { speciesId: item.speciesId } as never)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  speciesName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 4,
  },
  parameters: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  paramItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paramText: {
    fontSize: 12,
    color: '#666',
  },
});
