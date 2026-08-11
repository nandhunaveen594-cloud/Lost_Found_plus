import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Claims() {
  const [items, setItems] = useState([])
  const [claims, setClaims] = useState({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const token = localStorage.getItem('token')
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchItemsAndClaims = async () => {
      try {
        // Get all items
        const itemsResponse = await fetch(
          `${API_URL}/items`
        )

        const itemsData = await itemsResponse.json()

        console.log(
          'ITEMS RESPONSE:',
          JSON.stringify(itemsData, null, 2)
        )

        if (!itemsData.ok) {
          setMessage('Could not load items.')
          return
        }

        // Get logged-in user
        const storedUser = localStorage.getItem('user')

        const user = storedUser
          ? JSON.parse(storedUser)
          : null

        console.log(
          'LOGGED IN USER:',
          JSON.stringify(user, null, 2)
        )

        if (!user?._id) {
          setMessage('Please login again.')
          return
        }

        // Only get items reported by the logged-in user
        const myItems = itemsData.items.filter(
          (item) =>
            item.userId &&
            item.userId._id === user._id
        )

        console.log(
          'MY ITEMS:',
          JSON.stringify(myItems, null, 2)
        )

        setItems(myItems)

        const claimsMap = {}

        // Get claims for each item
        await Promise.all(
          myItems.map(async (item) => {
            try {
              const url =
                `${API_URL}/claims/item/${item._id}`

              console.log(
                'FETCHING CLAIMS FROM:',
                url
              )

              const response = await fetch(url, {
                method: 'GET',
                headers: {
                  token: token,
                },
              })

              const data = await response.json()

              console.log(
                'CLAIMS FULL RESPONSE:',
                JSON.stringify(data, null, 2)
              )

              console.log(
                'CLAIMS STATUS:',
                response.status
              )

              if (response.ok) {
                claimsMap[item._id] =
                  data.claims || []
              } else {
                claimsMap[item._id] = []

                console.error(
                  'CLAIMS REQUEST FAILED:',
                  data
                )
              }
            } catch (error) {
              console.error(
                `Could not load claims for item ${item._id}:`,
                error
              )

              claimsMap[item._id] = []
            }
          })
        )

        console.log(
          'FINAL CLAIMS MAP:',
          JSON.stringify(claimsMap, null, 2)
        )

        setClaims(claimsMap)
      } catch (error) {
        console.error(
          'Claims page error:',
          error
        )

        setMessage(
          'Could not connect to backend.'
        )
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchItemsAndClaims()
    } else {
      setMessage('Please login first.')
      setLoading(false)
    }
  }, [token, API_URL])

  const updateClaim = async (
    claimId,
    status,
    itemId
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/claims/${claimId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      )

      const data = await response.json()

      console.log(
        'CLAIM UPDATE RESPONSE:',
        JSON.stringify(data, null, 2)
      )

      if (response.ok) {
        setClaims((previous) => ({
          ...previous,
          [itemId]: (
            previous[itemId] || []
          ).map((claim) =>
            claim._id === claimId
              ? {
                  ...claim,
                  status: status,
                }
              : claim
          ),
        }))
      } else {
        setMessage(
          data.msg ||
            data.message ||
            'Could not update claim.'
        )
      }
    } catch (error) {
      console.error(
        'Claim update error:',
        error
      )

      setMessage(
        'Could not connect to backend.'
      )
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-500">
          Loading claims...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/"
          className="text-sm font-medium text-gray-500 hover:text-black"
        >
          ← Back home
        </Link>

        <div className="mt-10">
          <h1 className="text-5xl font-bold text-gray-900">
            Claims
          </h1>

          <p className="mt-3 text-gray-500">
            Manage claims submitted for your items.
          </p>
        </div>

        {message && (
          <p className="mt-8 text-red-500">
            {message}
          </p>
        )}

        {items.length === 0 && !message && (
          <p className="mt-12 text-gray-500">
            You haven't reported any items yet.
          </p>
        )}

        <div className="mt-12 space-y-8">

          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-gray-200 p-8"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {item.title || item.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.type} · {item.location}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
                  {item.status}
                </span>

              </div>

              <div className="mt-8">

                {!claims[item._id] ||
                claims[item._id].length === 0 ? (

                  <p className="text-gray-500">
                    No claims yet.
                  </p>

                ) : (

                  <div className="space-y-4">

                    {claims[item._id].map(
                      (claim) => (

                        <div
                          key={claim._id}
                          className="rounded-2xl bg-gray-50 p-6"
                        >

                          <div className="flex items-start justify-between">

                            <div>
                              <h3 className="font-bold text-gray-900">
                                {claim.userId?.nickname ||
                                  claim.userId?.fullname ||
                                  'User'}
                              </h3>

                              {claim.userId?.email && (
                                <p className="mt-1 text-sm text-gray-400">
                                  {claim.userId.email}
                                </p>
                              )}
                            </div>

                            <span className="text-sm font-medium text-gray-500">
                              {claim.status}
                            </span>

                          </div>

                          <p className="mt-4 text-gray-600">
                            {claim.message ||
                              'No message provided.'}
                          </p>

                          {claim.status === 'pending' && (
                            <div className="mt-6 flex gap-3">

                              <button
                                onClick={() =>
                                  updateClaim(
                                    claim._id,
                                    'approved',
                                    item._id
                                  )
                                }
                                className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  updateClaim(
                                    claim._id,
                                    'rejected',
                                    item._id
                                  )
                                }
                                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                              >
                                Reject
                              </button>

                            </div>
                          )}

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  )
}

export default Claims