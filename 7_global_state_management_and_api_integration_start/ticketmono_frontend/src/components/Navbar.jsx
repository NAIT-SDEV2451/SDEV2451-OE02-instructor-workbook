import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar bg-base-100 shadow px-6">
            <div className="flex-1">
                <span className="text-xl font-bold">
                    Ticketmono
                </span>
            </div>
            <div className="flex gap-4 items-center">
                <NavLink to="/" className="btn btn-ghost btn-sm">
                    Events
                </NavLink>
                {user ? (
                    <>
                        <span className="text-sm text-base-content/60">
                            Hi, {user.username}
                        </span>
                        <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="btn btn-ghost btn-sm">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="btn btn-primary btn-sm">
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar