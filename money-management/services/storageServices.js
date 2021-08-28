import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key.toString(), JSON.stringify(value));
    } catch (error) {}
  },
  getItem: async (key) => {
    try {
      const item = await AsyncStorage.getItem(key);

      return item;
    } catch (error) {
      console.log(error);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  },
  updateItem: async (key, value) => {
    try {
      const item = await AsyncStorage.getItem(key);
      const result = { ...JSON.parse(item), ...value };

      await AsyncStorage.setItem(key, JSON.stringify(result));
    } catch (error) {}
  },
  clearAllData: async () => {
    await AsyncStorage.clear();
  },
  getAllItems: async () => {
    var items = [];

    try {
      const keys = await AsyncStorage.getAllKeys();

      const result = await AsyncStorage.multiGet(keys);
      result.map((req) => items.push(req[1]));
      return items;
    } catch (error) {
      console.error(error);
    }
  },
};
