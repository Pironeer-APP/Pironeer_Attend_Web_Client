import {create} from 'zustand';

const useUserStore = create((set) => ({
    user: {
        userId: null,
        username: '',
        password: '',
        isLogin: false,
        isAdmin: false,
        token: '',
    },
    changeUsername: (username) => set((state) => ({
        user: {
            ...state.user,
            username
        }
    })),
    changePassword: (password) => set((state) => ({
        user: {
            ...state.user,
            password
        }
    })),
    loginUser: ({userId, isAdmin, token}) => set((state) => ({
        user: {
            ...state.user,
            token,
            userId,
            isAdmin,
            isLogin: true
        }
    })),
    attendUser: () => set((state) => ({
        user: {
            ...state.user,
            isAttend: true
        }
    })),
    logoutUser: () => set((state) => ({
        user: {
            userId: null,
            username: '',
            password: '',
            isLogin: false,
            isAdmin: false,
            token: ''
        }
    }))
}))

export default useUserStore;