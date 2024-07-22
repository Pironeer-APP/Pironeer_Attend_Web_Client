import create from 'zustand';

const useAttendStore = create((set) => ({
  attend: {
    userId: null,
    sessionId: null,
    attendIdx: 0,
    status: false,
  },
  attends: [],
  updateAttend: (attend) => set((state) => ({
    attend: {
        ...state.attend,
        ...attend,
    }
    })),
    addAttend: (newAttend) => set((state) => ({
        attends: [...state.attends, newAttend]
    })),
    removeAttend: (attend) => set((state) => ({
        attends: state.attends.filter(a => 
            a.userId !== attend.userId || 
            a.sessionId !== attend.sessionId || 
            a.attendIdx !== attend.attendIdx)
    })),
    setUpdateAttends: (attends) => set(() => ({
        attends: attends
    }))
}));

export default useAttendStore;