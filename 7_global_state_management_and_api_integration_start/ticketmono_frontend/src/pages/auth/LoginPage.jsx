import LoginForm from '../../components/LoginForm'

function LoginPage() {
  function handleSubmit(formData) {
    console.log("Login submitted:", formData)
  }
  
  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-100 shadow w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-2">
            Log In
          </h2>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
