import create from 'zustand';

const useListDataStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  setData: (data) => set({ data }),
  updateData: (updateFn) => set((state) => {
    return { data: updateFn(state.data)  };
  }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useListDataStore;
