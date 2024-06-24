// storage.js
export const storage = {
    async getItem(key) {
      return sessionStorage.getItem(key);
    },
    async setItem(key, value) {
      return sessionStorage.setItem(key, value);
    },
    async removeItem(key) {
      return sessionStorage.removeItem(key);
    },
    async clear() {
      return sessionStorage.clear();
    }
  };
  