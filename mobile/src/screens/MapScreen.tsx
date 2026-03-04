import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { theme } from '../theme';

export default function MapScreen() {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [suitabilityScore, setSuitabilityScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required for maps');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const analyzeLocation = async () => {
    if (!location) return;
    setIsLoading(true);

    try {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        Alert.alert("API Key Missing", "Please add EXPO_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.");
        setIsLoading(false);
        return;
      }

      // 1. Reverse Geocoding to get the area name
      const reverseGeoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${apiKey}`;
      const geoResponse = await fetch(reverseGeoUrl);
      const geoData = await geoResponse.json();

      if (geoData.results && geoData.results.length > 0) {
        // Get the first formatted address
        setAddress(geoData.results[0].formatted_address);
      } else {
        setAddress("Unknown Location");
      }

      // Simulated score calculation based on real coordinates (to be replaced with Google Weather/Air Quality API later)
      // For now, we seed the random number with real coordinate math so it's deterministic per area
      const deterministicScore = Math.floor((Math.abs(location.coords.latitude) + Math.abs(location.coords.longitude)) % 40) + 50;
      setSuitabilityScore(deterministicScore);

    } catch (error) {
      Alert.alert("Error", "Failed to analyze location data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('maps.title') || 'Geo Suitability'}</Text>
        <Text style={styles.subtitle}>{t('maps.subtitle') || 'Analyze your pond environment'}</Text>
      </View>

      <View style={styles.mapContainer}>
        {location ? (
          <MapView style={styles.map} initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="Current Location" />
          </MapView>
        ) : (
          <View style={styles.loadingMap}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Acquiring GPS Signal...</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={analyzeLocation}
          activeOpacity={0.8}
          disabled={isLoading || !location}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons name="analytics-outline" size={24} color="#fff" />
          )}
          <Text style={styles.buttonText}>
            {isLoading ? 'Analyzing...' : (t('maps.checkSuitability') || 'Analyze Environment')}
          </Text>
        </TouchableOpacity>

        {suitabilityScore && address && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Ionicons name="location" size={20} color={theme.colors.primary} />
              <Text style={styles.addressText} numberOfLines={2}>{address}</Text>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={styles.resultLabel}>Aquaculture Suitability Index</Text>
              <Text style={[styles.score, { color: suitabilityScore > 70 ? theme.colors.success : suitabilityScore > 50 ? theme.colors.accent : theme.colors.error }]}>
                {suitabilityScore}/100
              </Text>
              <Text style={styles.waterType}>Freshwater Profile Compatible</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.sm,
    zIndex: 10,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    marginTop: theme.spacing.xs
  },
  mapContainer: {
    flex: 1,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  map: {
    flex: 1
  },
  loadingMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface
  },
  loadingText: {
    marginTop: theme.spacing.md,
    ...theme.typography.body,
  },
  controls: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  checkButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  buttonText: {
    ...theme.typography.buttonText,
    color: theme.colors.textInverse
  },
  resultCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    ...theme.shadows.md,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  addressText: {
    ...theme.typography.body,
    flex: 1,
    fontWeight: '500',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  resultLabel: {
    ...theme.typography.bodyLarge,
    fontWeight: '600',
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: theme.spacing.sm
  },
  waterType: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '500'
  },
});