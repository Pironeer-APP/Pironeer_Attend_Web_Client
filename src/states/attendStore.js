import create from 'zustand';

const useAttendStore = create((set) => ({
  attend: {
    userId: null,
    sessionId: null,
    attendIdx: 0,
    status: false,
  },
  attends: [],
  setAttend: (newAttend) => set((state) => ({
    attend: {
      ...state.attend,
      ...newAttend,
    }
  })),
  setUpdateAttends: (newAttend) => set((state) => {
    const filteredAttends = state.attends.filter(
      (attend) =>
        attend.userId !== newAttend.userId ||
        attend.sessionId !== newAttend.sessionId ||
        attend.attendIdx !== newAttend.attendIdx
    );
    return { attends: [...filteredAttends, newAttend] };
  }),

}));

export default useAttendStore;