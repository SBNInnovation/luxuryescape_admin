"use client"
import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Map,
  MessageSquare,
  Users,
  Hotel,
  Globe,
  Scissors,
  Bell,
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("March")

  // Dashboard stats for the overview section
  const stats = [
    {
      title: "Active Treks",
      value: "178",
      change: "+12.5%",
      icon: Map,
    },
    {
      title: "Active Tours",
      value: "64",
      change: "+22.8%",
      icon: MessageSquare,
    },
    {
      title: "Total Accommodations",
      value: "93",
      change: "+15.4%",
      icon: FileText,
    },
    {
      title: "Total Blogs",
      value: "42",
      change: "+18.2%",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome, Admin
              </h1>
              <p className="text-gray-500 mt-1">
                Here's what's happening with your travel business today
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className="bg-blue-50 p-2 rounded-full">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500">{stat.change}</span> from
                    last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tailormade Requests */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Tailormade Requests</CardTitle>
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  15 new requests
                </Badge>
              </div>
              <CardDescription>
                Custom travel packages requested by clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[
                  {
                    id: "67c873a0a3135f7c1e75be25",
                    name: "John Doe",
                    email: "johndoe2@example.com",
                    destination: "Nepal, Bhutan, Thailand",
                    experience: "Luxury",
                    budget: "5000-7000 USD",
                    status: "pending",
                    date: "Mar 5, 2025",
                  },
                  {
                    id: "67c873a0a3135f7c1e75be26",
                    name: "Sarah Johnson",
                    email: "sarahj@example.com",
                    destination: "Nepal, Tibet",
                    experience: "Adventure",
                    budget: "3000-4500 USD",
                    status: "viewed",
                    date: "Mar 4, 2025",
                  },
                  {
                    id: "67c873a0a3135f7c1e75be27",
                    name: "Michael Chen",
                    email: "mchen@example.com",
                    destination: "Nepal, India",
                    experience: "Cultural",
                    budget: "4000-6000 USD",
                    status: "processing",
                    date: "Mar 3, 2025",
                  },
                ].map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{request.name}</h3>
                        <div className="text-sm text-gray-500">
                          {request.email}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-2">
                            {request.destination}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-1 mr-2">
                            {request.experience}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1">
                            {request.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="mb-2">
                        {request.status === "pending" && (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">
                            Pending
                          </Badge>
                        )}
                        {request.status === "viewed" && (
                          <Badge className="bg-blue-500 hover:bg-blue-600">
                            Viewed
                          </Badge>
                        )}
                        {request.status === "processing" && (
                          <Badge className="bg-indigo-500 hover:bg-indigo-600">
                            Processing
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {request.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a
                  href="#"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View all tailormade requests →
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Treks & Tours Tabs */}
          <Tabs defaultValue="treks" className="space-y-4 mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="treks" className="text-sm">
                Trek Inquiries
              </TabsTrigger>
              <TabsTrigger value="tours" className="text-sm">
                Tour Inquiries
              </TabsTrigger>
            </TabsList>

            <TabsContent value="treks">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Trek Inquiries</CardTitle>
                    <div className="flex space-x-2">
                      <select
                        className="text-sm border rounded-md p-1"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                      >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        Export
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Most requested trek packages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Everest Base Camp Trek",
                        duration: "14 days",
                        requests: 7,
                        lastInquiry: "3 hours ago",
                        status: "High Demand",
                        statusColor: "red",
                      },
                      {
                        title: "Annapurna Circuit",
                        duration: "12 days",
                        requests: 5,
                        lastInquiry: "6 hours ago",
                        status: "Medium Demand",
                        statusColor: "orange",
                      },
                      {
                        title: "Langtang Valley Trek",
                        duration: "10 days",
                        requests: 4,
                        lastInquiry: "12 hours ago",
                        status: "Medium Demand",
                        statusColor: "orange",
                      },
                      {
                        title: "Manaslu Circuit Trek",
                        duration: "16 days",
                        requests: 3,
                        lastInquiry: "1 day ago",
                        status: "Low Demand",
                        statusColor: "green",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                            <Map className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">
                              {item.duration} • {item.requests} recent inquiries
                            </p>
                            <div className="text-xs text-gray-400 mt-1">
                              Last inquiry: {item.lastInquiry}
                            </div>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`rounded-full bg-${item.statusColor}-100 px-3 py-1 text-xs text-${item.statusColor}-600`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tours">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Tour Inquiries</CardTitle>
                    <div className="flex space-x-2">
                      <select
                        className="text-sm border rounded-md p-1"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                      >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        Export
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Most requested tour packages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Cultural Heritage Tour",
                        duration: "4 days",
                        requests: 8,
                        lastInquiry: "2 hours ago",
                        status: "High Demand",
                        statusColor: "red",
                      },
                      {
                        title: "Pokhara Leisure Tour",
                        duration: "5 days",
                        requests: 6,
                        lastInquiry: "5 hours ago",
                        status: "Medium Demand",
                        statusColor: "orange",
                      },
                      {
                        title: "Kathmandu Valley Tour",
                        duration: "3 days",
                        requests: 5,
                        lastInquiry: "7 hours ago",
                        status: "Medium Demand",
                        statusColor: "orange",
                      },
                      {
                        title: "Chitwan Safari Tour",
                        duration: "4 days",
                        requests: 3,
                        lastInquiry: "1 day ago",
                        status: "Low Demand",
                        statusColor: "green",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                            <Globe className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">
                              {item.duration} • {item.requests} recent inquiries
                            </p>
                            <div className="text-xs text-gray-400 mt-1">
                              Last inquiry: {item.lastInquiry}
                            </div>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`rounded-full bg-${item.statusColor}-100 px-3 py-1 text-xs text-${item.statusColor}-600`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quote Management and Accommodations */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Quote Management */}
            <Card>
              <CardHeader>
                <CardTitle>Quote Management</CardTitle>
                <CardDescription>
                  Track and manage customer quotes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "James Anderson",
                      email: "sanjeetkazithapa@gmail.com",
                      tourName: "Pokhara",
                      status: "viewed",
                      date: "Feb 28, 2025",
                    },
                    {
                      name: "Emma Watson",
                      email: "emma@example.com",
                      tourName: "Kathmandu Valley",
                      status: "pending",
                      date: "Mar 2, 2025",
                    },
                    {
                      name: "Robert Chen",
                      email: "robert@example.com",
                      tourName: "Chitwan Safari",
                      status: "responded",
                      date: "Mar 5, 2025",
                    },
                  ].map((quote, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">{quote.name}</p>
                        <p className="text-sm text-gray-500">{quote.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="font-medium">Package:</span>{" "}
                          {quote.tourName}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="mb-1">
                          {quote.status === "pending" && (
                            <Badge className="bg-yellow-500 hover:bg-yellow-600">
                              Pending
                            </Badge>
                          )}
                          {quote.status === "viewed" && (
                            <Badge className="bg-blue-500 hover:bg-blue-600">
                              Viewed
                            </Badge>
                          )}
                          {quote.status === "responded" && (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              Responded
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{quote.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View all quotes →
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Accommodations */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Accommodations</CardTitle>
                <CardDescription>Most booked accommodations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mountain View Lodge",
                      type: "Premium Comfort",
                      location: "Nagarkot",
                      bookings: 12,
                      rating: 4.8,
                    },
                    {
                      name: "Riverside Resort",
                      type: "Luxury Stay",
                      location: "Pokhara",
                      bookings: 15,
                      rating: 4.9,
                    },
                    {
                      name: "Heritage Hotel",
                      type: "Boutique",
                      location: "Kathmandu",
                      bookings: 9,
                      rating: 4.7,
                    },
                  ].map((hotel, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                        <div>
                          <p className="font-medium">{hotel.name}</p>
                          <p className="text-sm text-gray-500">
                            {hotel.type} • {hotel.location}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-500 text-xs mr-1">
                              ★
                            </span>
                            <span className="text-xs text-gray-500">
                              {hotel.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-purple-500 hover:bg-purple-600">
                          Featured
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {hotel.bookings} recent bookings
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View all accommodations →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Blog Posts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Blog Posts</CardTitle>
                <Badge className="bg-green-500 hover:bg-green-600">
                  Create New Post
                </Badge>
              </div>
              <CardDescription>
                Latest travel insights and guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "10 Must-Visit Spots in Nepal",
                    excerpt:
                      "Discover the hidden gems of Nepal beyond the typical tourist attractions...",
                    author: "Rajesh Sharma",
                    date: "Mar 5, 2025",
                    views: 345,
                    comments: 12,
                  },
                  {
                    title: "Best Time to Trek in the Himalayas",
                    excerpt:
                      "A comprehensive guide to seasonal trekking conditions and what to expect...",
                    author: "Maya Thapa",
                    date: "Mar 3, 2025",
                    views: 287,
                    comments: 9,
                  },
                  {
                    title: "Cultural Etiquette in Nepal",
                    excerpt:
                      "Learn about local customs, traditions, and etiquette to make your trip more meaningful...",
                    author: "Priya Gurung",
                    date: "Mar 1, 2025",
                    views: 203,
                    comments: 7,
                  },
                ].map((post, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="mb-3 aspect-video rounded-md bg-gray-200"></div>
                    <h3 className="font-medium text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        By {post.author} • {post.date}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            ></path>
                          </svg>
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
