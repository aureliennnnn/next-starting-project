"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity, Eye, Clock } from "lucide-react"

interface AnalyticsData {
  totalUsers: number
  totalRevenue: number
  totalOrders: number
  conversionRate: number
  pageViews: number
  avgSessionDuration: number
  userGrowth: number
  revenueGrowth: number
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    conversionRate: 0,
    pageViews: 0,
    avgSessionDuration: 0,
    userGrowth: 0,
    revenueGrowth: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setData({
        totalUsers: 12543,
        totalRevenue: 89432.5,
        totalOrders: 1247,
        conversionRate: 3.2,
        pageViews: 45678,
        avgSessionDuration: 245,
        userGrowth: 12.5,
        revenueGrowth: 8.3,
      })
      setIsLoading(false)
    }

    fetchAnalytics()
  }, [])

  const metrics = [
    {
      title: "Total Users",
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      growth: data.userGrowth,
      color: "text-blue-600",
    },
    {
      title: "Revenue",
      value: `$${data.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      growth: data.revenueGrowth,
      color: "text-green-600",
    },
    {
      title: "Orders",
      value: data.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      growth: 5.2,
      color: "text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: `${data.conversionRate}%`,
      icon: Activity,
      growth: -0.8,
      color: "text-orange-600",
    },
    {
      title: "Page Views",
      value: data.pageViews.toLocaleString(),
      icon: Eye,
      growth: 15.3,
      color: "text-indigo-600",
    },
    {
      title: "Avg. Session",
      value: `${Math.floor(data.avgSessionDuration / 60)}m ${data.avgSessionDuration % 60}s`,
      icon: Clock,
      growth: 2.1,
      color: "text-pink-600",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Overview of your key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`p-2 rounded-full bg-muted ${metric.color}`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {metric.growth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${metric.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                    {Math.abs(metric.growth)}%
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Revenue Goal</span>
                    <span>$75,000 / $100,000</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>User Acquisition Goal</span>
                    <span>8,500 / 10,000</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversion Rate Goal</span>
                    <span>3.2% / 5.0%</span>
                  </div>
                  <Progress value={64} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "/dashboard", views: 12543, bounce: "32%" },
                    { page: "/products", views: 8932, bounce: "28%" },
                    { page: "/pricing", views: 6721, bounce: "45%" },
                    { page: "/about", views: 4532, bounce: "52%" },
                  ].map((item) => (
                    <div key={item.page} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.page}</p>
                        <p className="text-sm text-muted-foreground">{item.views.toLocaleString()} views</p>
                      </div>
                      <Badge variant="outline">{item.bounce} bounce</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-sm text-muted-foreground">Desktop Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">28%</p>
                  <p className="text-sm text-muted-foreground">Mobile Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">4%</p>
                  <p className="text-sm text-muted-foreground">Tablet Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: "Direct Sales", amount: 45230, percentage: 51 },
                  { source: "Subscriptions", amount: 28900, percentage: 32 },
                  { source: "Partnerships", amount: 15302, percentage: 17 },
                ].map((item) => (
                  <div key={item.source}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.source}</span>
                      <span>${item.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium mb-2">Page Load Time</p>
                  <p className="text-2xl font-bold">1.2s</p>
                  <p className="text-sm text-green-600">↓ 0.3s from last month</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Core Web Vitals</p>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-100 text-green-800">LCP: Good</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">FID: Needs Improvement</Badge>
                    <Badge className="bg-green-100 text-green-800">CLS: Good</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
