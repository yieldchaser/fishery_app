/**
 * Species Detail Screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function SpeciesDetailScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="fish" size={64} color="#4CAF50" />
        <Text style={styles.title}>Rohu</Text>
        <Text style={styles.scientificName}>Labeo rohita</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('species.biologicalParameters')}</Text>
        <View style={styles.paramCard}>
          <ParamRow icon="thermometer-outline" label={t('species.temperature')} value="25°C - 32°C" />
          <ParamRow icon="water-outline" label={t('species.dissolvedOxygen')} value="> 5.0 mg/L" />
          <ParamRow icon="flask-outline" label={t('species.ph')} value="6.5 - 8.5" />
          <ParamRow icon="sunny-outline" label={t('species.salinity')} value="0 - 2 ppt" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('species.economicParameters')}</Text>
        <View style={styles.paramCard}>
          <ParamRow icon="nutrition-outline" label={t('species.feedConversionRatio')} value="1.35 - 1.74" />
          <ParamRow icon="trending-up-outline" label={t('species.expectedYield')} value="3-5 MT/Acre" />
          <ParamRow icon="cash-outline" label={t('species.marketPrice')} value="₹120-180/kg" />
          <ParamRow icon="time-outline" label={t('species.culturePeriod')} value="8-10 months" />
        </View>
      </View>
    </ScrollView>
  );
}

function ParamRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.paramRow}>
      <Ionicons name={icon} size={20} color="#666" />
      <Text style={styles.paramLabel}>{label}</Text>
      <Text style={styles.paramValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { alignItems: 'center', padding: 32, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1B5E20', marginTop: 16 },
  scientificName: { fontSize: 16, fontStyle: 'italic', color: '#666', marginTop: 4 },
  section: { marginTop: 16, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  paramCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  paramRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  paramLabel: { flex: 1, fontSize: 14, color: '#666', marginLeft: 12 },
  paramValue: { fontSize: 14, fontWeight: '600', color: '#333' },
});