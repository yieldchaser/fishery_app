/**
 * Market Prices Screen
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const mockPrices = [
  { id: '1', species: 'Rohu', market: 'Kolkata', price: 145, trend: 'up' },
  { id: '2', species: 'Catla', market: 'Patna', price: 160, trend: 'stable' },
  { id: '3', species: 'Vannamei Shrimp', market: 'Visakhapatnam', price: 380, trend: 'up' },
  { id: '4', species: 'Pangasius', market: 'Howrah', price: 100, trend: 'down' },
  { id: '5', species: 'Tilapia', market: 'Chennai', price: 120, trend: 'stable' },
  { id: '6', species: 'Scampi', market: 'Nashik', price: 420, trend: 'up' },
];

export default function MarketPricesScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('markets.title')}</Text>
        <Text style={styles.subtitle}>{t('markets.subtitle')}</Text>
      </View>

      <FlatList
        data={mockPrices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.priceCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="fish-outline" size={24} color="#4CAF50" />
              <Text style={styles.speciesName}>{item.species}</Text>
              <TrendIcon trend={item.trend} />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.marketName}>{item.market}</Text>
              <Text style={styles.price}>₹{item.price} {t('markets.perKg')}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

function TrendIcon({ trend }: { trend: string }) {
  let icon: any = 'remove-outline';
  let color = '#999';
  
  if (trend === 'up') {
    icon = 'trending-up-outline';
    color = '#4CAF50';
  } else if (trend === 'down') {
    icon = 'trending-down-outline';
    color = '#F44336';
  }
  
  return <Ionicons name={icon} size={20} color={color} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  list: { padding: 16 },
  priceCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  speciesName: { flex: 1, fontSize: 16, fontWeight: '600', color: '#333' },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  marketName: { fontSize: 14, color: '#666' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32' },
});