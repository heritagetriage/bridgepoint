import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import settingsService, {
  GeneralSettings,
  NotificationSettings,
  SecuritySettings,
} from "@/services/settingsService";

interface SettingsContextType {
  generalSettings: GeneralSettings;
  notificationSettings: NotificationSettings;
  securitySettings: SecuritySettings;
  updateGeneralSettings: (settings: Partial<GeneralSettings>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => void;
  saveSettings: (
    type: "general" | "notifications" | "security"
  ) => Promise<void>;
  isSaving: boolean;
  isLoading: boolean;
  error: string | null;
}

// Default values
const defaultGeneralSettings: GeneralSettings = {
  siteName: "BridgePoint Strategies",
  siteDescription:
    "Creating powerful connections between organizations, communities, and cultures to drive meaningful change and sustainable growth across borders.",
  contactEmail: "info@bridgepoint-strategies.com",
  contactPhone: "+233548353466",
  address: "Dodowa Oyikum, Ghana",
};

const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  messageAlerts: true,
  eventReminders: true,
  systemUpdates: false,
};

const defaultSecuritySettings: SecuritySettings = {
  requireStrongPasswords: true,
  sessionTimeout: "30",
  twoFactorAuth: false,
};

// Create the context
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

// Provider component
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(
    defaultGeneralSettings
  );
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(defaultNotificationSettings);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(
    defaultSecuritySettings
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings from API on mount
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Always load general settings
        const generalData = await settingsService.getGeneralSettings();
        setGeneralSettings(generalData);

        // Try to load admin settings if we're in the admin section
        if (window.location.pathname.includes("/admin")) {
          try {
            const [notifications, security] = await Promise.all([
              settingsService.getNotificationSettings(),
              settingsService.getSecuritySettings(),
            ]);
            setNotificationSettings(notifications);
            setSecuritySettings(security);
          } catch (error) {
            console.error("Error loading admin settings:", error);
            if (error.message.includes("Unauthorized")) {
              // Redirect to login after a brief delay
              setTimeout(() => (window.location.href = "/admin/login"), 2000);
            }
          }
        }
      } catch (err) {
        console.error("Error loading settings:", err);
        setError("Failed to load settings. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Update functions
  const updateGeneralSettings = (settings: Partial<GeneralSettings>) => {
    setGeneralSettings((prev) => ({ ...prev, ...settings }));
  };

  const updateNotificationSettings = (
    settings: Partial<NotificationSettings>
  ) => {
    setNotificationSettings((prev) => ({ ...prev, ...settings }));
  };

  const updateSecuritySettings = (settings: Partial<SecuritySettings>) => {
    setSecuritySettings((prev) => ({ ...prev, ...settings }));
  };

  // Save settings to API
  const saveSettings = async (
    type: "general" | "notifications" | "security"
  ) => {
    setIsSaving(true);
    setError(null);

    try {
      let result;

      switch (type) {
        case "general":
          result = await settingsService.updateGeneralSettings(generalSettings);
          setGeneralSettings(result);
          break;
        case "notifications":
          result = await settingsService.updateNotificationSettings(
            notificationSettings
          );
          setNotificationSettings(result);
          break;
        case "security":
          result = await settingsService.updateSecuritySettings(
            securitySettings
          );
          setSecuritySettings(result);
          break;
      }

      console.log(`Saved ${type} settings successfully`);
      return Promise.resolve();
    } catch (err) {
      console.error(`Error saving ${type} settings:`, err);
      setError(`Failed to save ${type} settings. Please try again.`);
      return Promise.reject(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        generalSettings,
        notificationSettings,
        securitySettings,
        updateGeneralSettings,
        updateNotificationSettings,
        updateSecuritySettings,
        saveSettings,
        isSaving,
        isLoading,
        error,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for using the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export default SettingsContext;
