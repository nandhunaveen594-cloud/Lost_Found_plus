import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/items`
        )

        const data = await response.json()

        if (data.ok) {
          setItems(data.items)
        } else {
          setError('Could not load items.')
        }
      } catch (err) {
        console.error(err)
        setError('Could not connect to backend.')
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <button
          onClick={() => navigate('/')}
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back home
        </button>

        <div className="mt-10">
          <h1 className="text-5xl font-bold text-gray-900">
            Find an item.
          </h1>

          <p className="mt-3 text-gray-500">
            Browse items reported by the community.
          </p>
        </div>

        {loading && (
          <p className="mt-12 text-gray-500">
            Loading items...
          </p>
        )}

        {error && (
          <p className="mt-12 text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="mt-12 text-gray-500">
            No items have been reported yet.
          </p>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {items.map((item) => (
            <button
              key={item._id}
              onClick={() =>
                navigate(`/items/${item._id}`, {
                  state: { item },
                })
              }
              className="rounded-2xl border border-gray-200 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  {item.type}
                </span>

                <span className="text-sm text-gray-400">
                  {item.category}
                </span>

              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                {item.title || item.name}
              </h2>

              <p className="mt-3 text-gray-500">
                {item.description}
              </p>

              <div className="mt-6 space-y-2 text-sm text-gray-500">
                <p>📍 {item.location}</p>
                <p>📅 {item.date}</p>
              </div>

              {item.userId && (
                <p className="mt-6 border-t border-gray-100 pt-4 text-sm text-gray-400">
                  Reported by {item.userId.nickname}
                </p>
              )}

              <p className="mt-6 text-sm font-medium text-black">
                View details →
              </p>

            </button>
          ))}

        </div>

      </div>
    </main>
  )
}

export default Search