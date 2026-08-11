import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Landing() {
  const [scrollY, setScrollY] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    const token = localStorage.getItem('token')
    setLoggedIn(!!token)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setLoggedIn(false)
    navigate('/')
  }

  return (
    <main className="bg-black">

      {/* LOGIN / ACCOUNT / CLAIMS */}
      <div className="fixed top-6 right-6 z-50">

        {loggedIn ? (
          <div className="flex gap-3">

            <button
              onClick={() => navigate('/account')}
              className="rounded-full bg-white px-6 py-3 font-medium text-black shadow-lg hover:bg-gray-200"
            >
              Account
            </button>

            <button
              onClick={() => navigate('/claims')}
              className="rounded-full bg-white px-6 py-3 font-medium text-black shadow-lg hover:bg-gray-200"
            >
              Claims
            </button>

            <button
              onClick={handleLogout}
              className="rounded-full bg-black px-6 py-3 font-medium text-white shadow-lg hover:bg-gray-800"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-white px-6 py-3 font-medium text-black shadow-lg hover:bg-gray-200"
          >
            Login
          </Link>
        )}

      </div>

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

        <div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2000&q=80')",
            transform: `scale(1.1) translateY(${scrollY * 0.25}px)`,
          }}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-center text-7xl font-bold text-white">
            Lost something?
          </h1>
        </div>

      </section>

      {/* SECOND SECTION */}
      <section className="relative h-screen overflow-hidden">

        <div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2000&q=80')",
            transform: `scale(1.1) translateY(${
              (scrollY - window.innerHeight) * 0.25
            }px)`,
          }}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <h2 className="text-center text-7xl font-bold text-white">
            Let's help you find it.
          </h2>
        </div>

      </section>

      {/* ACTIONS */}
      <section className="flex min-h-screen items-center justify-center bg-white px-6">

        <div className="w-full max-w-5xl text-center">

          <h2 className="text-5xl font-bold text-gray-900 md:text-6xl">
            What happened?
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Choose what you'd like to do.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* SEARCH */}
            <button
              onClick={() => navigate('/search')}
              className="rounded-2xl border border-gray-200 p-10 text-left transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-4xl">
                🔍
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Search Items
              </h3>

              <p className="mt-3 text-gray-500">
                Search through reported lost and found items.
              </p>

            </button>

            {/* REPORT LOST */}
            <button
              onClick={() => navigate('/report-lost')}
              className="rounded-2xl border border-gray-200 p-10 text-left transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-4xl">
                📢
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Report Lost
              </h3>

              <p className="mt-3 text-gray-500">
                Tell the community about something you lost.
              </p>

            </button>

            {/* REPORT FOUND */}
            <button
              onClick={() => navigate('/report-found')}
              className="rounded-2xl border border-gray-200 p-10 text-left transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-4xl">
                📦
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Report Found
              </h3>

              <p className="mt-3 text-gray-500">
                Help someone recover an item you've found.
              </p>

            </button>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Landing