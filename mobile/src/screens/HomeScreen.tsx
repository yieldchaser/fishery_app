/**
 * Home Screen - Main Dashboard
 * Icon-driven interface for rural farmers
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const quickActions = [
    {
      icon: 'fish-outline' as const,
      title: t('home.checkSpecies'),
      onPress: () => navigation.navigate('Species' as never),
      color: '#4CAF50',
    },
    {
      icon: 'calculator-outline' as const,
      title: t('home.calculateROI'),
      onPress: () => navigation.navigate('Economics' as never),
      color: '#2196F3',
    },
    {
      icon: 'water-outline' as const,
      title: t('home.logWaterQuality'),
      onPress: () => navigation.navigate('WaterQuality' as never),
      color: '#00BCD4',
    },
    {
      icon: 'trending-up-outline' as const,
      title: t('home.viewMarkets'),
      onPress: () => navigation.navigate('MarketPrices' as never),
      color: '#FF9800',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="fish" size={64} color="#2E7D32" />
          <Text style={styles.title}>{t('home.welcome')}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderColor: action.color }]}
                onPress={action.onPress}
              >
                <Ionicons name={action.icon} size={32} color={action.color} />
                <Text style={[styles.actionText, { color: action.color }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});