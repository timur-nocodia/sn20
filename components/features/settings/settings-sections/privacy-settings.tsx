"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-components/card";
import { Switch } from "@/components/ui-components/switch";
import { Label } from "@/components/ui-components/label";

export function PrivacySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="profile-visibility">Profile Visibility</Label>
          <Switch id="profile-visibility" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="activity-visibility">Activity Visibility</Label>
          <Switch id="activity-visibility" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="message-privacy">Message Privacy</Label>
          <Switch id="message-privacy" />
        </div>
      </CardContent>
    </Card>
  );
}
