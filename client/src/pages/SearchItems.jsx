import { Link } from 'react-router-dom'

function SearchItems() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">

      <div className="mx-auto max-w-6xl">

        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to home
        </Link>

        <div className="mt-10">
          <h1 className="text-5xl font-bold text-gray-900">
            Search items.
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Find lost and found items reported by the community.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search for an item..."
            className="flex-1 rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-black"
          />

          <select className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-black">
            <option>All items</option>
            <option>Lost</option>
            <option>Found</option>
          </select>

          <select className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-black">
            <option>All categories</option>
            <option>Personal</option>
            <option>Electronics</option>
            <option>Documents</option>
            <option>Accessories</option>
            <option>Other</option>
          </select>

        </div>

        {/* Items */}
        <div className="mt-12">

          <div className="rounded-2xl border border-gray-200 p-8">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-red-500">
                  LOST
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Example Wallet
                </h2>

                <p className="mt-3 text-gray-500">
                  Black wallet lost somewhere near the college library.
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                Personal
              </span>

            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
              <span>📍 College Library</span>
              <span>📅 August 11, 2026</span>
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default SearchItems