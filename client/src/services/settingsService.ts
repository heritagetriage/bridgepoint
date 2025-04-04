import api from './apiService';

export interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  messageAlerts: boolean;
  eventReminders: boolean;
  systemUpdates: boolean;
}

export interface SecuritySettings {
  requireStrongPasswords: boolean;
  sessionTimeout: string;
  twoFactorAuth: boolean;
}

export interface AllSettings {
  general: GeneralSettings;
  notifications?: NotificationSettings;
  security?: SecuritySettings;
}

// Default values for fallback
const defaultGeneralSettings: GeneralSettings = {
  siteName: "BridgePoint Strategies",
  siteDescription: "Creating powerful connections between organizations, communities, and cultures to drive meaningful change and sustainable growth across borders.",
  contactEmail: "info@bridgepoint-strategies.com",
  contactPhone: "(123) 456-7890",
  address: "Washington D.C."
};

const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  messageAlerts: true,
  eventReminders: true,
  systemUpdates: false
};

const defaultSecuritySettings: SecuritySettings = {
  requireStrongPasswords: true,
  sessionTimeout: "30",
  twoFactorAuth: false
};

const settingsService = {
  /**
   * Get all settings
   */
  getAllSettings: async (): Promise<AllSettings> => {
    try {
      const response = await api.get<AllSettings>('/settings');
      return response;
    } catch (error) {
      console.error('Error fetching all settings:', error);
      // Return defaults if API call fails
      return {
        general: defaultGeneralSettings,
        notifications: defaultNotificationSettings,
        security: defaultSecuritySettings
      };
    }
  },

  /**
   * Get settings by type
   */
  getSettingsByType: async <T>(type: 'general' | 'notifications' | 'security'): Promise<T> => {
    try {
      const response = await api.get<T>(`/settings/${type}`);
      return response;
    } catch (error) {
      console.error(`Error fetching ${type} settings:`, error);
      
      // Return defaults if API call fails
      switch (type) {
        case 'general':
          return defaultGeneralSettings as unknown as T;
        case 'notifications':
          return defaultNotificationSettings as unknown as T;
        case 'security':
          return defaultSecuritySettings as unknown as T;
        default:
          throw new Error(`Unknown settings type: ${type}`);
      }
    }
  },

  /**
   * Update settings by type
   */
  updateSettings: async <T>(type: 'general' | 'notifications' | 'security', data: T): Promise<T> => {
    try {
      const response = await api.put<T>(`/settings/${type}`, { data });
      return response;
    } catch (error) {
      console.error(`Error updating ${type} settings:`, error);
      throw error;
    }
  },

  /**
   * Get general settings (public)
   */
  getGeneralSettings: async (): Promise<GeneralSettings> => {
    return settingsService.getSettingsByType<GeneralSettings>('general');
  },

  /**
   * Update general settings (admin only)
   */
  updateGeneralSettings: async (data: Partial<GeneralSettings>): Promise<GeneralSettings> => {
    try {
      // First get current settings
      const currentSettings = await settingsService.getSettingsByType<GeneralSettings>('general');
      
      // Merge with updates
      const updatedSettings = { ...currentSettings, ...data };
      
      // Save to API
      return await settingsService.updateSettings('general', updatedSettings);
    } catch (error) {
      console.error('Error updating general settings:', error);
      throw error;
    }
  },

  /**
   * Get notification settings (admin only)
   */
  getNotificationSettings: async (): Promise<NotificationSettings> => {
    return settingsService.getSettingsByType<NotificationSettings>('notifications');
  },

  /**
   * Update notification settings (admin only)
   */
  updateNotificationSettings: async (data: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    try {
      // First get current settings
      const currentSettings = await settingsService.getSettingsByType<NotificationSettings>('notifications');
      
      // Merge with updates
      const updatedSettings = { ...currentSettings, ...data };
      
      // Save to API
      return await settingsService.updateSettings('notifications', updatedSettings);
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  },

  /**
   * Get security settings (admin only)
   */
  getSecuritySettings: async (): Promise<SecuritySettings> => {
    return settingsService.getSettingsByType<SecuritySettings>('security');
  },

  /**
   * Update security settings (admin only)
   */
  updateSecuritySettings: async (data: Partial<SecuritySettings>): Promise<SecuritySettings> => {
    try {
      // First get current settings
      const currentSettings = await settingsService.getSettingsByType<SecuritySettings>('security');
      
      // Merge with updates
      const updatedSettings = { ...currentSettings, ...data };
      
      // Save to API
      return await settingsService.updateSettings('security', updatedSettings);
    } catch (error) {
      console.error('Error updating security settings:', error);
      throw error;
    }
  }
};

export default settingsService;
