    import { useState } from 'react'

    function LoginForm({ onSubmit }) {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')

        function handleSubmit(e) {
            e.preventDefault()
            onSubmit({ username, password })
        }

        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input 
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-2">
                    Log In
                </button>
            </form>
        )
    }

    export default LoginForm