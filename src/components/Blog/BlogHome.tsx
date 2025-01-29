"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Trash2,
  Plus,
  MapIcon,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MapPin,
  SortAsc,
  TreePine,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CustomPagination } from "@/utils/Pagination"
import MainSpinner from "@/utils/MainLoader"

const dummyTrekking = [
  {
    _id: "1",
    name: "Luxury Everest Base Camp",
    slug: "luxury-everest-base-camp",
    thumbnail:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=800",
    country: "Nepal",
    location: "Solukhumbu",
    tourType: "Trekking",
    difficulty: "Difficult",
    price: 5000,
    days: { min: 14, max: 16 },
    groupSize: { min: 5, max: 10 },
    createdAt: "2024-01-15",
    isActivated: true,
  },
  {
    _id: "2",
    name: "Glamorous Annapurna Trek",
    slug: "glamorous-annapurna-trek",
    thumbnail: "./logo_gmn.jpg",
    country: "Nepal",
    location: "Annapurna",
    tourType: "Adventure",
    difficulty: "Moderate",
    price: 3000,
    days: { min: 10, max: 12 },
    groupSize: { min: 3, max: 8 },
    createdAt: "2024-01-20",
    isActivated: false,
  },
]

type SortField = "name" | "createdAt" | "price"
type SortOrder = "asc" | "desc"
type SortOption = {
  field: SortField
  order: SortOrder
}

const BlogHome: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [trekking, setTrekking] = useState(dummyTrekking)
  const [search, setSearch] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("")

  const sortOptions = [
    { value: "name_asc", label: "Title (A-Z)" },
    { value: "name_desc", label: "Title (Z-A)" },
    { value: "createdAt_asc", label: "Date (Oldest First)" },
    { value: "createdAt_desc", label: "Date (Newest First)" },
    { value: "price_asc", label: "Price (Low to High)" },
    { value: "price_desc", label: "Price (High to Low)" },
  ]

  const parseSortOption = (option: string): SortOption | null => {
    if (!option) return null
    const [field, order] = option.split("_") as [SortField, SortOrder]
    return { field, order }
  }

  const sortData = (data: typeof dummyTrekking, sort: SortOption | null) => {
    if (!sort) return data

    return [...data].sort((a, b) => {
      const { field, order } = sort
      const multiplier = order === "asc" ? 1 : -1

      if (field === "name") {
        return multiplier * a.name.localeCompare(b.name)
      }
      if (field === "createdAt") {
        return (
          multiplier *
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        )
      }
      if (field === "price") {
        return multiplier * (a.price - b.price)
      }
      return 0
    })
  }

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

    filtered = sortData(filtered, parseSortOption(sortOption))
    setTrekking(filtered)
  }

  useEffect(() => {
    filterTrekking()
  }, [search, difficulty, location, sortOption])

  const handleToggle = (trekId: string, field: "isActivated") => {
    setTrekking((prev) =>
      prev.map((trek) =>
        trek._id === trekId ? { ...trek, [field]: !trek[field] } : trek
      )
    )
  }

  const totalPages = Math.ceil(dummyTrekking.length / 10)

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Blog Manager
          </h2>
          <div className="flex  gap-6">
            <Button
              onClick={() => router.push("/blogs/add-blog")}
              className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-full flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Blog
            </Button>
          </div>
        </div>
        <p className="text-lg text-gray-600">
          Manage your luxurious blog with multiple options
        </p>
      </div>

      {/* Filters Section */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <MapIcon
              className="absolute left-3 top-2 text-gray-400"
              size={20}
            />
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-primary/20"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Solukhumbu">Solukhumbu</option>
              <option value="Annapurna">Annapurna</option>
            </select>
          </div>

          <div className="relative">
            <SortAsc
              className="absolute left-3 top-2 text-gray-400"
              size={20}
            />
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-primary/20"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </Card>

      {/* Rest of the component remains the same */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tour Details ({trekking.length}/{dummyTrekking.length})
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center justify-between">
                    <span>Visibility</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {trekking.map((trek) => (
                <tr
                  key={trek._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={trek.thumbnail}
                        alt={trek.name}
                        className="h-24 w-32 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {trek.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <MapPin size={10} className="mr-1" />
                            {trek.location}, {trek.country}
                          </Badge>
                        </div>
                        <div className="mt-1 space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {trek.tourType}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              trek.difficulty === "Difficult"
                                ? "text-red-600 border-red-200 bg-red-50"
                                : trek.difficulty === "Moderate"
                                ? "text-yellow-600 border-yellow-200 bg-yellow-50"
                                : "text-green-600 border-green-200 bg-green-50"
                            }`}
                          >
                            {trek.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            trek.isActivated ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {trek.isActivated ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={trek.isActivated}
                          onCheckedChange={() =>
                            handleToggle(trek._id, "isActivated")
                          }
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-3">
                      <Button
                        onClick={() =>
                          router.push(`/tours/edit-tour/${trek.slug}`)
                        }
                        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setTrekking((prev) =>
                            prev.filter((item) => item._id !== trek._id)
                          )
                        }}
                        className="px-4 py-2 rounded-lg hover:bg-red-600/90"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Loading and Empty States */}
      {loading && (
        <div className="flex justify-center  mt-40">
          <MainSpinner />
        </div>
      )}

      {!loading && dummyTrekking.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
          <p className="text-2xl text-gray-400 font-medium">No tours found</p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {dummyTrekking.length > 0 && (
        <div className="mt-6">
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  )
}

export default BlogHome
