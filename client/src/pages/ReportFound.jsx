import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ReportFound() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Personal')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      setMessage('Please login first.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            title,
            description,
            category,
            type: 'Found',
            location,
            date,
            status: 'active',
          }),
        }
      )

      const data = await response.json()

      console.log('Report response:', data)

      if (response.ok) {
        setMessage('Found item reported successfully!')

        setTitle('')
        setDescription('')
        setLocation('')
        setDate('')

        setTimeout(() => {
          navigate('/search')
        }, 1000)
      } else {
        setMessage(
          data.msg ||
            data.message ||
            'Could not report item.'
        )
      }
    } catch (error) {
      console.error('Report error:', error)
      setMessage('Could not connect to backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">

      <div className="mx-auto max-w-2xl">

        <Link
          to="/"
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back home
        </Link>

        <div className="mt-10">
          <h1 className="text-5xl font-bold text-gray-900">
            Report a found item.
          </h1>

          <p className="mt-3 text-gray-500">
            Help someone get their belongings back.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Item name
            </label>

            <input
              type="text"
              placeholder="e.g. Black wallet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Description
            </label>

            <textarea
              placeholder="Describe the item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full resize-none border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
            >
              <option value="Personal">Personal</option>
              <option value="Electronics">Electronics</option>
              <option value="Documents">Documents</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Found location
            </label>

            <input
              type="text"
              placeholder="e.g. College Library"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Date found
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Reporting...' : 'Report found item'}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600">
              {message}
            </p>
          )}

        </form>

      </div>

    </main>
  )
}

export default ReportFound