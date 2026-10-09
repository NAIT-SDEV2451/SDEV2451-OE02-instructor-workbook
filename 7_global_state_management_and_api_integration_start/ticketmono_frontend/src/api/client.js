import { getAccessToken } from "./tokenStorage"

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1"

let _onTokenRefresh = null
let _onLogout = null

let _refreshPromise = null

export function setAuthCallbacks({ onTokenRefresh, onLogout }) {
    _onTokenRefresh = onTokenRefresh
    _onLogout = onLogout
}

async function apiClient(endpoint, options = {}) {
    const accessToken = getAccessToken()

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}`} : {})
    }

    let res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })

    if (res.status === 401 && _onTokenRefresh && getAccessToken()) {
        try {
            if (!_refreshPromise) {
                _refreshPromise = _onTokenRefresh().finally(() => {
                    _refreshPromise = null
                })
            }  

            const newAccessToken = await _refreshPromise
            
            res = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers: { ...headers, Authorization: `Bearer ${newAccessToken}`}
            })
        } catch (err) {
            _onLogout?.()
        }
    }

    return res    
}

export default apiClient