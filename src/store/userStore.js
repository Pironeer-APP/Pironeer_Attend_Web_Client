import {create} from 'zustand';

const useUserStore = create(set => ({
    user: 0,
    increaseUser: () => set(state => {
        user: state.user + 1
    }),
    removeUser: () => set({
        user: 0
    })
}))

export default useUserStore;