
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log('LOGIN BUTTON PRESSED')

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(
        'http://192.168.10.75:4000/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      console.log('Backend status:', response.status)

      const data = await response.json()

      console.log('Backend response:', data)

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        console.log('LOGIN SUCCESS')

        navigate('/')
      } else {
        setMessage(data.msg || 'Login failed.')
      }

    } catch (error) {
      console.error('LOGIN ERROR:', error)
      setMessage('Could not connect to backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome back.
          </h1>

          <p className="mt-3 text-gray-500">
            Sign in to continue to LostFound+.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600">
              {message}
            </p>
          )}

        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-black underline"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  )
}

export default Login