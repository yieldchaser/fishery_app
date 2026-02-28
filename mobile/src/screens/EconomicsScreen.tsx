/**
 * Economics Screen - ROI Calculator
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EconomicsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  
  const [landSize, setLandSize] = useState('');
  const [salinity, setSalinity] = useState('');
  const [capital, setCapital] = useState('');
  const [riskTolerance, setRiskTolerance] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [farmerCategory, setFarmerCategory] = useState<'GENERAL' | 'WOMEN' | 'SC' | 'ST'>('GENERAL');

  const riskOptions: Array<'LOW' | 'MEDIUM' | 'HIGH'> = ['LOW', 'MEDIUM', 'HIGH'];
  const categoryOptions: Array<'GENERAL' | 'WOMEN' | 'SC' | 'ST'> = ['GENERAL', 'WOMEN', 'SC', 'ST'];

  const runSimulation = () => {
    navigation.navigate('EconomicsResult' as never, { simulationId: 'sim-001' } as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('economics.title')}</Text>
        <Text style={styles.subtitle}>{t('economics.subtitle')}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>{t('economics.inputParameters')}</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('economics.landSize')}</Text>
          <TextInput style={styles.input} value={landSize} onChangeText={setLandSize} keyboardType="decimal-pad" placeholder="1.0" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('economics.salinity')}</Text>
          <TextInput style={styles.input} value={salinity} onChangeText={setSalinity} keyboardType="decimal-pad" placeholder="500" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('economics.capital')}</Text>
          <TextInput style={styles.input} value={capital} onChangeText={setCapital} keyboardType="decimal-pad" placeholder="100000" />
        </View>

        <Text style={styles.label}>{t('economics.riskTolerance')}</Text>
        <View style={styles.optionsRow}>
          {riskOptions.map((risk) => (
            <TouchableOpacity key={risk} style={[styles.optionButton, riskTolerance === risk && styles.optionButtonActive]} onPress={() => setRiskTolerance(risk)}>
              <Text style={[styles.optionText, riskTolerance === risk && styles.optionTextActive]}>{t(`economics.${risk.toLowerCase()}Risk`)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>{t('economics.farmerCategory')}</Text>
        <View style={styles.optionsRow}>
          {categoryOptions.map((cat) => (
            <TouchableOpacity key={cat} style={[styles.optionButton, farmerCategory === cat && styles.optionButtonActive]} onPress={() => setFarmerCategory(cat)}>
              <Text style={[styles.optionText, farmerCategory === cat && styles.optionTextActive]}>{t(`economics.categories.${cat}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={runSimulation}>
          <Ionicons name="calculator-outline" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>{t('economics.runSimulation')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  form: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  optionButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  optionButtonActive: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  optionText: { color: '#333', fontWeight: '500' },
  optionTextActive: { color: '#fff' },
  submitButton: { backgroundColor: '#2E7D32', borderRadius: 8, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});