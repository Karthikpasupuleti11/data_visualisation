import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getDataStructures } from "@/api/structures"
import { Stack } from "@/components/visualization/Stack"
import { Array } from "@/components/visualization/Array"
import { LinkedList } from "@/components/visualization/LinkedList"
import { Queue } from "@/components/visualization/Queue"
import { Tree } from "@/components/visualization/Tree"
import { Graph } from "@/components/visualization/Graph"
import { useToast } from "@/hooks/useToast"

type Structure = {
  _id: string
  name: string
  description: string
}

export function DataStructures() {
  const [structures, setStructures] = useState<Structure[]>([])
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStructures = async () => {
      try {
        const response = await getDataStructures()
        setStructures(response.structures)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load data structures",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStructures()
  }, [toast])

  const renderVisualization = () => {
    if (!selectedStructure) return null;

    switch (selectedStructure._id) {
      case '1':
        return <Array />;
      case '2':
        return <LinkedList />;
      case '3':
        return <Stack />;
      case '4':
        return <Queue />;
      case '5':
        return <Tree />;
      case '6':
        return <Graph />;
      default:
        return <div>Visualization not implemented</div>;
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Data Structures</h2>
        <p className="text-muted-foreground">
          Explore and visualize different data structures
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {structures.map((structure) => (
          <Card key={structure._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{structure.name}</CardTitle>
              <CardDescription>{structure.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => setSelectedStructure(structure)}
              >
                Visualize
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedStructure} onOpenChange={() => setSelectedStructure(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedStructure?.name} Visualization</DialogTitle>
            <DialogDescription>
              Interact with the {selectedStructure?.name?.toLowerCase()} data structure
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-background rounded-lg">
            {renderVisualization()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}