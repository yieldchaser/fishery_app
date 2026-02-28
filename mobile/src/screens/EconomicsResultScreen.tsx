/**
 * Economics Result Screen - ROI Dashboard
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function EconomicsResultScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('economics.results')}</Text>
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>{t('economics.benefitCostRatio')}</Text>
          <Text style={styles.scoreValue}>1.45</Text>
          <Text style={styles.scoreStatus}>{t('economics.projectedProfit')}: ₹4,25,000</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('economics.recommendedSpecies')}</Text>
        <View style={styles.card}>
          <View style={styles.speciesItem}>
            <Ionicons name="fish" size={24} color="#4CAF50" />
            <View style={styles.speciesInfo}>
              <Text style={styles.speciesName}>Rohu</Text>
              <Text style={styles.speciesDetail}>Compatibility: 92%</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('economics.investmentBreakdown')}</Text>
        <View style={styles.card}>
          <StatRow label={t('economics.totalInvestment')} value="₹2,75,000" />
          <StatRow label={t('economics.subsidyAmount')} value="₹1,10,000" color="#4CAF50" />
          <StatRow label={t('economics.effectiveInvestment')} value="₹1,65,000" bold />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('economics.riskAnalysis')}</Text>
        <View style={styles.card}>
          <View style={styles.riskItem}>
            <Ionicons name="warning-outline" size={20} color="#FF9800" />
            <Text style={styles.riskText}>Medium risk - Weather dependent</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function StatRow({ label, value, color, bold }: { label: string; value: string; color?: string; bold?: boolean }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, color && { color }, bold && { fontWeight: 'bold' }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#2E7D32' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  scoreCard: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 20, marginTop: 16, alignItems: 'center' },
  scoreLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  scoreValue: { fontSize: 48, fontWeight: 'bold', color: '#fff', marginVertical: 8 },
  scoreStatus: { fontSize: 16, color: '#fff' },
  section: { marginTop: 16, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  speciesItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  speciesInfo: { flex: 1 },
  speciesName: { fontSize: 16, fontWeight: '600', color: '#333' },
  speciesDetail: { fontSize: 14, color: '#666', marginTop: 2 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  statLabel: { fontSize: 14, color: '#666' },
  statValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  riskItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  riskText: { fontSize: 14, color: '#666' },
});