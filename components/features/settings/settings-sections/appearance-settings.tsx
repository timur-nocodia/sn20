"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-components/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-components/select";
import { Label } from "@/components/ui-components/label";

export function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="font-size">Font Size</Label>
          <Select>
            <SelectTrigger id="font-size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
