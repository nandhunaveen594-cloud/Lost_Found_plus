import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Account() {
  const navigate = useNavigate()

  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      return JSON.parse(savedUser)
    }

    return null
  })

  if (!user) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Not logged in
          </h1>

          <button
            onClick={() => navigate('/login')}
            className="mt-6 bg-black px-6 py-3 text-white"
          >
            Login
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16">

      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => navigate('/')}
          className="mb-10 text-sm text-gray-500 hover:text-black"
        >
          ← Back to home
        </button>

        <h1 className="text-5xl font-bold text-gray-900">
          Your account.
        </h1>

        <p className="mt-3 text-gray-500">
          Manage your LostFound+ account.
        </p>

        <div className="mt-12 rounded-2xl border border-gray-200 p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Profile
          </h2>

          <div className="mt-8 space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                Full name
              </p>

              <p className="mt-1 text-lg font-medium text-gray-900">
                {user.fullname}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Nickname
              </p>

              <p className="mt-1 text-lg font-medium text-gray-900">
                {user.nickname}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 text-lg font-medium text-gray-900">
                {user.email}
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Account