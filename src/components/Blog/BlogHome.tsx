"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Trash2,
  Plus,
  BookOpen,
  Filter,
  ArrowUpDown,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CustomPagination } from "@/utils/Pagination"
import MainSpinner from "@/utils/MainLoader"

const dummyBlogs = [
  {
    _id: "67a0f3afcf7136169a91e8c2",
    title: "Tiger",
    slug: "tiger",
    thumbnail:
      "https://res.cloudinary.com/dtcfxh0z5/image/upload/v1738601393/LuxuryEscape/blogs/thumbnail/zweab8dc2q2czye5mc9p.png",
    category: "Wildlife",
    readTime: "1 min read",
    createdAt: "2025-02-03T16:49:51.530Z",
    isActivate: true,
  },
  {
    _id: "67a0f3afcf7136169a91e8c3",
    title: "Everest Expedition",
    slug: "everest-expedition",
    thumbnail: "https://example.com/everest.jpg",
    category: "Adventure",
    readTime: "3 min read",
    createdAt: "2025-01-15T10:30:00.000Z",
    isActivate: false,
  },
]

type SortField = "title" | "createdAt"
type SortOrder = "asc" | "desc"
type SortOption = {
  field: SortField
  order: SortOrder
}

const BlogHome: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [blogs, setBlogs] = useState(dummyBlogs)
  const [search, setSearch] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("")

  const sortOptions = [
    { value: "title_asc", label: "Title (A-Z)" },
    { value: "title_desc", label: "Title (Z-A)" },
    { value: "createdAt_asc", label: "Date (Oldest First)" },
    { value: "createdAt_desc", label: "Date (Newest First)" },
  ]

  const parseSortOption = (option: string): SortOption | null => {
    if (!option) return null
    const [field, order] = option.split("_") as [SortField, SortOrder]
    return { field, order }
  }

  const sortData = (data: typeof dummyBlogs, sort: SortOption | null) => {
    if (!sort) return data

    return [...data].sort((a, b) => {
      const { field, order } = sort
      const multiplier = order === "asc" ? 1 : -1

      if (field === "title") {
        return multiplier * a.title.localeCompare(b.title)
      }
      if (field === "createdAt") {
        return (
          multiplier *
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        )
      }
      return 0
    })
  }

  const filterBlogs = () => {
    let filtered = dummyBlogs

    if (search) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      filtered = filtered.filter((blog) => blog.category === category)
    }

    filtered = sortData(filtered, parseSortOption(sortOption))
    setBlogs(filtered)
  }

  useEffect(() => {
    filterBlogs()
  }, [search, category, sortOption])

  const handleToggle = (blogId: string, field: "isActivate") => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog._id === blogId ? { ...blog, [field]: !blog[field] } : blog
      )
    )
  }

  const totalPages = Math.ceil(dummyBlogs.length / 10)

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Blog Manager
          </h2>
          <div className="flex gap-6">
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
          Manage and curate your blog content efficiently
        </p>
      </div>

      {/* Filters Section */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <Filter className="absolute left-3 top-2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-primary/20"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Wildlife">Wildlife</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>

          <div className="relative">
            <ArrowUpDown
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

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Blog Details ({blogs.length}/{dummyBlogs.length})
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
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="h-24 w-32 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Filter size={10} className="mr-1" />
                            {blog.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Clock size={10} className="mr-1" />
                            {blog.readTime}
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
                            blog.isActivate ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {blog.isActivate ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={blog.isActivate}
                          onCheckedChange={() =>
                            handleToggle(blog._id, "isActivate")
                          }
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-3">
                      <Button
                        onClick={() =>
                          router.push(`/blogs/edit-blog/${blog.slug}`)
                        }
                        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setBlogs((prev) =>
                            prev.filter((item) => item._id !== blog._id)
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
        <div className="flex justify-center mt-40">
          <MainSpinner />
        </div>
      )}

      {!loading && dummyBlogs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
          <p className="text-2xl text-gray-400 font-medium">No blogs found</p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {dummyBlogs.length > 0 && (
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
