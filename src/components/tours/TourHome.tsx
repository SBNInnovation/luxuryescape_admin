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
import axios from "axios"

type TourType = {
  _id: string
  tourName: string
  slug: string
  location: string
  cost: number
  country: string
  difficulty: string
  tourType: string
  thumbnail: string
  isActivated: boolean
  createdAt: string
}

const TourHome: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [tours, setTours] = useState<TourType[]>([])
  const [search, setSearch] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("")

  const [totalPages, setTotalPages] = useState(0)

  const sortOptions = [
    { value: "name_asc", label: "Title (A-Z)" },
    { value: "name_desc", label: "Title (Z-A)" },
    { value: "createdAt_asc", label: "Date (Oldest First)" },
    { value: "createdAt_desc", label: "Date (Newest First)" },
    { value: "price_asc", label: "Price (Low to High)" },
    { value: "price_desc", label: "Price (High to Low)" },
  ]

  const handleGetTours = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/tour/get-all`
      )
      const data = response.data
      if (data.success) {
        setTours(data.data.tours)
        console.log(data.data.tours)
        setTotalPages(data.data.pagination.totalPages)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   filterTrekking()
  // }, [search, difficulty, location, sortOption])

  useEffect(() => {
    handleGetTours()
  }, [])

  console.log("Tour Data", tours)

  const handleToggle = (trekId: string, field: "isActivated") => {
    setTours((prev) =>
      prev.map((tour) =>
        tour._id === trekId ? { ...tour, [field]: !tour[field] } : tour
      )
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Tour Manager
          </h2>
          <div className="flex  gap-6">
            <Button
              onClick={() => router.push("/tours/tour-types")}
              className="bg-blue-500 hover:bg-blue-500/90 text-white px-6 py-2 rounded-full flex items-center gap-2"
            >
              <TreePine size={20} />
              Tour Type
            </Button>
            <Button
              onClick={() => router.push("/tours/create-tour")}
              className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-full flex items-center gap-2"
            >
              <Plus size={20} />
              Create New Tour
            </Button>
          </div>
        </div>
        <p className="text-lg text-gray-600">
          Manage your luxurious packages with multiple options
        </p>
      </div>

      {/* Filters Section */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <Filter className="absolute left-3 top-2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-primary/20"
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
              placeholder="Search treks..."
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
                  Tour Details
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
              {tours?.map((tour) => (
                <tr
                  key={tour._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={tour.thumbnail}
                        alt={tour.tourName}
                        className="h-24 w-32 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tour.tourName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <MapPin size={10} className="mr-1" />
                            {tour.location}, {tour.country}
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
                            tour.isActivated ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {tour.isActivated ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={tour.isActivated}
                          onCheckedChange={() =>
                            handleToggle(tour._id, "isActivated")
                          }
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(tour.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-semibold">${tour.cost}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-3">
                      <Button
                        onClick={() =>
                          router.push(`/tours/edit-tour/${tour.slug}`)
                        }
                        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setTours((prev) =>
                            prev.filter((item) => item._id !== tour._id)
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

      {!loading && tours?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
          <p className="text-2xl text-gray-400 font-medium">No tours found</p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {tours?.length > 0 && (
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

export default TourHome
