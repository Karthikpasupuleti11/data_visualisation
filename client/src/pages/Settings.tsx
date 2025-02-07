import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your preferences and application settings
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how the application looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Enable animations</Label>
              <Switch id="animations" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="reduce-motion">Reduce motion</Label>
              <Switch id="reduce-motion" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visualization Settings</CardTitle>
            <CardDescription>
              Configure default visualization behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-play">Auto-play animations</Label>
              <Switch id="auto-play" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-complexity">Show time complexity</Label>
              <Switch id="show-complexity" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}