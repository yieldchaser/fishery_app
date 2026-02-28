/**
 * Map Screen - Geo Suitability Map
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [suitabilityScore, setSuitabilityScore] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const checkSuitability = () => {
    setSuitabilityScore(Math.floor(Math.random() * 40) + 60);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('maps.title')}</Text>
        <Text style={styles.subtitle}>{t('maps.subtitle')}</Text>
      </View>

      <View style={styles.mapContainer}>
        {location ? (
          <MapView style={styles.map} initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="Your Location" />
          </MapView>
        ) : (
          <View style={styles.loadingMap}>
            <Ionicons name="location-outline" size={48} color="#999" />
            <Text style={styles.loadingText}>Getting location...</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.checkButton} onPress={checkSuitability}>
          <Ionicons name="locate-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>{t('maps.checkSuitability')}</Text>
        </TouchableOpacity>

        {suitabilityScore && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>{t('maps.suitabilityScore')}</Text>
            <Text style={[styles.score, { color: suitabilityScore > 70 ? '#4CAF50' : suitabilityScore > 50 ? '#FF9800' : '#F44336' }]}>
              {suitabilityScore}/100
            </Text>
            <Text style={styles.waterType}>{t('maps.freshwater')}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  mapContainer: { flex: 1, margin: 16, borderRadius: 12, overflow: 'hidden' },
  map: { flex: 1 },
  loadingMap: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0' },
  loadingText: { marginTop: 8, color: '#666' },
  controls: { padding: 16 },
  checkButton: { backgroundColor: '#2E7D32', borderRadius: 8, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  resultCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 16, alignItems: 'center' },
  resultLabel: { fontSize: 14, color: '#666' },
  score: { fontSize: 36, fontWeight: 'bold', marginVertical: 8 },
  waterType: { fontSize: 16, color: '#333', fontWeight: '500' },
});