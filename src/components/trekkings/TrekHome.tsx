"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Trash2, Plus, MapIcon, Filter, SortAsc } from "lucide-react"
import { Switch } from "../ui/switch"
// import { CustomPagination } from "../utils/Pagination"
// import { DeleteTrek } from "./DeleteTrek"

// Dummy Data
const dummyTrekking = [
  {
    _id: "1",
    name: "Luxury Everest Base Camp",
    slug: "luxury-everest-base-camp",
    thumbnail:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=800",
    location: "Nepal",
    difficulty: "Difficult",
    price: 5000,
    days: { min: 14, max: 16 },
    groupSize: { min: 5, max: 10 },
    isFeatured: true,
    isPopular: true,
    isActivated: true,
    isNewItem: false,
  },
  {
    _id: "2",
    name: "Glamorous Annapurna Trek",
    slug: "glamorous-annapurna-trek",
    thumbnail:
      "https://images.unsplash.com/photo-1531191229444-602ab6e618db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=800",
    location: "Nepal",
    difficulty: "Moderate",
    price: 3000,
    days: { min: 10, max: 12 },
    groupSize: { min: 3, max: 8 },
    isFeatured: false,
    isPopular: true,
    isActivated: true,
    isNewItem: true,
  },
  // Add more dummy trekking data as needed
]

const TrekHome: React.FC = () => {
  const router = useRouter()
  const [trekking, setTrekking] = useState(dummyTrekking)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTrekToDelete, setSelectedTrekToDelete] = useState<
    string | null
  >(null)

  // Dummy filter implementation
  const filterTrekking = () => {
    let filtered = dummyTrekking

    if (search) {
      filtered = filtered.filter((trek) =>
        trek.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (difficulty) {
      filtered = filtered.filter((trek) => trek.difficulty === difficulty)
    }

    if (location) {
      filtered = filtered.filter((trek) => trek.location === location)
    }

    setTrekking(filtered)
    setTotalPages(Math.ceil(filtered.length / 8))
  }

  useEffect(() => {
    filterTrekking()
  }, [search, difficulty, location])

  const handleDeleteClick = (trekId: string) => {
    setSelectedTrekToDelete(trekId)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setTrekking((prevTrekking) =>
      prevTrekking.filter((trek) => trek._id !== selectedTrekToDelete)
    )
    setDeleteModalOpen(false)
  }

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Trekking Manager
          </h2>
          <Button
            onClick={() => router.push("/trekkings/add-trek")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Add New Trek
          </Button>
        </div>
        <p className="text-lg text-gray-600">
          Manage your luxurious trekking packages with premium options
        </p>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="relative">
          <Filter className="absolute left-3 top-2 text-gray-400" size={20} />
          <select
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full bg-white text-gray-700 shadow-md focus:ring-2 focus:ring-purple-300"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>

        <div className="relative">
          <MapIcon className="absolute left-3 top-2 text-gray-400" size={20} />
          <select
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full bg-white text-gray-700 shadow-md focus:ring-2 focus:ring-purple-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
          </select>
        </div>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search treks..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full bg-white text-gray-700 shadow-md focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      {/* Trekking List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {trekking.map((trek) => (
          <div
            key={trek._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={trek.thumbnail}
              alt={trek.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {trek.name}
              </h3>
              <p className="text-gray-600">{trek.location}</p>
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full mt-2 ${
                  trek.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : trek.difficulty === "Moderate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {trek.difficulty}
              </span>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-medium text-gray-800">
                  ${trek.price}
                </p>
                <Button
                  onClick={() => handleDeleteClick(trek._id)}
                  variant="destructive"
                  className="px-3 py-1 text-sm rounded-full"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {/* <DeleteTrek
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirmDelete={confirmDelete}
        itemName={
          trekking.find((t) => t._id === selectedTrekToDelete)?.name || ""
        }
      /> */}

      {/* Pagination */}
      {/* <div className="mt-8 flex justify-center">
        <CustomPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div> */}
    </div>
  )
}

export default TrekHome
