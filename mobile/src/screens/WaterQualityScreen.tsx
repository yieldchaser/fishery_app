/**
 * Water Quality Screen
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function WaterQualityScreen() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('waterQuality.title')}</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, activeTab === 'log' && styles.tabActive]} onPress={() => setActiveTab('log')}>
            <Text style={[styles.tabText, activeTab === 'log' && styles.tabTextActive]}>{t('waterQuality.addReading')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'history' && styles.tabActive]} onPress={() => setActiveTab('history')}>
            <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>{t('waterQuality.history')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'log' ? (
          <View style={styles.form}>
            <InputRow label={t('waterQuality.temperature')} icon="thermometer-outline" placeholder="28.5" />
            <InputRow label={t('waterQuality.dissolvedOxygen')} icon="water-outline" placeholder="6.0" />
            <InputRow label={t('waterQuality.ph')} icon="flask-outline" placeholder="7.5" />
            <InputRow label={t('waterQuality.salinity')} icon="sunny-outline" placeholder="0.5" />
            <TouchableOpacity style={styles.saveButton}>
              <Ionicons name="save-outline" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>{t('common.save')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.history}>
            <HistoryItem date="Today, 9:00 AM" params={{ temp: 28.5, do: 6.2, ph: 7.4 }} status="normal" />
            <HistoryItem date="Yesterday, 8:30 AM" params={{ temp: 29.0, do: 5.8, ph: 7.6 }} status="warning" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function InputRow({ label, icon, placeholder }: { label: string; icon: any; placeholder: string }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder={placeholder} keyboardType="decimal-pad" />
      </View>
    </View>
  );
}

function HistoryItem({ date, params, status }: { date: string; params: any; status: string }) {
  return (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyDate}>{date}</Text>
        <View style={[styles.statusBadge, status === 'normal' ? styles.statusNormal : styles.statusWarning]}>
          <Text style={styles.statusText}>{status === 'normal' ? 'Normal' : 'Warning'}</Text>
        </View>
      </View>
      <View style={styles.historyParams}>
        <Text style={styles.paramText}>Temp: {params.temp}°C | DO: {params.do}mg/L | pH: {params.ph}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20' },
  tabContainer: { flexDirection: 'row', marginTop: 16, backgroundColor: '#f0f0f0', borderRadius: 8, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
  tabActive: { backgroundColor: '#fff' },
  tabText: { color: '#666', fontWeight: '500' },
  tabTextActive: { color: '#2E7D32' },
  content: { flex: 1, padding: 16 },
  form: { gap: 16 },
  inputGroup: { marginBottom: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  inputIcon: { padding: 12 },
  input: { flex: 1, paddingVertical: 12, paddingRight: 12, fontSize: 16 },
  saveButton: { backgroundColor: '#2E7D32', borderRadius: 8, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  history: { gap: 12 },
  historyItem: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyDate: { fontSize: 14, fontWeight: '600', color: '#333' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusNormal: { backgroundColor: '#E8F5E9' },
  statusWarning: { backgroundColor: '#FFF3E0' },
  statusText: { fontSize: 12, fontWeight: '500' },
  historyParams: { marginTop: 8 },
  paramText: { fontSize: 14, color: '#666' },
});