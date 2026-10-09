import { createContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { fetchMe, loginUser, registerUser, refreshToken as refreshTokenApi } from '../api/auth'
import { setAuthCallbacks } from '../api/client'
import { 
    clearStoredTokens,
    getAccessToken,
    getRefreshToken,
    getStoredUser,
    setAccessToken,
    setRefreshToken,
    setStoredUser,
} from '../api/tokenStorage'


export const AuthContext = createContext(null)

function parseJwtPayload(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch (err) {
        return null
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredUser())
    const [accessToken, setAccessTokenState] = useState(() => getAccessToken())

    function clearAuthState() {
        setUser(null)
        setAccessTokenState(null)
        clearStoredTokens()
    }

    useEffect(() => {
        async function onTokenRefresh() {
            const refresh = getRefreshToken()
            if (!refresh) throw new Error('No Refresh Token')

            const res = await refreshTokenApi({ refresh })
            if (!res.ok) throw new Error('Token refresh failed.')

            const data = await res.json()

            setAccessToken(data.access)
            setAccessTokenState(data.access)

            return data.access
        }

        function onLogout() {
            clearAuthState()
            window.location.href = '/login'
        }

        setAuthCallbacks({ onTokenRefresh, onLogout })
    }, [])

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const res = await loginUser(credentials)

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.detail ?? 'Login Failed')
            }

            const tokens = await res.json()

            setAccessToken(tokens.access)

            const meRes = await fetchMe()
            const me = meRes.ok ? await meRes.json() : null

            return { tokens, me }
        },

        onSuccess: ({ tokens, me }) => {
            const payload = parseJwtPayload(tokens.access)

            const newUser = payload
                ? { id: payload.user_id, username: me?.username ?? '', role: me?.role ?? 'user' }
                : null
            
                setUser(newUser)
                setAccessTokenState(tokens.access)

                setAccessToken(tokens.access)
                setRefreshToken(tokens.refresh)
                if (newUser) setStoredUser(newUser)
        },
    })

    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const res = await registerUser(userData)

            if (!res.ok) {
                const err = await res.json()

                const firstError = Object.values(err)[0]
                throw new Error(Array.isArray(firstError) ? firstError[0] : 'Registration failed.')
            }

            return res.json()
        }
    })

    function logout() {
        clearAuthState()
    }

    const value = {
        user,
        accessToken,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
        logout,
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}