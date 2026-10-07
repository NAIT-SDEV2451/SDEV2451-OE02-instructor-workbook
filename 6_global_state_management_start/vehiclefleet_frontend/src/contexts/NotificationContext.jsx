import { createContext, useState } from 'react'
import Toast from '../components/Toast'

export const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
    const [notification, setNotificaiton] = useState(null)

    function showSuccess(message) {
        setNotificaiton({ message, type: 'success' })
    }

    function showError(message) {
        setNotificaiton({ message, type: 'error'})
    }

    function hide() {
        setNotificaiton(null)
    }

    return (
        <NotificationContext.Provider value={{ showSuccess, showError, hide }}>
            <Toast notification={notification} hide={hide} />
            {children}
        </NotificationContext.Provider>
    )
}