import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Map, MessageSquare, Users } from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Active Itineraries",
      value: "145",
      change: "+8.5%",
      icon: Map,
    },
    {
      title: "Pending Quotes",
      value: "32",
      change: "+12.2%",
      icon: MessageSquare,
    },
    {
      title: "Quote Responses",
      value: "85",
      change: "+15.4%",
      icon: Clock,
    },
    {
      title: "Total Inquiries",
      value: "1,245",
      change: "+10.6%",
      icon: Users,
    },
  ]

  return (
    <div className="container space-y-8 p-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight">
          Good morning, John Doe
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
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

      <Tabs defaultValue="trekking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trekking">Trekking Requests</TabsTrigger>
          <TabsTrigger value="tours">Tour Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="trekking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quote Requests - Trekking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Everest Base Camp Trek",
                  duration: "14 days",
                  requests: 3,
                  status: "Pending",
                },
                {
                  title: "Annapurna Circuit",
                  duration: "12 days",
                  requests: 2,
                  status: "Pending",
                },
                {
                  title: "Langtang Valley Trek",
                  duration: "10 days",
                  requests: 1,
                  status: "Pending",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.duration} • {item.requests} quote requests
                    </p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-600">
                    {item.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quote Requests - Tours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Cultural Heritage Tour",
                  duration: "4 days",
                  requests: 2,
                  status: "Sent",
                },
                {
                  title: "City Exploration Tour",
                  duration: "3 days",
                  requests: 1,
                  status: "Sent",
                },
                {
                  title: "Temple Circuit Tour",
                  duration: "5 days",
                  requests: 2,
                  status: "Sent",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.duration} • {item.requests} quote requests
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600">
                    {item.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Featured Accommodations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Mountain View Lodge",
                type: "Premium Comfort",
                itineraries: 8,
              },
              {
                name: "Riverside Resort",
                type: "Luxury Stay",
                itineraries: 6,
              },
              {
                name: "Heritage Hotel",
                type: "Boutique",
                itineraries: 5,
              },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border p-4">
                <div className="mb-3 aspect-video rounded-md bg-muted" />
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.type}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Added to {item.itineraries} itineraries
                  </span>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600">
                    Featured
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
