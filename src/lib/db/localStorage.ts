const PREFERENCES_KEY = "Preferences";
const USER_DATA_KEY = "UserData";

export function deleteEverything() {
  localStorage.removeItem(PREFERENCES_KEY);
  localStorage.removeItem(USER_DATA_KEY);
}
// Utility function to get data from a specific key in localStorage
const getStorageObject = (key: string): Record<string, unknown> => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

// Utility function to save data to a specific key in localStorage
const setStorageObject = (key: string, data: Record<string, unknown>): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

/* Preferences Management */
export const setPreference = <T>(subKey: string, value: T): void => {
  try {
    const preferences = getStorageObject(PREFERENCES_KEY);
    preferences[subKey] = value;
    setStorageObject(PREFERENCES_KEY, preferences);
    console.log(`Preference ${subKey} saved.`);
  } catch (error) {
    console.error("Error saving preference:", error);
  }
};

export const getPreference = <T>(subKey: string): T | null => {
  try {
    const preferences = getStorageObject(PREFERENCES_KEY);
    return (preferences[subKey] as T) ?? null;
  } catch (error) {
    console.error("Error getting preference:", error);
    return null;
  }
};

export const deletePreference = (subKey: string): void => {
  try {
    const preferences = getStorageObject(PREFERENCES_KEY);
    delete preferences[subKey];
    setStorageObject(PREFERENCES_KEY, preferences);
    console.log(`Preference ${subKey} deleted.`);
  } catch (error) {
    console.error("Error deleting preference:", error);
  }
};

export const getAllPreferences = (): { key: string; value: unknown }[] => {
  try {
    const preferences = getStorageObject(PREFERENCES_KEY);
    return Object.entries(preferences).map(([key, value]) => ({ key, value }));
  } catch (error) {
    console.error("Error getting all preferences:", error);
    return [];
  }
};

/* User Data Management */
export const setUserData = <T>(subKey: string, value: T): void => {
  try {
    const userData = getStorageObject(USER_DATA_KEY);
    userData[subKey] = value;
    setStorageObject(USER_DATA_KEY, userData);
    console.log(`User data ${subKey} saved.`);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = <T>(subKey: string): T | null => {
  try {
    const userData = getStorageObject(USER_DATA_KEY);
    return (userData[subKey] as T) ?? null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const deleteUserData = (subKey: string): void => {
  try {
    const userData = getStorageObject(USER_DATA_KEY);
    delete userData[subKey];
    setStorageObject(USER_DATA_KEY, userData);
    console.log(`User data ${subKey} deleted.`);
  } catch (error) {
    console.error("Error deleting user data:", error);
  }
};

export const getAllUserData = (): { key: string; value: unknown }[] => {
  try {
    const userData = getStorageObject(USER_DATA_KEY);
    return Object.entries(userData).map(([key, value]) => ({ key, value }));
  } catch (error) {
    console.error("Error getting all user data:", error);
    return [];
  }
};
