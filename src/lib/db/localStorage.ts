// localStorage API in TypeScript
export const setPreference = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Preference ${key} saved.`);
  } catch (error) {
    console.error("Error saving preference:", error);
  }
};

export const getPreference = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error("Error getting preference:", error);
    return null;
  }
};

export const deletePreference = (key: string): void => {
  try {
    localStorage.removeItem(key);
    console.log(`Preference ${key} deleted.`);
  } catch (error) {
    console.error("Error deleting preference:", error);
  }
};

export const getAllPreferences = (): { key: string; value: unknown }[] => {
  try {
    const keys = Object.keys(localStorage);
    return keys.map((key) => ({
      key,
      value: JSON.parse(localStorage.getItem(key) || "null"),
    }));
  } catch (error) {
    console.error("Error getting all preferences:", error);
    return [];
  }
};
