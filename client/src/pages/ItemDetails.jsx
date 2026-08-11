import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function ItemDetails() {
  const location = useLocation()

  const item = location.state?.item

  const [claimText, setClaimText] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClaim = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      setMessage('Please login before claiming an item.')
      return
    }

    if (!claimText.trim()) {
      setMessage('Please explain why this item belongs to you.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/claims`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            itemId: item._id,
            message: claimText,
          }),
        }
      )

      const data = await response.json()

      console.log('Claim response:', data)

      if (response.ok) {
        setMessage('Claim submitted successfully!')
        setClaimText('')
      } else {
        setMessage(
          data.msg ||
            data.message ||
            'Could not submit claim.'
        )
      }
    } catch (error) {
      console.error('Claim error:', error)
      setMessage('Could not connect to backend.')
    } finally {
      setLoading(false)
    }
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">

        <div className="mx-auto max-w-3xl">

          <Link
            to="/search"
            className="text-sm font-medium text-gray-500 hover:text-black"
          >
            ← Back to search
          </Link>

          <h1 className="mt-12 text-3xl font-bold text-gray-900">
            Item unavailable
          </h1>

          <p className="mt-3 text-gray-500">
            Please return to search and select an item again.
          </p>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">

      <div className="mx-auto max-w-3xl">

        <Link
          to="/search"
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back to search
        </Link>

        <div className="mt-10 rounded-3xl border border-gray-200 p-8 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              {item.type}
            </span>

            <span className="text-sm text-gray-400">
              {item.category}
            </span>

          </div>

          <h1 className="mt-8 text-5xl font-bold text-gray-900">
            {item.title || item.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {item.description}
          </p>

          <div className="mt-8 space-y-3 border-t border-gray-100 pt-6 text-gray-600">

            <p>
              <strong>Location:</strong> {item.location}
            </p>

            <p>
              <strong>Date:</strong> {item.date}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            {item.userId && (
              <p>
                <strong>Reported by:</strong>{' '}
                {item.userId.nickname}
              </p>
            )}

          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">

            <h2 className="text-2xl font-bold text-gray-900">
              Think this is yours?
            </h2>

            <p className="mt-2 text-gray-500">
              Explain why you believe this item belongs to you.
            </p>

            <form
              onSubmit={handleClaim}
              className="mt-6"
            >

              <textarea
                value={claimText}
                onChange={(e) => setClaimText(e.target.value)}
                placeholder="Explain why this item belongs to you..."
                rows="5"
                className="w-full resize-none border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Claim this item'}
              </button>

              {message && (
                <p className="mt-4 text-center text-sm text-gray-600">
                  {message}
                </p>
              )}

            </form>

          </div>

        </div>

      </div>

    </main>
  )
}

export default ItemDetails