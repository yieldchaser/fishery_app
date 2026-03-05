import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './apiService';
import { UserProfile, saveProfile, loadProfile } from '../screens/PersonalInfoScreen';

const TOKEN_KEY = '@fishing_god_token';

export const authService = {
    login: async (phone: string, password: string): Promise<{ success: boolean; error?: string; user?: any }> => {
        try {
            const res = await api.post('/api/v1/auth/login', { phone, password });
            if (res.data.success) {
                await AsyncStorage.setItem(TOKEN_KEY, res.data.token);
                const user = res.data.user;
                const existing = await loadProfile();
                await saveProfile({
                    ...existing,
                    name: user.name,
                    phone: user.phone_number,
                    farmerCategory: user.farmerCategory || 'GENERAL',
                    stateCode: user.stateCode || '',
                    userId: user.id
                });
                return { success: true, user: res.data.user };
            }
            return { success: false, error: 'Login failed' };
        } catch (error: any) {
            return { success: false, error: error.response?.data?.error || 'Invalid phone or password' };
        }
    },

    signup: async (phone: string, password: string, name: string, stateCode: string, farmerCategory: string): Promise<{ success: boolean; error?: string; user?: any }> => {
        try {
            const res = await api.post('/api/v1/auth/signup', { phone, password, name, stateCode, farmerCategory });
            if (res.data.success) {
                await AsyncStorage.setItem(TOKEN_KEY, res.data.token);
                await saveProfile({
                    userId: res.data.user.id,
                    name,
                    phone,
                    stateCode,
                    farmerCategory: farmerCategory as any
                });
                return { success: true, user: res.data.user };
            }
            return { success: false, error: 'Signup failed' };
        } catch (error: any) {
            return { success: false, error: error.response?.data?.error || 'An error occurred during signup' };
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        // Clear personal info too, or just user ID
        await AsyncStorage.removeItem('@fishing_god_profile');
    },

    getToken: async () => {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated: async () => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return !!token;
    }
};
