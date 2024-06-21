// storage.js
export const storage = {
    async getItem(key) {
      return localStorage.getItem(key);
    },
    async setItem(key, value) {
      return localStorage.setItem(key, value);
    },
    async removeItem(key) {
      return localStorage.removeItem(key);
    },
    async clear() {
      return localStorage.clear();
    }
  };
  