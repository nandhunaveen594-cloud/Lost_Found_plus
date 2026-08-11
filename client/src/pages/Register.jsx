import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [fullname, setFullname] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://192.168.10.75:4000/users/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname,
            nickname,
            email,
            password,
          }),
        }
      )

      const data = await response.text()

      console.log('Backend response:', data)

      if (response.ok) {
        alert('Account created successfully!')
      } else {
        alert('Registration failed: ' + data)
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Could not connect to backend.')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">
            Create an account.
          </h1>

          <p className="mt-3 text-gray-500">
            Join LostFound+ and help reunite people with their belongings.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Full name
            </label>

            <input
              type="text"
              placeholder="Your name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Nickname
            </label>

            <input
              type="text"
              placeholder="Your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
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
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Create account
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-black underline"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Register