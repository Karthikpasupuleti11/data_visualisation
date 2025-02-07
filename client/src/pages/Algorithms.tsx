import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Search, SortAsc, Network } from "lucide-react"

export function Algorithms() {
  const algorithms = [
    {
      title: "Sorting",
      description: "Explore different sorting algorithms and their implementations",
      icon: SortAsc,
    },
    {
      title: "Searching",
      description: "Learn about various searching algorithms and their efficiency",
      icon: Search,
    },
    {
      title: "Graph",
      description: "Discover algorithms for graph traversal and pathfinding",
      icon: Network,
    },
    {
      title: "Dynamic Programming",
      description: "Study optimization techniques using dynamic programming",
      icon: Code2,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Algorithms</h2>
        <p className="text-muted-foreground">
          Explore and visualize various algorithms
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {algorithms.map((algorithm) => (
          <Card key={algorithm.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <algorithm.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{algorithm.title}</CardTitle>
                <CardDescription>{algorithm.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Visualize</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}