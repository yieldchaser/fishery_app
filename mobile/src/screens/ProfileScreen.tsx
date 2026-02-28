/**
 * Profile Screen
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();

  const menuItems = [
    { icon: 'person-outline', title: t('profile.personalInfo'), onPress: () => {} },
    { icon: 'fish-outline', title: t('profile.myPonds'), onPress: () => {} },
    { icon: 'water-outline', title: t('profile.language'), value: i18n.language.toUpperCase(), onPress: () => {} },
    { icon: 'cloud-offline-outline', title: t('profile.offlineMode'), onPress: () => {} },
    { icon: 'sync-outline', title: t('profile.syncData'), onPress: () => {} },
    { icon: 'settings-outline', title: t('profile.settings'), onPress: () => {} },
    { icon: 'log-out-outline', title: t('profile.logout'), onPress: () => {}, danger: true },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color="#fff" />
        </View>
        <Text style={styles.name}>Farmer Name</Text>
        <Text style={styles.phone}>+91 98765 43210</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{t('economics.categories.GENERAL')}</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Ionicons name={item.icon as any} size={24} color={item.danger ? '#F44336' : '#666'} />
            <Text style={[styles.menuText, item.danger && styles.dangerText]}>{item.title}</Text>
            {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { alignItems: 'center', padding: 32, backgroundColor: '#2E7D32' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 16 },
  phone: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginTop: 8 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  menu: { marginTop: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuText: { flex: 1, fontSize: 16, color: '#333', marginLeft: 16 },
  menuValue: { fontSize: 14, color: '#666', marginRight: 8 },
  dangerText: { color: '#F44336' },
});